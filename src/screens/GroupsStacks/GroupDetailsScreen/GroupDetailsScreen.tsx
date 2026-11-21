import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// types
import { GroupT } from "../../../providers/GroupsProvider/GroupsProvider";
import { GroupsStackParamListT } from "../../../navigators/GroupsStacks/GroupsStacks.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useGroupsProvider } from "../../../providers/GroupsProvider/GroupsProvider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

// constants
import { PATHS_GROUPS_STACKS } from "../../../navigators/paths";

// styles
import { styles } from "./GroupDetailsScreen.styles";
import colors from "../../../styles/colors";

export type GroupDetailsScreenPropsT = {
  route: RouteProp<GroupsStackParamListT, "GroupDetails">;
  navigation: NativeStackNavigationProp<GroupsStackParamListT, "GroupDetails">;
};

const GroupDetailsScreen: React.FC<GroupDetailsScreenPropsT> = ({
  route,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { getById } = useGroupsProvider();
  const { groupId } = route.params;
  const [group, setGroup] = useState<GroupT | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGroupSubscriptions = () => {
    navigation.navigate(PATHS_GROUPS_STACKS.groupSubscriptions, { groupId });
  };

  const handleManageUsers = () => {
    navigation.navigate(PATHS_GROUPS_STACKS.groupUsers, { groupId });
  };

  const getStatusText = () => {
    if (!group) return "Loading...";
    const connectedStatuses = ["creator", "administrator", "member"];
    return connectedStatuses.includes(group.botStatus || "")
      ? i18n._("Connected")
      : i18n._("Disconnected");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const fetchGroup = async () => {
    try {
      setIsLoading(true);
      const response = await getById(groupId);
      setGroup(response.data);
    } catch (error: any) {
      console.warn("Error fetching group details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  if (isLoading)
    return (
      <GradientBackground>
        <CustomHeader title="Group Details" showBackButton />
        <View style={[styles.container, { paddingBottom: bottom }]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        </View>
      </GradientBackground>
    );
  if (!group)
    return (
      <GradientBackground>
        <CustomHeader
          title={i18n._("Group Details: {groupName}", {
            groupName: "Unnamed Group",
          })}
          showBackButton
        />
        <View style={[styles.container, { paddingBottom: bottom }]}>
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>Group not found</Text>
          </View>
        </View>
      </GradientBackground>
    );
  return (
    <GradientBackground>
      <CustomHeader
        title={i18n._("Group Details: {groupName}", {
          groupName: group.name || "Unnamed Group",
        })}
        showBackButton
      />
      <View
        testID="GroupDetailsScreen"
        style={[styles.container, { paddingBottom: bottom }]}
      >
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              {group.photoUrl && (
                <Image source={{ uri: group.photoUrl }} style={styles.avatar} />
              )}
              <View style={styles.headerInfo}>
                <Text style={styles.groupName}>
                  {group.name || i18n._("Unnamed Group")}
                </Text>
                <View style={styles.headerMeta}>
                  <View
                    style={[
                      styles.statusChip,
                      !["creator", "administrator", "member"].includes(
                        group.botStatus || ""
                      ) && styles.statusChipDisconnected,
                    ]}
                  >
                    <Text style={styles.statusText}>{getStatusText()}</Text>
                  </View>
                  {group.type && (
                    <View style={styles.typeChip}>
                      <Text style={styles.typeText}>{group.type}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {group.description && (
              <Text style={styles.groupDescription}>{group.description}</Text>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>
              {i18n._("Group Information")}
            </Text>
            <View style={styles.infoRow}>
              <Ionicons name="people" size={20} color={colors.gray300} />
              <Text style={styles.infoText}>
                {group.membersCount} {i18n._("members")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="chatbubbles" size={20} color={colors.gray300} />
              <Text style={styles.infoText}>
                {i18n._("Type")}: {group.type}
              </Text>
            </View>
            {group.isForum && (
              <View style={styles.infoRow}>
                <Ionicons name="chatbubbles" size={20} color={colors.gray300} />
                <Text style={styles.infoText}>{i18n._("Forum enabled")}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color={colors.gray300} />
              <Text style={styles.infoText}>
                {i18n._("Created")}: {formatDate(group.createdAt)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="refresh" size={20} color={colors.gray300} />
              <Text style={styles.infoText}>
                {i18n._("Updated")}: {formatDate(group.updatedAt)}
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>{i18n._("User Statistics")}</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Ionicons name="card" size={24} color={colors.blue} />
                  <Text style={styles.statTitle}>
                    {i18n._("Available Subscriptions")}
                  </Text>
                </View>
                <Text style={styles.statValue}>{group.subscriptionsCount}</Text>
                <Text style={styles.statDescription}>
                  {i18n._("Total subscription plans available for this group")}
                </Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.green}
                  />
                  <Text style={styles.statTitle}>{i18n._("Active Users")}</Text>
                </View>
                <Text style={styles.statValue}>
                  {group.usersWithSubscriptionCount}
                </Text>
                <Text style={styles.statDescription}>
                  {i18n._("Users with active subscriptions")}
                </Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Ionicons name="time" size={24} color={colors.orange} />
                  <Text style={styles.statTitle}>
                    {i18n._("Expired Users")}
                  </Text>
                </View>
                <Text style={styles.statValue}>
                  {group.usersWithExpiredSubscriptionCount}
                </Text>
                <Text style={styles.statDescription}>
                  {i18n._("Users with expired subscriptions")}
                </Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Ionicons name="close-circle" size={24} color={colors.red} />
                  <Text style={styles.statTitle}>
                    {i18n._("No Subscription")}
                  </Text>
                </View>
                <Text style={styles.statValue}>
                  {group.usersWithoutSubscriptionCount}
                </Text>
                <Text style={styles.statDescription}>
                  {i18n._("Users without any subscription")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>
              {i18n._("Group Management")}
            </Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleGroupSubscriptions}
              >
                <View style={styles.actionButtonContent}>
                  <View style={styles.actionButtonIconTitle}>
                    <Ionicons name="card" size={24} color={colors.blue} />
                    <Text style={styles.actionButtonTitle}>
                      {i18n._("Group Subscriptions")}
                    </Text>
                  </View>
                  <Text style={styles.actionButtonDescription}>
                    {i18n._("Manage subscription plans and pricing")}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray300}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleManageUsers}
              >
                <View style={styles.actionButtonContent}>
                  <View style={styles.actionButtonIconTitle}>
                    <Ionicons name="people" size={24} color={colors.green} />
                    <Text style={styles.actionButtonTitle}>
                      {i18n._("Manage Users")}
                    </Text>
                  </View>
                  <Text style={styles.actionButtonDescription}>
                    {i18n._("View and manage group members")}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray300}
                />
              </TouchableOpacity>
            </View>
          </View>

          {group.addedBy && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>{i18n._("Added By")}</Text>
              <View style={styles.addedByRow}>
                <Ionicons name="person" size={20} color={colors.gray300} />
                <Text style={styles.addedByName}>
                  {group.addedBy.firstName} {group.addedBy.lastName || ""}
                </Text>
                {group.addedBy.username && (
                  <Text style={styles.addedByUsername}>
                    @{group.addedBy.username}
                  </Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default GroupDetailsScreen;
