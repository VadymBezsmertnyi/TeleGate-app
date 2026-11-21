import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useMembersProvider } from "../../../../../providers/MembersProvider/MembersProvider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";

// styles
import { styles } from "./MembersAnalytics.styles";
import colors from "../../../../../styles/colors";

const { width } = Dimensions.get("window");

const MembersAnalytics: FC = () => {
  const { i18n } = useLocalesProvider();
  const { listOwner } = useMembersProvider();
  const { listOwner: listGroups } = useGroupsProvider();
  const [membersData, setMembersData] = useState<any[]>([]);
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersResponse, groupsResponse] = await Promise.all([
        listOwner({
          limit: 100,
          page: 1,
          sortBy: "createdAt",
          order: "asc",
        }),
        listGroups({
          limit: 100,
          page: 1,
          sortBy: "createdAt",
          order: "asc",
        }),
      ]);
      setMembersData(membersResponse.data);
      setGroupsData(groupsResponse.data);
    } catch (error) {
      console.warn("Failed to load members data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalMembers = membersData.length;
  const membersWithUsernames = membersData.filter(
    (member) => member.username
  ).length;
  const membersWithoutUsernames = totalMembers - membersWithUsernames;

  const membersByGroup = groupsData
    .map((group) => {
      const groupMembers = membersData.filter((member) =>
        member.groups?.some((g: any) => g._id === group.id)
      );
      return {
        groupName: group.name || "Unknown Group",
        memberCount: groupMembers.length,
        membersWithUsernames: groupMembers.filter((member) => member.username)
          .length,
      };
    })
    .filter((group) => group.memberCount > 0);

  const topGroupsByMembers = membersByGroup
    .sort((a, b) => b.memberCount - a.memberCount)
    .slice(0, 5);

  const membersByCountry = membersData.reduce((acc, member) => {
    const country = member.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCountries = Object.entries(membersByCountry)
    .sort(([, a], [, b]) => (b as number) - (a as number))
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

  const groupsChartData = {
    labels: topGroupsByMembers.map((group) => group.groupName.substring(0, 10)),
    datasets: [
      {
        data: topGroupsByMembers.map((group) => group.memberCount) as number[],
      },
    ],
  };

  const countriesChartData = {
    labels: topCountries.map(([country]) => country.substring(0, 8)),
    datasets: [
      {
        data: topCountries.map(([, count]) => count) as number[],
      },
    ],
  };

  const usernameDistributionData = [
    {
      name: i18n._("With Username"),
      population: membersWithUsernames,
      color: "#4ECDC4",
      legendFontColor: colors.white,
      legendFontSize: 12,
    },
    {
      name: i18n._("Without Username"),
      population: membersWithoutUsernames,
      color: "#FF6B9D",
      legendFontColor: colors.white,
      legendFontSize: 12,
    },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{i18n._("Members Analytics")}</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{i18n._("Loading...")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{i18n._("Members Analytics")}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.eminence }]}>
            <Ionicons name="people" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{totalMembers}</Text>
          <Text style={styles.statLabel}>{i18n._("Total Members")}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIcon, { backgroundColor: colors.successGreen }]}
          >
            <Ionicons name="at" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{membersWithUsernames}</Text>
          <Text style={styles.statLabel}>{i18n._("With Username")}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIcon, { backgroundColor: colors.warningYellow }]}
          >
            <Ionicons name="person-outline" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>{membersWithoutUsernames}</Text>
          <Text style={styles.statLabel}>{i18n._("Without Username")}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.infoBlue }]}>
            <Ionicons name="globe" size={24} color={colors.white} />
          </View>
          <Text style={styles.statValue}>
            {Object.keys(membersByCountry).length}
          </Text>
          <Text style={styles.statLabel}>{i18n._("Countries")}</Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>{i18n._("Username Distribution")}</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={usernameDistributionData}
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
          {i18n._("Top Countries by Members")}
        </Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={countriesChartData}
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
        <Text style={styles.chartTitle}>{i18n._("Groups with Members")}</Text>
        <View style={styles.detailsContainer}>
          {membersByGroup.length > 0 ? (
            membersByGroup.slice(0, 10).map((group, index) => (
              <View key={index} style={styles.detailItem}>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailTitle}>{group.groupName}</Text>
                  <Text style={styles.detailSubtitle}>
                    {group.membersWithUsernames} {i18n._("with username")} /{" "}
                    {group.memberCount} {i18n._("total")}
                  </Text>
                </View>
                <View style={styles.detailStats}>
                  <Text style={styles.detailPercentage}>
                    {group.memberCount > 0
                      ? Math.round(
                          (group.membersWithUsernames / group.memberCount) * 100
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

export default MembersAnalytics;
