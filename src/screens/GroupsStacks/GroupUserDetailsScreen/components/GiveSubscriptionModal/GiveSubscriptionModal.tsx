import React, { FC, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// types
import { MemberWithSubscriptionT } from "../../../../../providers/MembersProvider/MembersProvider.types";
import { GroupSubscriptionT } from "../../../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useGroupSubscriptionsProvider } from "../../../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider";
import { useMemberSubscriptionsProvider } from "../../../../../providers/MemberSubscriptionsProvider/MemberSubscriptionsProvider";
import { useBotSendMessagesProvider } from "../../../../../providers/BotSendMessagesProvider/BotSendMessagesProvider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";
import { useMembersProvider } from "../../../../../providers/MembersProvider/MembersProvider";

// components
import ModalUniversal from "../../../../../components/ModalUniversal/ModalUniversal";

// styles
import { styles } from "./GiveSubscriptionModal.styles";
import colors from "../../../../../styles/colors";

export type GiveSubscriptionModalPropsT = {
  visible: boolean;
  onClose: () => void;
  user: MemberWithSubscriptionT | null;
  groupId: string | undefined;
  onSuccess: () => void;
};

const GiveSubscriptionModal: FC<GiveSubscriptionModalPropsT> = ({
  visible,
  onClose,
  user,
  groupId,
  onSuccess,
}) => {
  const { i18n } = useLocalesProvider();
  const { listByGroup, groupSubscriptions } = useGroupSubscriptionsProvider();
  const { create } = useMemberSubscriptionsProvider();
  const { sendMessage } = useBotSendMessagesProvider();
  const { refreshGroups, groups } = useGroupsProvider();
  const { updateGroupMemberSubscription } = useMembersProvider();
  const [selectedSubscription, setSelectedSubscription] =
    useState<GroupSubscriptionT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);

  const availableSubscriptions = useMemo(
    () => groupSubscriptions[groupId || ""] || [],
    [groupSubscriptions, groupId]
  );

  const currentGroup = useMemo(
    () => groups.find((group) => group.id === groupId),
    [groups, groupId]
  );

  const loadGroupSubscriptions = async () => {
    if (!groupId) return;

    try {
      setIsLoadingSubscriptions(true);
      await listByGroup(groupId);
    } catch (error) {
      console.warn("Failed to load group subscriptions:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Failed to load subscriptions"),
      });
    } finally {
      setIsLoadingSubscriptions(false);
    }
  };

  const handleGiveSubscription = async () => {
    if (!selectedSubscription || !user || !groupId) {
      Toast.show({
        type: "error",
        text1: i18n._("Please select a subscription"),
      });
      return;
    }

    try {
      setIsLoading(true);

      await create({
        memberId: user._id,
        groupId: groupId,
        groupSubscriptionId: selectedSubscription._id,
      });

      if (user.tgUserId && currentGroup) {
        try {
          const subscriptionType = selectedSubscription.type || "monthly";
          const duration = selectedSubscription.duration || 1;

          const typeTranslations = {
            daily: i18n._("day"),
            weekly: i18n._("week"),
            monthly: i18n._("month"),
            yearly: i18n._("year"),
          };

          const translatedType =
            typeTranslations[
              subscriptionType as keyof typeof typeTranslations
            ] || subscriptionType;
          const durationText =
            duration === 1 ? translatedType : `${duration} ${translatedType}s`;

          const message =
            i18n._(
              "Your subscription has been granted or extended in the group"
            ) +
            ` "${currentGroup.name}".\n\n` +
            i18n._("Subscription details:") +
            "\n" +
            `• ${i18n._("Plan")}: ${selectedSubscription.title}\n` +
            `• ${i18n._("Duration")}: ${durationText}\n` +
            `• ${i18n._("Price")}: ${selectedSubscription.price} ${
              selectedSubscription.currency
            }\n\n` +
            i18n._("Thank you for being with us!");

          await sendMessage({
            userId: user.tgUserId,
            message: message,
            tgChatId: currentGroup.tgChatId,
          });
        } catch (messageError) {
          console.warn("Failed to send notification message:", messageError);
        }
      }

      try {
        await updateGroupMemberSubscription(groupId, user._id);
        await refreshGroups();
        onSuccess();
      } catch (refreshError) {
        console.warn("Failed to refresh data:", refreshError);
      }

      Toast.show({
        type: "success",
        text1: i18n._("Subscription granted successfully"),
      });
    } catch (error) {
      console.warn("Failed to give subscription:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Failed to give subscription"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedSubscription(null);
    onClose();
  };

  const getDisplayName = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName} ${lastName}`.trim() || i18n._("Unnamed user");
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price} ${currency}`;
  };

  const formatDuration = (duration: number, type: string) => {
    const typeTranslations = {
      daily: i18n._("day"),
      weekly: i18n._("week"),
      monthly: i18n._("month"),
      yearly: i18n._("year"),
    };

    const translatedType =
      typeTranslations[type as keyof typeof typeTranslations] || type;
    return `${duration} ${translatedType}`;
  };

  useEffect(() => {
    if (visible && groupId && availableSubscriptions.length === 0)
      loadGroupSubscriptions();
  }, [visible, groupId, availableSubscriptions.length]);

  return (
    <ModalUniversal visible={visible} onClose={onClose} isInputs={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n._("Give subscription")}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("User")}</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{getDisplayName()}</Text>
              {user?.telegramUsername && (
                <Text style={styles.userUsername}>
                  @{user.telegramUsername}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {i18n._("Available subscriptions")}
            </Text>

            {isLoadingSubscriptions ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.loadingText}>
                  {i18n._("Loading subscriptions...")}
                </Text>
              </View>
            ) : availableSubscriptions.length > 0 ? (
              <View style={styles.subscriptionsList}>
                {availableSubscriptions.map((subscription) => (
                  <TouchableOpacity
                    key={subscription._id}
                    style={[
                      styles.subscriptionItem,
                      selectedSubscription?._id === subscription._id &&
                        styles.subscriptionItemSelected,
                    ]}
                    onPress={() => setSelectedSubscription(subscription)}
                  >
                    <View style={styles.subscriptionHeader}>
                      <Text style={styles.subscriptionTitle}>
                        {subscription.title}
                      </Text>
                      <View style={styles.subscriptionPrice}>
                        <Text style={styles.priceText}>
                          {formatPrice(
                            subscription.price,
                            subscription.currency
                          )}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.subscriptionDetails}>
                      <Text style={styles.durationText}>
                        {formatDuration(
                          subscription.duration,
                          subscription.type
                        )}
                      </Text>
                      {subscription.description && (
                        <Text style={styles.descriptionText}>
                          {subscription.description}
                        </Text>
                      )}
                    </View>

                    {selectedSubscription?._id === subscription._id && (
                      <View style={styles.selectedIndicator}>
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color={colors.successGreen}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noSubscriptionsContainer}>
                <Ionicons
                  name="card-outline"
                  size={48}
                  color={colors.gray300}
                />
                <Text style={styles.noSubscriptionsText}>
                  {i18n._("No subscriptions available for this group")}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.giveButton,
              (!selectedSubscription || isLoading) && styles.giveButtonDisabled,
            ]}
            onPress={handleGiveSubscription}
            disabled={!selectedSubscription || isLoading}
          >
            <Ionicons name="card" size={16} color={colors.white} />
            <Text style={styles.giveButtonText}>
              {isLoading ? i18n._("Giving...") : i18n._("Give subscription")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalUniversal>
  );
};

export default GiveSubscriptionModal;
