import React, { FC } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PurchasesPackage } from "react-native-purchases";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { usePurchasesProvider } from "../../../providers/PurchasesProvider/PurchasesProvider";
import { useAuthProvider } from "../../../providers/AuthProvider/AuthProvider";

// navigation
import { useSettingsStacksNavigation } from "../../../navigators/SettingsStacks/SettingsStacks.helps";
import { PATHS_SETTINGS_STACKS } from "../../../navigators/paths";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import TermsAndPrivacyFooter from "../../../components/TermsAndPrivacyFooter/TermsAndPrivacyFooter";
import DevelopmentBanner from "../../../components/DevelopmentBanner/DevelopmentBanner";

// styles
import { styles } from "./SubscriptionsScreen.styles";
import colors from "../../../styles/colors";

const SubscriptionsScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const navigation = useSettingsStacksNavigation();
  const { availablePackages, activeSubscription, buyPackageWithDiscount } =
    usePurchasesProvider();
  const { user } = useAuthProvider();

  const handleComparePlans = () => {
    navigation.navigate(PATHS_SETTINGS_STACKS.comparePlans);
  };

  const handleUpgrade = async (packageBuy: PurchasesPackage) => {
    try {
      await buyPackageWithDiscount(packageBuy);
    } catch (error) {
      console.warn("Error upgrading subscription", error);
    }
  };

  const getCurrentSubscriptionType = () => {
    if (activeSubscription) {
      if (activeSubscription.product.identifier.includes("ultimate"))
        return "ultimate";
      if (activeSubscription.product.identifier.includes("pro")) return "pro";
    }
    return user?.subscription_type || "free";
  };

  const currentSubscriptionType = getCurrentSubscriptionType();

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("My Subscriptions")} showBackButton />
      <DevelopmentBanner />
      <TouchableOpacity
        style={styles.compareButton}
        onPress={handleComparePlans}
      >
        <Ionicons name="list" size={20} color={colors.white} />
        <Text style={styles.compareButtonText}>{i18n._("Compare Plans")}</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subscriptionCards}>
          <View
            style={
              currentSubscriptionType === "free"
                ? styles.activeSubscriptionCard
                : styles.subscriptionCard
            }
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons name="help-circle" size={24} color={colors.white} />
              </View>
              <View style={styles.cardTitleSection}>
                <Text style={styles.cardTitle}>{i18n._("Free")}</Text>
                {currentSubscriptionType === "free" && (
                  <View style={styles.currentPlanBadge}>
                    <Text style={styles.currentPlanText}>
                      {i18n._("Current Plan")}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardPrice}>{i18n._("Free")}</Text>
            </View>
            <Text style={styles.cardDescription}>
              {i18n._("Basic features, limited access")}
            </Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark" size={16} color={colors.white} />
                <Text style={styles.featureText}>
                  {i18n._("Manage 1 group")}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark" size={16} color={colors.white} />
                <Text style={styles.featureText}>
                  {i18n._("Up to 20 members per group")}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="close" size={16} color={colors.red500} />
                <Text style={styles.featureText}>{i18n._("No filters")}</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="close" size={16} color={colors.red500} />
                <Text style={styles.featureText}>{i18n._("No analytics")}</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="close" size={16} color={colors.red500} />
                <Text style={styles.featureText}>
                  {i18n._("No bot templates")}
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="close" size={16} color={colors.red500} />
                <Text style={styles.featureText}>
                  {i18n._("No automation")}
                </Text>
              </View>
            </View>
            {currentSubscriptionType !== "free" && (
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() =>
                  handleUpgrade(
                    availablePackages.find((pkg) =>
                      pkg.product.identifier.includes("pro")
                    ) || availablePackages[0]
                  )
                }
              >
                <Text style={styles.upgradeButtonText}>
                  {i18n._("Upgrade to Pro")}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {availablePackages.map((packageBuy, index) => {
            const isPro = packageBuy.product.identifier.includes("pro");
            const isUltimate =
              packageBuy.product.identifier.includes("ultimate");
            const isCurrentPlan =
              (isPro && currentSubscriptionType === "pro") ||
              (isUltimate && currentSubscriptionType === "ultimate");

            return (
              <View
                key={packageBuy.identifier}
                style={
                  isCurrentPlan
                    ? styles.activeSubscriptionCard
                    : styles.subscriptionCard
                }
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <Ionicons
                      name={isPro ? "flash" : "rocket"}
                      size={24}
                      color={colors.white}
                    />
                  </View>
                  <View style={styles.cardTitleSection}>
                    <Text style={styles.cardTitle}>
                      {packageBuy.product.title}
                    </Text>
                    {isCurrentPlan ? (
                      <View style={styles.currentPlanBadge}>
                        <Text style={styles.currentPlanText}>
                          {i18n._("Current Plan")}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.upgradeBadge}>
                        <Text style={styles.upgradeBadgeText}>
                          {i18n._("Upgrade")}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardPrice}>
                    {packageBuy.product.priceString}
                  </Text>
                </View>
                <Text style={styles.cardDescription}>
                  {packageBuy.product.description}
                </Text>
                <View style={styles.featuresList}>
                  <View style={styles.featureItem}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                    <Text style={styles.featureText}>
                      {isPro
                        ? i18n._("Manage up to 5 groups")
                        : i18n._("Unlimited groups")}
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                    <Text style={styles.featureText}>
                      {isPro
                        ? i18n._("Up to 100 members per group")
                        : i18n._("Unlimited members")}
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                    <Text style={styles.featureText}>
                      {isPro
                        ? i18n._("Available filters")
                        : i18n._("Smart filters")}
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                    <Text style={styles.featureText}>
                      {isPro
                        ? i18n._("Basic analytics")
                        : i18n._("Full analytics")}
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                    <Text style={styles.featureText}>
                      {isPro
                        ? i18n._("Basic bot templates")
                        : i18n._("Advanced bot scenarios")}
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons
                      name={isPro ? "close" : "time"}
                      size={16}
                      color={isPro ? colors.red500 : colors.yellow500}
                    />
                    <Text style={styles.featureText}>
                      {isPro
                        ? i18n._("No automation")
                        : i18n._("Automation (coming soon)")}
                    </Text>
                  </View>
                </View>
                {!isCurrentPlan && (
                  <TouchableOpacity
                    style={styles.upgradeButton}
                    onPress={() => handleUpgrade(packageBuy)}
                  >
                    <Text style={styles.upgradeButtonText}>
                      {i18n._("Upgrade to")} {packageBuy.product.title}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom }]}>
        <TermsAndPrivacyFooter />
      </View>
    </GradientBackground>
  );
};

export default SubscriptionsScreen;
