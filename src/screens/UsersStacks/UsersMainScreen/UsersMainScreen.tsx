import React, { FC, useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Foundation,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMembersProvider } from "../../../providers/MembersProvider/MembersProvider";

// navigation
import { useUsersStacksNavigation } from "../../../navigators/UsersStacks/UsersStacks.helps";
import { PATHS_USERS_STACKS } from "../../../navigators/paths";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import MemberCard from "./components/MemberCard";
import SearchWithFilters from "../../../components/SearchWithFilters/SearchWithFilters";
import MembersFilters, {
  MembersFiltersState,
} from "./components/MembersFilters/MembersFilters";
import BotSetupButton from "../../../components/BotSetupButton/BotSetupButton";

// types
import { FilterTypeT } from "./UsersMainScreen.types";
import { MemberT } from "../../../providers/MembersProvider/MembersProvider.types";

// styles
import { styles } from "./UsersMainScreen.styles";
import colors from "../../../styles/colors";

// helpers
import ToastHelper from "../../../helps/toast.help";

const UsersMainScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { listOwner } = useMembersProvider();
  const navigation = useUsersStacksNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTypeT>("all");
  const [members, setMembers] = useState<MemberT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<MembersFiltersState>(
    {}
  );

  const filteredMembers = useMemo(() => {
    return members.filter((member) => !member.isBot);
  }, [members]);

  const loadMoreMembers = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const params = {
        page,
        limit: 20,
        search: searchQuery || undefined,
        sortBy: "createdAt" as const,
        order: "asc" as const,
        // Quick filter
        status: activeFilter !== "all" ? activeFilter : undefined,
        // Advanced filters
        ...(advancedFilters.status && { status: advancedFilters.status }),
        ...(advancedFilters.createdFrom && {
          createdFrom: advancedFilters.createdFrom,
        }),
        ...(advancedFilters.createdTo && {
          createdTo: advancedFilters.createdTo,
        }),
      };
      const response = await listOwner(params);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setMembers((prev) => [...prev, ...response.data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.warn("Failed to load more members");
      ToastHelper.error({
        title: "Error",
        text: "Failed to load more members",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const params = {
        page: 1,
        limit: 20,
        search: searchQuery || undefined,
        sortBy: "createdAt" as const,
        order: "asc" as const,
        // Quick filter
        status: activeFilter !== "all" ? activeFilter : undefined,
        // Advanced filters
        ...(advancedFilters.status && { status: advancedFilters.status }),
        ...(advancedFilters.createdFrom && {
          createdFrom: advancedFilters.createdFrom,
        }),
        ...(advancedFilters.createdTo && {
          createdTo: advancedFilters.createdTo,
        }),
      };
      const response = await listOwner(params);

      setMembers(response.data);
      setPage(1);
      setHasMore(response.meta.pages > 1);
    } catch (error) {
      console.warn("Failed to refresh members");
      ToastHelper.error({
        title: "Error",
        text: "Failed to refresh members",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleMemberPress = (memberId: string) => {
    navigation.navigate("UserDetails", { userId: memberId });
  };

  const renderMemberCard = ({ item }: { item: MemberT }) => (
    <MemberCard member={item} onPress={handleMemberPress} />
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  const getAppliedFiltersCount = () => {
    let count = 0;
    if (advancedFilters.status) count++;
    if (advancedFilters.isBot !== undefined) count++;
    if (advancedFilters.createdFrom || advancedFilters.createdTo) count++;
    if (advancedFilters.languageCode) count++;
    if (advancedFilters.canJoinGroups !== undefined) count++;
    if (advancedFilters.canReadAllGroupMessages !== undefined) count++;
    if (advancedFilters.supportsInlineQueries !== undefined) count++;
    return count;
  };

  const renderEmpty = () => {
    if (isLoading || refreshing) return null;

    const hasSearchQuery = searchQuery.trim().length > 0;
    const hasActiveFilters =
      activeFilter !== "all" || getAppliedFiltersCount() > 0;

    let title, subtitle, icon;

    if (hasSearchQuery || hasActiveFilters) {
      title = i18n._("No members match your search");
      subtitle = i18n._("Try adjusting your search or filters");
      icon = "magnify-close";
    } else {
      title = i18n._("No members found");
      subtitle = i18n._("You haven't added any members yet");
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
          <>
            <Text style={styles.infoText}>
              {i18n._("Users are added automatically to the group")}
            </Text>
            <TouchableOpacity
              style={styles.botSetupButton}
              onPress={() =>
                navigation.navigate(PATHS_USERS_STACKS.usersBotSetup)
              }
            >
              <BotSetupButton size={20} color={colors.white} />
              <Text style={styles.botSetupButtonText}>
                {i18n._("Bot Setup")}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: 1,
        limit: 20,
        sortBy: "createdAt" as const,
        order: "asc" as const,
        // Quick filter
        status: activeFilter !== "all" ? activeFilter : undefined,
        // Advanced filters
        ...(advancedFilters.status && { status: advancedFilters.status }),
        ...(advancedFilters.createdFrom && {
          createdFrom: advancedFilters.createdFrom,
        }),
        ...(advancedFilters.createdTo && {
          createdTo: advancedFilters.createdTo,
        }),
      };
      const response = await listOwner(params);
      setMembers(response.data);
      setHasMore(response.meta.pages > 1);
    } catch (error) {
      console.warn("Failed to load initial members");
      ToastHelper.error({
        title: "Error",
        text: "Failed to load members",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [listOwner, activeFilter, advancedFilters]);

  useEffect(() => {
    handleRefresh();
  }, [searchQuery, activeFilter, advancedFilters]);

  return (
    <GradientBackground>
      <CustomHeader
        title={i18n._("Users")}
        leftIcon={<BotSetupButton size={24} color={colors.white} />}
        onLeftPress={() =>
          navigation.navigate(PATHS_USERS_STACKS.usersBotSetup)
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
          testID="UsersSearchWithFilters"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder={i18n._("Search users...")}
          filters={[
            { value: "all", label: i18n._("All") },
            { value: "member", label: i18n._("Members") },
            { value: "administrator", label: i18n._("Administrators") },
            { value: "creator", label: i18n._("Creators") },
          ]}
          activeFilter={activeFilter}
          onFilterChange={(value) => setActiveFilter(value as FilterTypeT)}
        />

        <FlatList
          testID="UsersMainScreen"
          style={styles.usersList}
          contentContainerStyle={[
            styles.usersListContainer,
            filteredMembers.length === 0 &&
              !isLoading &&
              !refreshing && { flex: 1 },
          ]}
          data={filteredMembers}
          renderItem={renderMemberCard}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={loadMoreMembers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </View>

      {showFilters && (
        <MembersFilters
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

export default UsersMainScreen;
