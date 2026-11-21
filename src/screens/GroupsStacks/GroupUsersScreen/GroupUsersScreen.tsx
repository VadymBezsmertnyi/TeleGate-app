import React, { FC, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { GroupsStackParamListT } from "../../../navigators/GroupsStacks/GroupsStacks.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { MemberWithSubscriptionT } from "../../../providers/MembersProvider/MembersProvider.types";
import { useMembersProvider } from "../../../providers/MembersProvider/MembersProvider";

// constants
import { PATHS_GROUPS_STACKS } from "../../../navigators/paths";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import GroupUsersTabs, {
  TabType,
} from "./components/GroupUsersTabs/GroupUsersTabs";
import GroupUserItem from "./components/GroupUserItem/GroupUserItem";

// styles
import { styles } from "./GroupUsersScreen.styles";
import colors from "../../../styles/colors";

export type GroupUsersScreenPropsT = {
  route: RouteProp<GroupsStackParamListT, "GroupUsers">;
  navigation: NativeStackNavigationProp<GroupsStackParamListT, "GroupUsers">;
};

const GroupUsersScreen: FC<GroupUsersScreenPropsT> = ({
  route,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { groupMembersWithSubscriptions, listWithSubscriptions } =
    useMembersProvider();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { groupId } = useMemo(() => route.params, [route.params]);
  const members = useMemo(
    () => groupMembersWithSubscriptions[groupId]?.data || [],
    [groupMembersWithSubscriptions, groupId]
  );

  const fetchData = async (page: number = 1, isRefresh: boolean = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setIsLoading(true);

      const cachedData = groupMembersWithSubscriptions[groupId];
      if (cachedData && !isRefresh && page === 1) {
        setHasMore(cachedData.meta.page < cachedData.meta.pages);
        setCurrentPage(cachedData.meta.page);
        return;
      }

      const response = await listWithSubscriptions({
        groupId,
        limit: 20,
        page,
        sortBy: "createdAt",
        order: "asc",
      });

      setHasMore(response.meta.page < response.meta.pages);
      setCurrentPage(page);
    } catch (error: any) {
      if (error.name !== "AbortError")
        console.warn("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    await fetchData(1, true);
  };

  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    await fetchData(currentPage + 1);
  };

  const handleSubscriptionPress = (memberId: string) => {
    navigation.navigate(PATHS_GROUPS_STACKS.groupUserDetails, {
      userId: memberId,
      groupId,
    });
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (member.isBot) return false;

      let latestActiveSubscription = null;
      if (member.activeSubscriptions && member.activeSubscriptions.length > 0) {
        latestActiveSubscription = member.activeSubscriptions.reduce(
          (latest, current) => {
            const latestEndDate = new Date(latest.endDate);
            const currentEndDate = new Date(current.endDate);
            return currentEndDate > latestEndDate ? current : latest;
          }
        );
      }

      switch (activeTab) {
        case "all":
          return true;
        case "withSubscription":
          if (!latestActiveSubscription) return false;
          const now = new Date();
          return new Date(latestActiveSubscription.endDate) > now;
        case "expired":
          if (!latestActiveSubscription) return false;
          const nowExpired = new Date();
          return new Date(latestActiveSubscription.endDate) < nowExpired;
        case "withoutSubscription":
          return !latestActiveSubscription;
        default:
          return true;
      }
    });
  }, [members, activeTab]);

  const renderUserItem = ({ item }: { item: MemberWithSubscriptionT }) => {
    const member = item;

    // Find the latest active subscription (the one with the latest endDate)
    let latestActiveSubscription = null;
    if (member.activeSubscriptions && member.activeSubscriptions.length > 0) {
      latestActiveSubscription = member.activeSubscriptions.reduce(
        (latest, current) => {
          const latestEndDate = new Date(latest.endDate);
          const currentEndDate = new Date(current.endDate);
          return currentEndDate > latestEndDate ? current : latest;
        }
      );
    }

    let status: "active" | "expired" | "expiring" | "none" = "none";
    if (latestActiveSubscription) {
      const now = new Date();
      const endDate = new Date(latestActiveSubscription.endDate);
      if (endDate < now) {
        status = "expired";
      } else if (endDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
        status = "expiring";
      } else {
        status = "active";
      }
    }

    return (
      <GroupUserItem
        member={member}
        subscription={
          latestActiveSubscription
            ? {
                _id: latestActiveSubscription._id,
                startDate: new Date(latestActiveSubscription.startDate),
                endDate: new Date(latestActiveSubscription.endDate),
                status,
              }
            : undefined
        }
        onPress={handleSubscriptionPress}
      />
    );
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading || refreshing) return null;

    let title, subtitle;

    if (activeTab !== "all") {
      title = i18n._("No users match your filter");
      subtitle = i18n._("Try adjusting your filter or switch to 'All' tab");
    } else {
      title = i18n._("No users found");
      subtitle = i18n._("This group doesn't have any users yet");
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptySubtitle}>{subtitle}</Text>
      </View>
    );
  };

  useEffect(() => {
    fetchData(1, true);
  }, [groupId]);

  useEffect(() => {
    const groupData = groupMembersWithSubscriptions[groupId];
    if (groupData) {
      setHasMore(groupData.meta.page < groupData.meta.pages);
      setCurrentPage(groupData.meta.page);
    }
  }, [groupMembersWithSubscriptions, groupId]);

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("Manage Users")} showBackButton />
      <View
        testID="GroupUsersScreen"
        style={[styles.container, { paddingBottom: bottom }]}
      >
        <GroupUsersTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            all: members.filter((member) => !member.isBot).length,
            withSubscription: members.filter((member) => {
              if (
                member.isBot ||
                !member.activeSubscriptions ||
                member.activeSubscriptions.length === 0
              )
                return false;

              // Find the latest active subscription
              const latestActiveSubscription =
                member.activeSubscriptions.reduce((latest, current) => {
                  const latestEndDate = new Date(latest.endDate);
                  const currentEndDate = new Date(current.endDate);
                  return currentEndDate > latestEndDate ? current : latest;
                });

              const now = new Date();
              return new Date(latestActiveSubscription.endDate) > now;
            }).length,
            expired: members.filter((member) => {
              if (
                member.isBot ||
                !member.activeSubscriptions ||
                member.activeSubscriptions.length === 0
              )
                return false;

              // Find the latest active subscription
              const latestActiveSubscription =
                member.activeSubscriptions.reduce((latest, current) => {
                  const latestEndDate = new Date(latest.endDate);
                  const currentEndDate = new Date(current.endDate);
                  return currentEndDate > latestEndDate ? current : latest;
                });

              const now = new Date();
              return new Date(latestActiveSubscription.endDate) < now;
            }).length,
            withoutSubscription: members.filter(
              (member) =>
                !member.isBot &&
                (!member.activeSubscriptions ||
                  member.activeSubscriptions.length === 0)
            ).length,
          }}
        />

        <FlatList
          testID="GroupUsersScreen"
          style={styles.content}
          contentContainerStyle={[
            styles.contentContainer,
            filteredMembers.length === 0 &&
              !isLoading &&
              !refreshing && { flex: 1 },
          ]}
          data={filteredMembers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={filteredMembers.length === 0 ? undefined : loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </GradientBackground>
  );
};

export default GroupUsersScreen;
