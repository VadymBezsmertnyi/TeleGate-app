import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// types
import { UserDetailsI } from "./UserDetailsScreen.types";
import { MemberT } from "../../../providers/MembersProvider/MembersProvider.types";
import { UsersStackParamListT } from "../../../navigators/UsersStacks/UsersStacks.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMembersProvider } from "../../../providers/MembersProvider/MembersProvider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import GroupSelectionModal from "./components/GroupSelectionModal/GroupSelectionModal";

// styles
import { styles } from "./UserDetailsScreen.styles";
import colors from "../../../styles/colors";

// helpers
import ToastHelper from "../../../helps/toast.help";

export type UserDetailsScreenPropsT = {
  route: RouteProp<UsersStackParamListT, "UserDetails">;
};

const UserDetailsScreen: FC<UserDetailsScreenPropsT> = ({ route }) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { getById } = useMembersProvider();
  const { userId } = route.params;
  const [user, setUser] = useState<UserDetailsI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGroupSelectionModalVisible, setIsGroupSelectionModalVisible] =
    useState(false);

  const [showAllGroups, setShowAllGroups] = useState(false);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getById(userId);
        const member = response.data;

        setUser(member);
      } catch (error: any) {
        console.warn("Error fetching user details:", error);
        ToastHelper.error({
          title: "Error",
          text: "Failed to fetch user details",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [getById, userId]);

  const handleMessage = () => {
    if (!user) return;

    if (user.tgUserId && user.groups && user.groups.length > 0) {
      setIsGroupSelectionModalVisible(true);
    } else {
      Alert.alert(
        i18n._("Error"),
        i18n._("Cannot send message: user not found or not in any groups"),
        [{ text: i18n._("OK") }]
      );
    }
  };

  const handleRemove = () => {
    Alert.alert(
      i18n._("Feature in Development"),
      i18n._("User removal functionality is currently being developed"),
      [{ text: i18n._("OK") }]
    );
  };

  const handleViewProfile = async () => {
    try {
      if (!user) {
        Alert.alert(i18n._("Error"), i18n._("User data not available"), [
          { text: i18n._("OK") },
        ]);
        return;
      }

      if (!user.telegramUsername && !user.tgUserId) {
        Alert.alert(
          i18n._("Profile not available"),
          i18n._("This user has no public Telegram profile"),
          [{ text: i18n._("OK") }]
        );
        return;
      }

      let telegramUrl: string;
      if (user.telegramUsername) {
        telegramUrl = `https://t.me/${user.telegramUsername}`;
      } else if (user.tgUserId) {
        telegramUrl = `https://t.me/user?id=${user.tgUserId}`;
      } else {
        Alert.alert(i18n._("Error"), i18n._("Telegram profile not available"), [
          { text: i18n._("OK") },
        ]);
        return;
      }

      await Linking.openURL(telegramUrl);
    } catch (error) {
      console.warn("Failed to open user profile in Telegram:", error);
      Alert.alert(
        i18n._("Error"),
        i18n._("Failed to open profile in Telegram"),
        [{ text: i18n._("OK") }]
      );
    }
  };

  const getStatusIcon = () => {
    return user?.isBot ? "hardware-chip" : "person";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <GradientBackground>
        <CustomHeader title={i18n._("User Details")} showBackButton />
        <View style={[styles.container, { paddingBottom: bottom }]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        </View>
      </GradientBackground>
    );
  }

  if (!user) {
    return (
      <GradientBackground>
        <CustomHeader title={i18n._("User Details")} showBackButton />
        <View style={[styles.container, { paddingBottom: bottom }]}>
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>User not found</Text>
          </View>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("User Details")} showBackButton />
      <View
        testID="UserDetailsScreen"
        style={[styles.container, { paddingBottom: bottom }]}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              {user.photoUrl ? (
                <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons
                    name={getStatusIcon()}
                    size={32}
                    color={colors.gray300}
                  />
                </View>
              )}
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.userUsername}>@{user.username}</Text>
              {user.languageCode && (
                <View style={styles.languageContainer}>
                  <Ionicons name="language" size={14} color={colors.gray400} />
                  <Text style={styles.languageText}>
                    {user.languageCode.toUpperCase()}
                  </Text>
                </View>
              )}

              <View style={styles.compactStatsContainer}>
                <View style={styles.compactStatItem}>
                  <Ionicons name="people" size={14} color={colors.primary} />
                  <Text style={styles.compactStatText}>
                    {user.groups?.length || 0} {i18n._("groups")}
                  </Text>
                </View>
                <View style={styles.compactStatItem}>
                  <Ionicons name="card" size={14} color={colors.primary} />
                  <Text style={styles.compactStatText}>
                    {user.activeSubscriptionsCount || 0}{" "}
                    {i18n._("subscriptions")}
                  </Text>
                </View>
                {user.subscriptionDelaysDays !== undefined &&
                  user.subscriptionDelaysDays > 0 && (
                    <View style={styles.compactStatItem}>
                      <Ionicons
                        name="warning"
                        size={14}
                        color={colors.warningOrange}
                      />
                      <Text
                        style={[
                          styles.compactStatText,
                          { color: colors.warningOrange },
                        ]}
                      >
                        {user.subscriptionDelaysDays} {i18n._("days delay")}
                      </Text>
                    </View>
                  )}
              </View>
            </View>
          </View>

          {/* Action Buttons Section */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.viewProfileButton}
              onPress={handleViewProfile}
            >
              <Ionicons name="person" size={18} color={colors.white} />
              <Text style={styles.viewProfileButtonText}>
                {i18n._("View Profile")}
              </Text>
            </TouchableOpacity>

            <View style={styles.otherActionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleMessage}
              >
                <Ionicons name="chatbubble" size={16} color={colors.white} />
                <Text style={styles.actionButtonText}>{i18n._("Message")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleRemove}
              >
                <Ionicons name="person-remove" size={16} color={colors.white} />
                <Text style={styles.actionButtonText}>{i18n._("Remove")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Groups Section */}
          {user.groups && user.groups.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {i18n._("Active Groups")} ({user.groups.length})
              </Text>

              {(showAllGroups ? user.groups : user.groups.slice(0, 1)).map(
                (group) => (
                  <View key={group._id} style={styles.groupItem}>
                    <Ionicons
                      name="people"
                      size={20}
                      color={colors.gray300}
                      style={styles.groupIcon}
                    />
                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>{group.title}</Text>
                      <Text style={styles.groupRole}>{i18n._("Member")}</Text>
                    </View>
                  </View>
                )
              )}

              {user.groups.length > 1 && !showAllGroups && (
                <TouchableOpacity
                  style={styles.showAllButton}
                  onPress={() => setShowAllGroups(true)}
                >
                  <Text style={styles.showAllButtonText}>
                    {i18n._("Show all")} ({user.groups.length - 1}{" "}
                    {i18n._("more")})
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}

              {showAllGroups && user.groups.length > 1 && (
                <TouchableOpacity
                  style={styles.showAllButton}
                  onPress={() => setShowAllGroups(false)}
                >
                  <Text style={styles.showAllButtonText}>
                    {i18n._("Show less")}
                  </Text>
                  <Ionicons
                    name="chevron-up"
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Active Subscriptions Section */}
          {user.activeSubscriptions && user.activeSubscriptions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {i18n._("Active Subscriptions")} (
                {user.activeSubscriptions.length})
              </Text>

              {(showAllSubscriptions
                ? user.activeSubscriptions
                : user.activeSubscriptions.slice(0, 1)
              ).map((subscription) => (
                <View key={subscription._id} style={styles.subscriptionItem}>
                  <Ionicons
                    name="card"
                    size={20}
                    color={colors.successGreen}
                    style={styles.subscriptionIcon}
                  />
                  <View style={styles.subscriptionInfo}>
                    <Text style={styles.subscriptionTitle}>
                      {subscription.groupSubscription?.title ||
                        i18n._("Subscription")}
                    </Text>
                    <Text style={styles.subscriptionGroup}>
                      {subscription.group?.title || i18n._("Group")}
                    </Text>
                    <Text style={styles.subscriptionDate}>
                      {i18n._("Until")}:{" "}
                      {formatDate(new Date(subscription.endDate))}
                    </Text>
                  </View>
                </View>
              ))}

              {user.activeSubscriptions.length > 1 && !showAllSubscriptions && (
                <TouchableOpacity
                  style={styles.showAllButton}
                  onPress={() => setShowAllSubscriptions(true)}
                >
                  <Text style={styles.showAllButtonText}>
                    {i18n._("Show all")} ({user.activeSubscriptions.length - 1}{" "}
                    {i18n._("more")})
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}

              {showAllSubscriptions && user.activeSubscriptions.length > 1 && (
                <TouchableOpacity
                  style={styles.showAllButton}
                  onPress={() => setShowAllSubscriptions(false)}
                >
                  <Text style={styles.showAllButtonText}>
                    {i18n._("Show less")}
                  </Text>
                  <Ionicons
                    name="chevron-up"
                    size={16}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>

        {isGroupSelectionModalVisible && (
          <GroupSelectionModal
            visible={isGroupSelectionModalVisible}
            onClose={() => setIsGroupSelectionModalVisible(false)}
            user={user}
            onSuccess={() => {
              // Handle success if needed
            }}
          />
        )}
      </View>
    </GradientBackground>
  );
};

export default UserDetailsScreen;
