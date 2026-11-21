import React, { FC } from "react";
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

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import ModalUniversal from "../../../../../components/ModalUniversal/ModalUniversal";

// styles
import { styles } from "./SubscriptionHistoryModal.styles";
import colors from "../../../../../styles/colors";

export type SubscriptionHistoryModalPropsT = {
  visible: boolean;
  onClose: () => void;
  user: MemberWithSubscriptionT | null;
  groupId: string | undefined;
};

const SubscriptionHistoryModal: FC<SubscriptionHistoryModalPropsT> = ({
  visible,
  onClose,
  user,
  groupId,
}) => {
  const { i18n } = useLocalesProvider();

  const getDisplayName = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName} ${lastName}`.trim() || i18n._("Unnamed user");
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getSubscriptionStatus = (endDate: string | Date) => {
    const now = new Date();
    const end = new Date(endDate);

    if (end < now) return { status: "expired", color: colors.errorRed };
    if (end.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return { status: "expiring", color: colors.warningYellow };
    }
    return { status: "active", color: colors.successGreen };
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return i18n._("Active");
      case "expiring":
        return i18n._("Expiring soon");
      case "expired":
        return i18n._("Expired");
      default:
        return i18n._("Unknown");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "checkmark-circle";
      case "expiring":
        return "warning";
      case "expired":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  if (!user) return null;

  return (
    <ModalUniversal visible={visible} onClose={onClose} isInputs={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n._("Subscription History")}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("User")}</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{getDisplayName()}</Text>
              {user.telegramUsername && (
                <Text style={styles.userUsername}>
                  @{user.telegramUsername}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {i18n._("All Subscriptions")}
            </Text>

            {user.allSubscriptions && user.allSubscriptions.length > 0 ? (
              <View style={styles.subscriptionsList}>
                {user.allSubscriptions.map((subscription, index) => {
                  const statusInfo = getSubscriptionStatus(
                    subscription.endDate
                  );
                  return (
                    <View
                      key={subscription._id}
                      style={styles.subscriptionItem}
                    >
                      <View style={styles.subscriptionHeader}>
                        <View style={styles.subscriptionTitleRow}>
                          <Text style={styles.subscriptionTitle}>
                            {subscription.groupSubscription.title}
                          </Text>
                          <View style={styles.subscriptionNumber}>
                            <Text style={styles.subscriptionNumberText}>
                              #{index + 1}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.statusContainer}>
                          <Ionicons
                            name={getStatusIcon(statusInfo.status)}
                            size={16}
                            color={statusInfo.color}
                          />
                          <Text
                            style={[
                              styles.statusText,
                              { color: statusInfo.color },
                            ]}
                          >
                            {getStatusText(statusInfo.status)}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.subscriptionDetails}>
                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>
                            {i18n._("Price")}:
                          </Text>
                          <Text style={styles.detailValue}>
                            {subscription.groupSubscription.price}{" "}
                            {subscription.groupSubscription.currency}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>
                            {i18n._("Start")}:
                          </Text>
                          <Text style={styles.detailValue}>
                            {formatDate(subscription.startDate)}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>
                            {i18n._("End")}:
                          </Text>
                          <Text style={styles.detailValue}>
                            {formatDate(subscription.endDate)}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>
                            {i18n._("Purchase")}:
                          </Text>
                          <Text style={styles.detailValue}>
                            {formatDate(subscription.purchaseDate)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.noSubscriptionsContainer}>
                <Ionicons
                  name="card-outline"
                  size={48}
                  color={colors.gray300}
                />
                <Text style={styles.noSubscriptionsText}>
                  {i18n._("No subscription history found")}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ModalUniversal>
  );
};

export default SubscriptionHistoryModal;
