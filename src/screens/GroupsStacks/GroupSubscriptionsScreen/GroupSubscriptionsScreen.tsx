import React, { FC, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// types
import { GroupsStackParamListT } from "../../../navigators/GroupsStacks/GroupsStacks.types";
import { GroupSubscriptionT } from "../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useGroupSubscriptionsProvider } from "../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

// constants
import { PATHS_GROUPS_STACKS } from "../../../navigators/paths";

// styles
import { styles } from "./GroupSubscriptionsScreen.styles";
import colors from "../../../styles/colors";

export type GroupSubscriptionsScreenPropsT = {
  route: RouteProp<GroupsStackParamListT, "GroupSubscriptions">;
  navigation: NativeStackNavigationProp<
    GroupsStackParamListT,
    "GroupSubscriptions"
  >;
};

const GroupSubscriptionsScreen: FC<GroupSubscriptionsScreenPropsT> = ({
  route,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { groupId } = route.params;
  const { groupSubscriptions, listByGroup, deleteSubscription } =
    useGroupSubscriptionsProvider();
  const [loading, setLoading] = useState(true);

  const subscriptions = useMemo(
    () => groupSubscriptions[groupId] || [],
    [groupSubscriptions, groupId]
  );

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "daily":
        return i18n._("Daily");
      case "weekly":
        return i18n._("Weekly");
      case "monthly":
        return i18n._("Monthly");
      case "yearly":
        return i18n._("Yearly");
      default:
        return type;
    }
  };

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      await listByGroup(groupId);
    } catch (error) {
      console.warn("Failed to load subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubscription = () => {
    navigation.navigate(PATHS_GROUPS_STACKS.subscriptionForm, {
      groupId,
      mode: "create",
    });
  };

  const handleEditSubscription = (subscription: GroupSubscriptionT) => {
    navigation.navigate(PATHS_GROUPS_STACKS.subscriptionForm, {
      groupId,
      subscriptionId: subscription._id,
      mode: "edit",
    });
  };

  const handleDeleteSubscription = (subscription: GroupSubscriptionT) => {
    Alert.alert(
      i18n._("Delete Subscription"),
      i18n._(
        "Are you sure you want to delete this subscription? This action cannot be undone and will remove the subscription from all users."
      ),
      [
        {
          text: i18n._("Cancel"),
          style: "cancel",
        },
        {
          text: i18n._("Delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSubscription(subscription._id);
              await loadSubscriptions();
            } catch (error) {
              console.warn("Failed to delete subscription:", error);
            }
          },
        },
      ]
    );
  };

  const renderSubscriptionItem = (subscription: GroupSubscriptionT) => (
    <View key={subscription._id} style={styles.subscriptionItem}>
      <TouchableOpacity
        style={styles.subscriptionContent}
        onPress={() => handleEditSubscription(subscription)}
      >
        <View style={styles.subscriptionHeader}>
          <View style={styles.subscriptionTitleContainer}>
            <Text style={styles.subscriptionTitle}>{subscription.title}</Text>
            {subscription.description && (
              <Text style={styles.subscriptionDescription}>
                {subscription.description}
              </Text>
            )}
          </View>
          <View style={styles.subscriptionPriceContainer}>
            <Text style={styles.subscriptionPrice}>
              {subscription.price} {subscription.currency || "UAH"}
            </Text>
          </View>
        </View>

        <View style={styles.subscriptionFooter}>
          <View style={styles.subscriptionTypeContainer}>
            <Ionicons
              name={
                subscription.type === "yearly"
                  ? "calendar"
                  : subscription.type === "monthly"
                  ? "calendar-outline"
                  : "time"
              }
              size={14}
              color={colors.gray400}
            />
            <Text style={styles.subscriptionType}>
              {getTypeLabel(subscription.type || "monthly").toUpperCase()} •{" "}
              {subscription.duration || 1}{" "}
              {subscription.duration === 1 ? "DAY" : "DAYS"}
            </Text>
          </View>

          <View style={styles.subscriptionStats}>
            <Text style={styles.subscriptionStatsText}>
              {subscription.memberSubscriptionIds?.length || 0}{" "}
              {i18n._("subscribers")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteSubscription(subscription)}
      >
        <Ionicons name="trash-outline" size={18} color={colors.red} />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderTitle}>{i18n._("No subscriptions")}</Text>
      <Text style={styles.placeholderText}>
        {i18n._("Create the first subscription for this group")}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCreateSubscription}
      >
        <Text style={styles.addButtonText}>{i18n._("Add subscription")}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSubscriptionsList = () => (
    <ScrollView style={styles.content}>
      {subscriptions.map(renderSubscriptionItem)}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCreateSubscription}
      >
        <Text style={styles.addButtonText}>{i18n._("Add subscription")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  useEffect(() => {
    loadSubscriptions();
  }, [groupId]);

  if (loading)
    return (
      <GradientBackground>
        <CustomHeader title={i18n._("Group Subscriptions")} showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      </GradientBackground>
    );

  return (
    <GradientBackground>
      <CustomHeader
        title={i18n._("Group Subscriptions")}
        showBackButton
        rightIcon={<Ionicons name="add" size={24} color={colors.white} />}
        onRightPress={handleCreateSubscription}
      />
      <View
        testID="GroupSubscriptionsScreen"
        style={[styles.container, { paddingBottom: bottom }]}
      >
        {subscriptions.length === 0
          ? renderEmptyState()
          : renderSubscriptionsList()}
      </View>
    </GradientBackground>
  );
};

export default GroupSubscriptionsScreen;
