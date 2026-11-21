import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../../../../styles/colors";

import { styles } from "./GroupUsersTabs.styles";

export type TabType =
  | "all"
  | "withSubscription"
  | "expired"
  | "withoutSubscription";

interface GroupUsersTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    all: number;
    withSubscription: number;
    expired: number;
    withoutSubscription: number;
  };
}

const GroupUsersTabs: FC<GroupUsersTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    {
      id: "all" as TabType,
      label: "Усі",
      icon: "people",
      count: counts.all,
    },
    {
      id: "withSubscription" as TabType,
      label: "З підпискою",
      icon: "checkmark-circle",
      count: counts.withSubscription,
    },
    {
      id: "expired" as TabType,
      label: "Просрочено",
      icon: "warning",
      count: counts.expired,
    },
    {
      id: "withoutSubscription" as TabType,
      label: "Без підписки",
      icon: "close-circle",
      count: counts.withoutSubscription,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name={tab.icon as any}
                size={16}
                color={activeTab === tab.id ? colors.white : colors.gray300}
                style={styles.tabIcon}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  activeTab === tab.id && styles.activeCountBadge,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    activeTab === tab.id && styles.activeCountText,
                  ]}
                >
                  {tab.count}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GroupUsersTabs;
