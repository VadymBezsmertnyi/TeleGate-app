import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, LineChart } from "react-native-chart-kit";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useGroupSubscriptionsProvider } from "../../../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";

// styles
import { styles } from "./GroupSubscriptionsAnalytics.styles";
import colors from "../../../../../styles/colors";

const { width } = Dimensions.get("window");

const GroupSubscriptionsAnalytics: FC = () => {
  const { i18n } = useLocalesProvider();
  const { list } = useGroupSubscriptionsProvider();
  const { listOwner } = useGroupsProvider();
  const [subscriptionsData, setSubscriptionsData] = useState<any[]>([]);
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subscriptionsResponse, groupsResponse] = await Promise.all([
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
      setSubscriptionsData(subscriptionsResponse.data);
      setGroupsData(groupsResponse.data);
    } catch (error) {
      console.warn("Failed to load subscriptions data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalSubscriptions = subscriptionsData.length;
  const activeSubscriptions = subscriptionsData.filter(
    (sub) => sub.isActive
  ).length;
  const expiredSubscriptions = subscriptionsData.filter(
    (sub) => !sub.isActive
  ).length;

  const subscriptionsByGroup = groupsData
    .map((group) => {
      const groupSubscriptions = subscriptionsData.filter(
        (sub) => sub.groupId === group.id
      );
      return {
        groupName: group.name || "Unknown Group",
        totalSubscriptions: groupSubscriptions.length,
        activeSubscriptions: groupSubscriptions.filter((sub) => sub.isActive)
          .length,
        expiredSubscriptions: groupSubscriptions.filter((sub) => !sub.isActive)
          .length,
      };
    })
    .filter((group) => group.totalSubscriptions > 0);

  const topGroupsBySubscriptions = subscriptionsByGroup
    .sort((a, b) => b.totalSubscriptions - a.totalSubscriptions)
    .slice(0, 5);

  const subscriptionTypes = subscriptionsData.reduce((acc, sub) => {
    const type = sub.giftType || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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

  const groupsChartData = {
    labels: topGroupsBySubscriptions.map((group) =>
      group.groupName.substring(0, 10)
    ),
    datasets: [
      {
        data: topGroupsBySubscriptions.map(
          (group) => group.totalSubscriptions
        ) as number[],
      },
    ],
  };

  const activeVsExpiredData = {
    labels: ["Active", "Expired"],
    datasets: [
      {
        data: [activeSubscriptions, expiredSubscriptions] as number[],
        color: (opacity = 1) => `rgba(62, 58, 109, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const subscriptionTypesData = {
    labels: Object.keys(subscriptionTypes).map((type) => type.substring(0, 8)),
    datasets: [
      {
        data: Object.values(subscriptionTypes) as number[],
      },
    ],
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {i18n._("Group Subscriptions Analytics")}
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
        {i18n._("Group Subscriptions Analytics")}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.eminence }]}>
            <Ionicons name="card" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalSubscriptions}</Text>
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

        <View style={styles.statCard}>
          <View
            style={[styles.statIcon, { backgroundColor: colors.warningYellow }]}
          >
            <Ionicons name="trending-up" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>
            {totalSubscriptions > 0
              ? Math.round((activeSubscriptions / totalSubscriptions) * 100)
              : 0}
            %
          </Text>
          <Text style={styles.statLabel}>{i18n._("Active Rate")}</Text>
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
          {i18n._("Top Groups by Subscriptions")}
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
          <BarChart
            data={subscriptionTypesData}
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

      <View style={styles.detailsSection}>
        <Text style={styles.chartTitle}>
          {i18n._("Groups with Subscriptions")}
        </Text>
        <View style={styles.detailsContainer}>
          {subscriptionsByGroup.length > 0 ? (
            subscriptionsByGroup.slice(0, 10).map((group, index) => (
              <View key={index} style={styles.detailItem}>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>{group.groupName}</Text>
                  <Text style={styles.detailSubtitle}>
                    {group.activeSubscriptions} {i18n._("active")} /{" "}
                    {group.totalSubscriptions} {i18n._("total")}
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
              <Ionicons name="card-outline" size={48} color={colors.gray400} />
              <Text style={styles.emptyStateText}>
                {i18n._("No groups with subscriptions found")}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {i18n._("Groups will appear here once they have subscriptions")}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default GroupSubscriptionsAnalytics;
