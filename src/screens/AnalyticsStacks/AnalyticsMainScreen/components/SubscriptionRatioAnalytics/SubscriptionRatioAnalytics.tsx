import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart, ProgressChart } from "react-native-chart-kit";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";
import { useMembersProvider } from "../../../../../providers/MembersProvider/MembersProvider";
import { useMemberSubscriptionsProvider } from "../../../../../providers/MemberSubscriptionsProvider/MemberSubscriptionsProvider";

// styles
import { styles } from "./SubscriptionRatioAnalytics.styles";
import colors from "../../../../../styles/colors";

const { width } = Dimensions.get("window");

const SubscriptionRatioAnalytics: FC = () => {
  const { i18n } = useLocalesProvider();
  const { listOwner: listGroups } = useGroupsProvider();
  const { listOwner: listMembers } = useMembersProvider();
  const { list } = useMemberSubscriptionsProvider();
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [membersData, setMembersData] = useState<any[]>([]);
  const [subscriptionsData, setSubscriptionsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [groupsResponse, membersResponse, subscriptionsResponse] =
        await Promise.all([
          listGroups({
            limit: 100,
            page: 1,
            sortBy: "createdAt",
            order: "asc",
          }),
          listMembers({
            limit: 100,
            page: 1,
            sortBy: "createdAt",
            order: "asc",
          }),
          list({
            limit: 100,
            page: 1,
            order: "asc",
          }),
        ]);
      setGroupsData(groupsResponse.data);
      setMembersData(membersResponse.data);
      setSubscriptionsData(subscriptionsResponse.data);
    } catch (error) {
      console.warn("Failed to load subscription ratio data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalMembers = membersData.length;
  const totalSubscriptions = subscriptionsData.length;
  const activeSubscriptions = subscriptionsData.filter(
    (sub) => sub.isActive
  ).length;
  const expiredSubscriptions = subscriptionsData.filter(
    (sub) => !sub.isActive
  ).length;

  const subscriptionRatio =
    totalMembers > 0 ? (activeSubscriptions / totalMembers) * 100 : 0;
  const conversionRate =
    totalMembers > 0 ? (totalSubscriptions / totalMembers) * 100 : 0;

  const groupsWithRatios = groupsData
    .map((group) => {
      const groupMembers = membersData.filter((member) =>
        member.groups?.some((g: any) => g._id === group.id)
      );
      const groupSubscriptions = subscriptionsData.filter(
        (sub) => sub.groupId === group.id
      );
      const activeGroupSubscriptions = groupSubscriptions.filter(
        (sub) => sub.isActive
      );

      const memberCount = groupMembers.length;
      const subscriptionCount = groupSubscriptions.length;
      const activeSubscriptionCount = activeGroupSubscriptions.length;

      return {
        groupName: group.name || "Unknown Group",
        memberCount,
        subscriptionCount,
        activeSubscriptionCount,
        subscriptionRatio:
          memberCount > 0 ? (activeSubscriptionCount / memberCount) * 100 : 0,
        conversionRate:
          memberCount > 0 ? (subscriptionCount / memberCount) * 100 : 0,
      };
    })
    .filter((group) => group.memberCount > 0);

  const topGroupsByRatio = groupsWithRatios
    .sort((a, b) => b.subscriptionRatio - a.subscriptionRatio)
    .slice(0, 5);

  const topGroupsByConversion = groupsWithRatios
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  const chartConfig = {
    backgroundColor: colors.blue950,
    backgroundGradientFrom: colors.blue950,
    backgroundGradientTo: colors.blue950,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(100, 200, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
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

  const progressChartConfig = {
    backgroundColor: colors.blue950,
    backgroundGradientFrom: colors.blue950,
    backgroundGradientTo: colors.blue950,
    color: (opacity = 1) => `rgba(100, 200, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const ratioChartData = {
    labels: topGroupsByRatio.map((group) => group.groupName.substring(0, 10)),
    datasets: [
      {
        data: topGroupsByRatio.map(
          (group) => group.subscriptionRatio
        ) as number[],
      },
    ],
  };

  const conversionChartData = {
    labels: topGroupsByConversion.map((group) =>
      group.groupName.substring(0, 10)
    ),
    datasets: [
      {
        data: topGroupsByConversion.map(
          (group) => group.conversionRate
        ) as number[],
      },
    ],
  };

  const overallDistributionData = {
    data: [
      subscriptionRatio / 100,
      (conversionRate - subscriptionRatio) / 100,
      (100 - conversionRate) / 100,
    ],
  };

  const subscriptionStatusData = [
    {
      name: i18n._("Active"),
      population: activeSubscriptions,
      color: "#4ECDC4",
      legendFontColor: colors.white,
      legendFontSize: 12,
    },
    {
      name: i18n._("Expired"),
      population: expiredSubscriptions,
      color: "#FF6B9D",
      legendFontColor: colors.white,
      legendFontSize: 12,
    },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {i18n._("Subscription Ratio Analytics")}
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
        {i18n._("Subscription Ratio Analytics")}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.eminence }]}>
            <Ionicons name="people" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalMembers}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Members")}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.infoBlue }]}>
            <Ionicons name="card" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalSubscriptions}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Subscriptions")}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIcon, { backgroundColor: colors.successGreen }]}
          >
            <Ionicons name="trending-up" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{subscriptionRatio.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>{i18n._("Active Ratio")}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIcon, { backgroundColor: colors.warningYellow }]}
          >
            <Ionicons name="analytics" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{conversionRate.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>{i18n._("Conversion Rate")}</Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Overall Subscription Distribution")}
        </Text>
        <View style={styles.chartContainer}>
          <ProgressChart
            data={overallDistributionData}
            width={width - 64}
            height={220}
            chartConfig={progressChartConfig}
            style={styles.chart}
          />
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colors.successGreen },
              ]}
            />
            <Text style={styles.legendText}>
              {i18n._("Active Subscriptions")} ({subscriptionRatio.toFixed(1)}%)
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colors.warningYellow },
              ]}
            />
            <Text style={styles.legendText}>
              {i18n._("Expired Subscriptions")} (
              {(conversionRate - subscriptionRatio).toFixed(1)}%)
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: colors.gray400 }]}
            />
            <Text style={styles.legendText}>
              {i18n._("No Subscriptions")} ({(100 - conversionRate).toFixed(1)}
              %)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>{i18n._("Subscription Status")}</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={subscriptionStatusData}
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

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Top Groups by Subscription Ratio")}
        </Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={ratioChartData}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            yAxisLabel=""
            yAxisSuffix="%"
          />
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Top Groups by Conversion Rate")}
        </Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={conversionChartData}
            width={width - 64}
            height={240}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            yAxisLabel=""
            yAxisSuffix="%"
          />
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Groups Subscription Ratios")}
        </Text>
        <View style={styles.detailsContainer}>
          {groupsWithRatios.length > 0 ? (
            groupsWithRatios.slice(0, 10).map((group, index) => (
              <View key={index} style={styles.detailItem}>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>{group.groupName}</Text>
                  <Text style={styles.detailSubtitle}>
                    {group.activeSubscriptionCount}/{group.memberCount}{" "}
                    {i18n._("members")}
                  </Text>
                </View>
                <View style={styles.detailStats}>
                  <Text style={styles.detailPercentage}>
                    {group.subscriptionRatio.toFixed(1)}%
                  </Text>
                  <Text style={styles.detailConversion}>
                    {i18n._("Conv")}: {group.conversionRate.toFixed(1)}%
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="analytics-outline"
                size={48}
                color={colors.gray400}
              />
              <Text style={styles.emptyStateText}>
                {i18n._("No groups with members found")}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {i18n._("Groups will appear here once they have members")}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SubscriptionRatioAnalytics;
