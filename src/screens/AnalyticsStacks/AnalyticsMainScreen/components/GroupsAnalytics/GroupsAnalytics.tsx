import React, { FC, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";

// styles
import { styles } from "./GroupsAnalytics.styles";
import colors from "../../../../../styles/colors";

const { width } = Dimensions.get("window");

const GroupsAnalytics: FC = () => {
  const { i18n } = useLocalesProvider();
  const { listOwner } = useGroupsProvider();
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroupsData();
  }, []);

  const loadGroupsData = async () => {
    try {
      setLoading(true);
      const response = await listOwner({
        limit: 100,
        page: 1,
        sortBy: "createdAt",
        order: "asc",
      });
      setGroupsData(response.data);
    } catch (error) {
      console.warn("Failed to load groups data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalGroups = groupsData.length;
  const totalMembers = groupsData.reduce(
    (sum, group) => sum + group.membersCount,
    0
  );
  const totalSubscriptions = groupsData.reduce(
    (sum, group) => sum + group.subscriptionsCount,
    0
  );
  const totalUsersWithSubscriptions = groupsData.reduce(
    (sum, group) => sum + group.usersWithSubscriptionCount,
    0
  );

  const groupsByType = groupsData.reduce((acc, group) => {
    acc[group.type] = (acc[group.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topGroupsByMembers = groupsData
    .sort((a, b) => b.membersCount - a.membersCount)
    .slice(0, 5);

  const topGroupsBySubscriptions = groupsData
    .sort((a, b) => b.subscriptionsCount - a.subscriptionsCount)
    .slice(0, 5);

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

  const pieChartConfig = {
    backgroundColor: colors.blue950,
    backgroundGradientFrom: colors.blue950,
    backgroundGradientTo: colors.blue950,
    color: (opacity = 1) => `rgba(100, 200, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const membersChartData = {
    labels: topGroupsByMembers.map(
      (group) => group.name?.substring(0, 10) || "Group"
    ),
    datasets: [
      {
        data: topGroupsByMembers.map((group) => group.membersCount) as number[],
      },
    ],
  };

  const subscriptionsChartData = {
    labels: topGroupsBySubscriptions.map(
      (group) => group.name?.substring(0, 10) || "Group"
    ),
    datasets: [
      {
        data: topGroupsBySubscriptions.map(
          (group) => group.subscriptionsCount
        ) as number[],
      },
    ],
  };

  const typeDistributionData = Object.entries(groupsByType).map(
    ([type, count], index) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      population: count,
      color: ["#64C8FF", "#FF6B9D", "#4ECDC4", "#FFE66D", "#A8E6CF", "#FFB3BA"][
        index % 6
      ],
      legendFontColor: colors.white,
      legendFontSize: 12,
    })
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{i18n._("Groups Analytics")}</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{i18n._("Loading...")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{i18n._("Groups Analytics")}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="people" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalGroups}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Groups")}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="person" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalMembers}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Members")}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="card" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalSubscriptions}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Subscriptions")}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="checkmark-circle" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalUsersWithSubscriptions}</Text>
          <Text style={styles.statLabel}>
            {i18n._("Users with Subscriptions")}
          </Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>{i18n._("Groups by Type")}</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={typeDistributionData}
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
        <Text style={styles.chartTitle}>{i18n._("Top Groups by Members")}</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={membersChartData}
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
          {i18n._("Top Groups by Subscriptions")}
        </Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={subscriptionsChartData}
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
    </View>
  );
};

export default GroupsAnalytics;
