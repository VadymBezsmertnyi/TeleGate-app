import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import {
  Foundation,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { GroupT } from "../../../providers/GroupsProvider/GroupsProvider.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useGroupsProvider } from "../../../providers/GroupsProvider/GroupsProvider";

// hooks
import { useGroupsStacksNavigation } from "../../../navigators/GroupsStacks/GroupsStacks.helps";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import GroupCard from "./components/GroupCard/GroupCard";
import SearchWithFilters from "../../../components/SearchWithFilters/SearchWithFilters";
import GroupsFilters, {
  GroupsFiltersState,
} from "./components/GroupsFilters/GroupsFilters";
import BotSetupButton from "../../../components/BotSetupButton/BotSetupButton";

// constants
import { PATHS_GROUPS_STACKS } from "../../../navigators/paths";

// styles
import { styles } from "./GroupsMainScreen.styles";
import colors from "../../../styles/colors";

type FilterType = "connected" | "disconnected" | "all";

const GroupsMainScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { list } = useGroupsProvider();
  const navigation = useGroupsStacksNavigation();
  const [groups, setGroups] = useState<GroupT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<GroupsFiltersState>(
    {}
  );

  const fetchGroups = async (page: number = 1, isRefresh: boolean = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setIsLoading(true);

      const params = {
        page,
        limit: 20,
        search: searchQuery || undefined,
        status:
          activeFilter === "connected"
            ? ("member" as const)
            : activeFilter === "disconnected"
            ? ("left" as const)
            : undefined,
        sortBy: "createdAt" as const,
        order: "desc" as const,
        // Advanced filters
        membersFrom: advancedFilters.membersFrom,
        membersTo: advancedFilters.membersTo,
        createdFrom: advancedFilters.createdFrom,
        createdTo: advancedFilters.createdTo,
        activity: advancedFilters.activity,
      };
      const response = await list(params);
      if (isRefresh || page === 1) setGroups(response.data);
      else setGroups((prev) => [...prev, ...response.data]);

      setHasMore(response.meta.page < response.meta.pages);
      setCurrentPage(page);
    } catch (error: any) {
      if (error.name !== "AbortError")
        console.warn("Error fetching groups:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    await fetchGroups(currentPage + 1);
  };

  const handleRefresh = async () => {
    await fetchGroups(1, true);
  };

  const handleGroupPress = (groupId: string) =>
    navigation.navigate(PATHS_GROUPS_STACKS.groupDetails, {
      groupId,
    });

  const getAppliedFiltersCount = () => {
    let count = 0;
    if (advancedFilters.botStatus) count++;
    if (advancedFilters.membersFrom || advancedFilters.membersTo) count++;
    if (advancedFilters.activity) count++;
    if (advancedFilters.createdFrom || advancedFilters.createdTo) count++;
    return count;
  };

  const renderGroupCard: ListRenderItem<GroupT> = ({ item }) => (
    <GroupCard group={item} onPress={handleGroupPress} />
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  const renderEmptyState = () => {
    if (isLoading || refreshing) return null;

    const hasSearchQuery = searchQuery.trim().length > 0;
    const hasActiveFilters = activeFilter !== "all";

    let title, subtitle, icon;

    if (hasSearchQuery || hasActiveFilters) {
      title = i18n._("No groups match your search");
      subtitle = i18n._("Try adjusting your search or filters");
      icon = "magnify-close";
    } else {
      title = i18n._("No groups found");
      subtitle = i18n._("You haven't added any groups yet");
      icon = "account-group-outline";
    }

    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name={icon as any}
          size={64}
          color={colors.gray300}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptySubtitle}>{subtitle}</Text>
        {!hasSearchQuery && !hasActiveFilters && (
          <TouchableOpacity
            style={styles.botSetupButton}
            onPress={() =>
              navigation.navigate(PATHS_GROUPS_STACKS.groupsBotSetup)
            }
          >
            <BotSetupButton size={20} color={colors.white} />
            <Text style={styles.botSetupButtonText}>{i18n._("Bot Setup")}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  useEffect(() => {
    fetchGroups(1, true);
  }, []);

  useEffect(() => {
    fetchGroups(1, true);
  }, [searchQuery, activeFilter, advancedFilters]);

  return (
    <GradientBackground>
      <CustomHeader
        title={i18n._("Groups")}
        leftIcon={<BotSetupButton size={24} color={colors.white} />}
        onLeftPress={() =>
          navigation.navigate(PATHS_GROUPS_STACKS.groupsBotSetup)
        }
        rightIcon={
          <View style={{ position: "relative" }}>
            <Foundation name="filter" size={24} color={colors.gray300} />
            {getAppliedFiltersCount() > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  backgroundColor: colors.gray300,
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "600",
                    color: colors.black,
                  }}
                >
                  {getAppliedFiltersCount()}
                </Text>
              </View>
            )}
          </View>
        }
        onRightPress={() => setShowFilters(true)}
      />
      <View
        style={[
          styles.content,
          {
            paddingBottom: bottom,
          },
        ]}
      >
        <SearchWithFilters
          testID="GroupsSearchWithFilters"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder={i18n._("Search groups...")}
          filters={[
            { value: "all", label: i18n._("All") },
            { value: "connected", label: i18n._("Connected") },
            { value: "disconnected", label: i18n._("Disconnected") },
          ]}
          activeFilter={activeFilter}
          onFilterChange={(value) => setActiveFilter(value as FilterType)}
        />

        <FlatList
          testID="GroupsMainScreen"
          style={styles.groupsList}
          contentContainerStyle={[
            styles.groupsListContainer,
            groups.length === 0 && !isLoading && !refreshing && { flex: 1 },
          ]}
          data={groups}
          renderItem={renderGroupCard}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={groups.length === 0 ? undefined : loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
        />
      </View>

      {showFilters && (
        <GroupsFilters
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          filters={advancedFilters}
          onApplyFilters={setAdvancedFilters}
          onResetFilters={() => setAdvancedFilters({})}
        />
      )}
    </GradientBackground>
  );
};

export default GroupsMainScreen;
