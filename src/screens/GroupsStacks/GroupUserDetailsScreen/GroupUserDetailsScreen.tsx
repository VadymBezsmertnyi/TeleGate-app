import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// types
import { GroupsStackParamListT } from "../../../navigators/GroupsStacks/GroupsStacks.types";
import { MemberWithSubscriptionT } from "../../../providers/MembersProvider/MembersProvider.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMembersProvider } from "../../../providers/MembersProvider/MembersProvider";
import { useGroupsProvider } from "../../../providers/GroupsProvider/GroupsProvider";
import { GroupT } from "../../../providers/GroupsProvider/GroupsProvider.types";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import WriteMessageModal from "./components/WriteMessageModal/WriteMessageModal";
import GiveSubscriptionModal from "./components/GiveSubscriptionModal/GiveSubscriptionModal";
import SubscriptionHistoryModal from "./components/SubscriptionHistoryModal/SubscriptionHistoryModal";

// styles
import { styles } from "./GroupUserDetailsScreen.styles";
import colors from "../../../styles/colors";

export type UserDetailsPropsT = {
  route: RouteProp<GroupsStackParamListT, "GroupUserDetails">;
};

const UserDetails: FC<UserDetailsPropsT> = ({ route }) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { getWithSubscriptionsById } = useMembersProvider();
  const { groups } = useGroupsProvider();
  const { userId, groupId } = route.params;

  const [user, setUser] = useState<MemberWithSubscriptionT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userGroups, setUserGroups] = useState<GroupT[]>([]);
  const [isWriteMessageModalVisible, setIsWriteMessageModalVisible] =
    useState(false);
  const [isGiveSubscriptionModalVisible, setIsGiveSubscriptionModalVisible] =
    useState(false);
  const [
    isSubscriptionHistoryModalVisible,
    setIsSubscriptionHistoryModalVisible,
  ] = useState(false);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      if (!groupId) {
        Toast.show({
          type: "error",
          text1: i18n._("Group ID is required"),
        });
        return;
      }
      const response = await getWithSubscriptionsById(userId, groupId);
      setUser(response.data);
      if (!response.data.groups || response.data.groups.length === 0) {
        setUserGroups([]);
        return;
      }

      if (groups.length === 0) {
        setUserGroups([]);
        return;
      }

      const userGroupsData = groups.filter((group) =>
        response.data.groups!.includes(group.id)
      );
      setUserGroups(userGroupsData);
    } catch (error) {
      console.warn("Failed to load user data:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Failed to load user data"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = () => {
    Alert.alert(
      i18n._("Function in development"),
      i18n._("User deletion is temporarily unavailable")
    );
  };

  const handleGiveSubscription = () => {
    setIsGiveSubscriptionModalVisible(true);
  };

  const handleWriteMessage = () => {
    setIsWriteMessageModalVisible(true);
  };

  const handleSendTemplateMessage = () => {
    Alert.alert(
      i18n._("Function in development"),
      i18n._("Sending template messages is temporarily unavailable")
    );
  };

  const handleOpenTelegram = () => {
    try {
      if (!user) {
        Toast.show({
          type: "error",
          text1: i18n._("User data not available"),
        });
        return;
      }
      if (!user.telegramUsername && !user.tgUserId) {
        Toast.show({
          type: "info",
          text1: i18n._("Profile not available"),
          text2: i18n._("This user has no public Telegram profile"),
        });
        return;
      }

      let telegramUrl: string;
      if (user.telegramUsername)
        telegramUrl = `https://t.me/${user.telegramUsername}`;
      else if (user.tgUserId)
        telegramUrl = `https://t.me/user?id=${user.tgUserId}`;
      else {
        Toast.show({
          type: "error",
          text1: i18n._("Telegram profile not available"),
        });
        return;
      }

      Linking.openURL(telegramUrl);
    } catch (error) {
      console.warn("Failed to open user profile in Telegram:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Failed to open profile in Telegram"),
      });
    }
  };

  const getDisplayName = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Unknown user";
  };

  const getUsername = () => {
    return user?.username ? `@${user.username}` : "";
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getSortedSubscriptions = () => {
    if (!user?.activeSubscriptions) return [];

    return user.activeSubscriptions.sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const getSubscriptionsToShow = () => {
    const sortedSubscriptions = getSortedSubscriptions();

    if (showAllSubscriptions || sortedSubscriptions.length <= 1) {
      return sortedSubscriptions;
    }

    return [sortedSubscriptions[0]];
  };

  useEffect(() => {
    if (!userId) return;

    loadUserData();
  }, [userId]);

  useEffect(() => {
    if (!userId || !user || groups.length === 0) return;

    if (!user.groups || user.groups.length === 0) {
      setUserGroups([]);
      return;
    }

    const userGroupsData = groups.filter((group) =>
      user.groups!.includes(group.id)
    );
    setUserGroups(userGroupsData);
  }, [groups, user, userId]);

  if (isLoading)
    return (
      <GradientBackground>
        <CustomHeader title={i18n._("User Details")} showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{i18n._("Loading...")}</Text>
        </View>
      </GradientBackground>
    );
  if (!user)
    return (
      <GradientBackground>
        <CustomHeader title={i18n._("User Details")} showBackButton />
        <View style={styles.errorContainer}>
          <Ionicons name="person" size={64} color={colors.gray300} />
          <Text style={styles.errorTitle}>{i18n._("User not found")}</Text>
          <Text style={styles.errorSubtitle}>
            {i18n._("Check user ID validity")}
          </Text>
        </View>
      </GradientBackground>
    );
  return (
    <GradientBackground>
      <CustomHeader title={i18n._("User Details")} showBackButton />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n._("Basic Information")}</Text>

          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              {user.photoUrl ? (
                <Image
                  source={{ uri: user.photoUrl }}
                  style={styles.avatar}
                  onError={() => {}}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons
                    name={user.isBot ? "hardware-chip" : "person"}
                    size={24}
                    color={colors.gray300}
                  />
                </View>
              )}
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{getDisplayName()}</Text>
              {getUsername() && (
                <Text style={styles.userUsername}>{getUsername()}</Text>
              )}
              {user.telegramUsername && (
                <Text style={styles.userTelegramUsername}>
                  @{user.telegramUsername}
                </Text>
              )}
              <View style={styles.botStatus}>
                <Ionicons
                  name={user.isBot ? "hardware-chip" : "person"}
                  size={14}
                  color={
                    user.isBot ? colors.warningYellow : colors.successGreen
                  }
                />
                <Text style={styles.botStatusText}>
                  {user.isBot ? "Bot" : "User"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{i18n._("Subscriptions")}</Text>
            {user.activeSubscriptionsCount &&
            user.activeSubscriptionsCount > 0 ? (
              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => setIsSubscriptionHistoryModalVisible(true)}
              >
                <Text style={styles.historyButtonText}>
                  {i18n._("Show history")}
                </Text>
                <Ionicons name="time" size={16} color={colors.primary} />
              </TouchableOpacity>
            ) : null}
          </View>

          {getSortedSubscriptions().length > 0 ? (
            <View style={styles.subscriptionsList}>
              {getSubscriptionsToShow().map((subscription) => (
                <View key={subscription._id} style={styles.subscriptionCard}>
                  <View style={styles.subscriptionHeader}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={colors.successGreen}
                    />
                    <Text style={styles.subscriptionStatus}>
                      {i18n._("Active")}{" "}
                      {getSortedSubscriptions().length > 1 &&
                        `#${
                          getSortedSubscriptions().indexOf(subscription) + 1
                        }`}
                    </Text>
                  </View>

                  <View style={styles.subscriptionDetails}>
                    <View style={styles.subscriptionRow}>
                      <Text style={styles.subscriptionLabel}>
                        {i18n._("Plan")}:
                      </Text>
                      <Text style={styles.subscriptionValue}>
                        {subscription.groupSubscription.title}
                      </Text>
                    </View>
                    <View style={styles.subscriptionRow}>
                      <Text style={styles.subscriptionLabel}>
                        {i18n._("Price")}:
                      </Text>
                      <Text style={styles.subscriptionValue}>
                        {subscription.groupSubscription.price}{" "}
                        {subscription.groupSubscription.currency}
                      </Text>
                    </View>
                    <View style={styles.subscriptionRow}>
                      <Text style={styles.subscriptionLabel}>
                        {i18n._("Start")}:
                      </Text>
                      <Text style={styles.subscriptionValue}>
                        {formatDate(subscription.startDate)}
                      </Text>
                    </View>
                    <View style={styles.subscriptionRow}>
                      <Text style={styles.subscriptionLabel}>
                        {i18n._("End")}:
                      </Text>
                      <Text style={styles.subscriptionValue}>
                        {formatDate(subscription.endDate)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {getSortedSubscriptions().length > 1 && (
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setShowAllSubscriptions(!showAllSubscriptions)}
                >
                  <Text style={styles.showMoreButtonText}>
                    {showAllSubscriptions
                      ? i18n._("Hide other subscriptions")
                      : i18n._("Show other subscriptions")}
                  </Text>
                  <Ionicons
                    name={showAllSubscriptions ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.subscriptionCard}>
              <View style={styles.subscriptionHeader}>
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={colors.gray400}
                />
                <Text style={styles.subscriptionStatus}>
                  {i18n._("No active subscriptions")}
                </Text>
              </View>
              <Text style={styles.noSubscriptionText}>
                {i18n._("User has no active subscriptions")}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n._("Groups")}</Text>

          <View style={styles.groupsCard}>
            {groups.length === 0 ? (
              <View style={styles.groupsLoadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.groupsLoadingText}>
                  {i18n._("Loading groups...")}
                </Text>
              </View>
            ) : userGroups.length > 0 ? (
              <View style={styles.groupsList}>
                {userGroups.map((group, index) => (
                  <View
                    key={group.id}
                    style={[styles.groupItem, !group.name && { opacity: 0.6 }]}
                  >
                    <View style={styles.groupIcon}>
                      <Ionicons name="people" size={14} color={colors.white} />
                    </View>
                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>
                        {group.name || `Група ${index + 1}`}
                      </Text>
                      <View style={styles.groupMeta}>
                        <Text style={styles.groupMetaText}>
                          {i18n._("Members")}: {group.membersCount || 0}
                        </Text>
                        <Text style={styles.groupMetaText}>
                          {i18n._("Created")}: {formatDate(group.createdAt)}
                        </Text>
                        <Text
                          style={[
                            styles.groupMetaText,
                            {
                              color: group.name
                                ? colors.successGreen
                                : colors.gray400,
                            },
                          ]}
                        >
                          {group.name ? i18n._("Public") : i18n._("Private")}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noGroupsText}>
                {i18n._("User is not a member of any group")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n._("Quick Actions")}</Text>

          <View style={styles.actionsCard}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.telegramButton,
                !user?.telegramUsername && !user?.tgUserId && { opacity: 0.5 },
              ]}
              onPress={handleOpenTelegram}
              disabled={!user?.telegramUsername && !user?.tgUserId}
            >
              <Ionicons name="paper-plane" size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>
                {i18n._("Open profile in Telegram")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleWriteMessage}
            >
              <Ionicons name="chatbubble" size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>
                {i18n._("Write message")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.infoButton]}
              onPress={handleSendTemplateMessage}
            >
              <Ionicons name="document-text" size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>
                {i18n._("Send template")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleGiveSubscription}
            >
              <Ionicons name="card" size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>
                {i18n._("Give subscription")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.dangerButton]}
              onPress={handleDeleteUser}
            >
              <Ionicons name="trash" size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>
                {i18n._("Delete user")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {i18n._("Additional Information")}
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{i18n._("Language")}:</Text>
              <Text style={styles.infoValue}>
                {user.languageCode || i18n._("Not specified")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{i18n._("Can join groups")}:</Text>
              <Text style={styles.infoValue}>
                {user.canJoinGroups ? i18n._("Yes") : i18n._("No")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {i18n._("Can read all messages")}:
              </Text>
              <Text style={styles.infoValue}>
                {user.canReadAllGroupMessages ? i18n._("Yes") : i18n._("No")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {i18n._("Supports inline queries")}:
              </Text>
              <Text style={styles.infoValue}>
                {user.supportsInlineQueries ? i18n._("Yes") : i18n._("No")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{i18n._("Created")}:</Text>
              <Text style={styles.infoValue}>{formatDate(user.createdAt)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{i18n._("Updated")}:</Text>
              <Text style={styles.infoValue}>{formatDate(user.updatedAt)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {isWriteMessageModalVisible && (
        <WriteMessageModal
          visible={isWriteMessageModalVisible}
          onClose={() => setIsWriteMessageModalVisible(false)}
          user={user}
          groupId={groupId}
        />
      )}

      {isGiveSubscriptionModalVisible && (
        <GiveSubscriptionModal
          visible={isGiveSubscriptionModalVisible}
          onClose={() => setIsGiveSubscriptionModalVisible(false)}
          user={user}
          groupId={groupId}
          onSuccess={() => {
            setIsGiveSubscriptionModalVisible(false);
            loadUserData();
          }}
        />
      )}

      {isSubscriptionHistoryModalVisible && (
        <SubscriptionHistoryModal
          visible={isSubscriptionHistoryModalVisible}
          onClose={() => setIsSubscriptionHistoryModalVisible(false)}
          user={user}
          groupId={groupId}
        />
      )}
    </GradientBackground>
  );
};

export default UserDetails;
