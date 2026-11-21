import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useMembersProvider } from "../../../../../providers/MembersProvider/MembersProvider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";
import { useMemberSubscriptionsProvider } from "../../../../../providers/MemberSubscriptionsProvider/MemberSubscriptionsProvider";

// styles
import { styles } from "./MembersWithSubscriptionsAnalytics.styles";
import colors from "../../../../../styles/colors";

const { width } = Dimensions.get("window");

const MembersWithSubscriptionsAnalytics: FC = () => {
  const { i18n } = useLocalesProvider();
  const { listWithSubscriptions } = useMembersProvider();
  const { list } = useMemberSubscriptionsProvider();
  const { listOwner } = useGroupsProvider();
  const [membersWithSubscriptionsData, setMembersWithSubscriptionsData] =
    useState<any[]>([]);
  const [memberSubscriptionsData, setMemberSubscriptionsData] = useState<any[]>(
    []
  );
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersResponse, subscriptionsResponse, groupsResponse] =
        await Promise.all([
          listWithSubscriptions({
            limit: 100,
            page: 1,
            sortBy: "createdAt",
            order: "asc",
            groupId: "",
          }),
          list({
            limit: 100,
            page: 1,
            order: "asc",
          }),
          listOwner({
            limit: 100,
            page: 1,
            sortBy: "createdAt",
            order: "asc",
          }),
        ]);
      setMembersWithSubscriptionsData(membersResponse.data);
      setMemberSubscriptionsData(subscriptionsResponse.data);
      setGroupsData(groupsResponse.data);
    } catch (error) {
      console.warn("Failed to load members with subscriptions data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalMembersWithSubscriptions = membersWithSubscriptionsData.length;
  const totalMemberSubscriptions = memberSubscriptionsData.length;
  const activeSubscriptions = memberSubscriptionsData.filter(
    (sub) => sub.isActive
  ).length;
  const expiredSubscriptions = memberSubscriptionsData.filter(
    (sub) => !sub.isActive
  ).length;

  const membersByGroup = groupsData
    .map((group) => {
      const groupMembers = membersWithSubscriptionsData.filter((member) =>
        member.groups?.some((g: any) => g._id === group.id)
      );
      const groupSubscriptions = memberSubscriptionsData.filter(
        (sub) => sub.groupId === group.id
      );
      return {
        groupName: group.name || "Unknown Group",
        membersWithSubscriptions: groupMembers.length,
        totalSubscriptions: groupSubscriptions.length,
        activeSubscriptions: groupSubscriptions.filter((sub) => sub.isActive)
          .length,
      };
    })
    .filter((group) => group.membersWithSubscriptions > 0);

  const topGroupsByMembersWithSubscriptions = membersByGroup
    .sort((a, b) => b.membersWithSubscriptions - a.membersWithSubscriptions)
    .slice(0, 5);

  const subscriptionTypes = memberSubscriptionsData.reduce((acc, sub) => {
    const type = sub.giftType || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const subscriptionTypesData = Object.entries(subscriptionTypes).map(
    ([type, count], index) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1).substring(0, 8),
      population: count,
      color: [
        "#64C8FF",
        "#FF6B9D",
        "#4ECDC4",
        "#FFE66D",
        "#A8E6CF",
        "#FFB3BA",
        "#C7CEEA",
        "#FF9A9E",
      ][index % 8],
      legendFontColor: colors.white,
      legendFontSize: 12,
    })
  );

  const chartConfig = {
    backgroundColor: colors.blue950,
    backgroundGradientFrom: colors.blue950,
    backgroundGradientTo: colors.blue950,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(100, 200, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
  };

  const lineChartConfig = {
    backgroundColor: colors.blue950,
    backgroundGradientFrom: colors.blue950,
    backgroundGradientTo: colors.blue950,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(100, 200, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.eminence,
    },
  };

  const pieChartConfig = {
    backgroundColor: colors.blue950,
    backgroundGradientFrom: colors.blue950,
    backgroundGradientTo: colors.blue950,
    color: (opacity = 1) => `rgba(100, 200, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const groupsChartData = {
    labels: topGroupsByMembersWithSubscriptions.map((group) =>
      group.groupName.substring(0, 10)
    ),
    datasets: [
      {
        data: topGroupsByMembersWithSubscriptions.map(
          (group) => group.membersWithSubscriptions
        ) as number[],
      },
    ],
  };

  const activeVsExpiredData = {
    labels: [i18n._("Active"), i18n._("Expired")],
    datasets: [
      {
        data: [activeSubscriptions, expiredSubscriptions] as number[],
        color: (opacity = 1) => `rgba(62, 58, 109, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {i18n._("Members with Subscriptions Analytics")}
        </Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{i18n._("Loading...")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {i18n._("Members with Subscriptions Analytics")}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.eminence }]}>
            <Ionicons name="people" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalMembersWithSubscriptions}</Text>
          <Text style={styles.statLabel}>
            {i18n._("Members with Subscriptions")}
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.infoBlue }]}>
            <Ionicons name="card" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalMemberSubscriptions}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Subscriptions")}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIcon, { backgroundColor: colors.successGreen }]}
          >
            <Ionicons name="checkmark-circle" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{activeSubscriptions}</Text>
          <Text style={styles.statLabel}>{i18n._("Active Subscriptions")}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.errorRed }]}>
            <Ionicons name="close-circle" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{expiredSubscriptions}</Text>
          <Text style={styles.statLabel}>
            {i18n._("Expired Subscriptions")}
          </Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Active vs Expired Subscriptions")}
        </Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={activeVsExpiredData}
            width={width - 64}
            height={220}
            chartConfig={lineChartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Top Groups by Members with Subscriptions")}
        </Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={groupsChartData}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
          />
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Subscription Types Distribution")}
        </Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={subscriptionTypesData}
            width={width - 64}
            height={220}
            chartConfig={pieChartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Groups with Members and Subscriptions")}
        </Text>
        <View style={styles.detailsContainer}>
          {membersByGroup.length > 0 ? (
            membersByGroup.slice(0, 10).map((group, index) => (
              <View key={index} style={styles.detailItem}>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>{group.groupName}</Text>
                  <Text style={styles.detailSubtitle}>
                    {group.membersWithSubscriptions} {i18n._("members")} /{" "}
                    {group.activeSubscriptions} {i18n._("active subs")}
                  </Text>
                </View>
                <View style={styles.detailStats}>
                  <Text style={styles.detailPercentage}>
                    {group.totalSubscriptions > 0
                      ? Math.round(
                          (group.activeSubscriptions /
                            group.totalSubscriptions) *
                            100
                        )
                      : 0}
                    %
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="people-outline"
                size={48}
                color={colors.gray400}
              />
              <Text style={styles.emptyStateText}>
                {i18n._("No groups with members and subscriptions found")}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {i18n._(
                  "Groups will appear here once they have members with subscriptions"
                )}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MembersWithSubscriptionsAnalytics;
