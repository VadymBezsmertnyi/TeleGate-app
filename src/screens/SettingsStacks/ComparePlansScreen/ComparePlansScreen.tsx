import React, { FC } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PurchasesPackage } from "react-native-purchases";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { usePurchasesProvider } from "../../../providers/PurchasesProvider/PurchasesProvider";
import { useAuthProvider } from "../../../providers/AuthProvider/AuthProvider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import TermsAndPrivacyFooter from "../../../components/TermsAndPrivacyFooter/TermsAndPrivacyFooter";
import DevelopmentBanner from "../../../components/DevelopmentBanner/DevelopmentBanner";

// styles
import { styles } from "./ComparePlansScreen.styles";
import colors from "../../../styles/colors";

const ComparePlansScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { availablePackages, activeSubscription, buyPackageWithDiscount } =
    usePurchasesProvider();
  const { user } = useAuthProvider();

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

  const features = [
    {
      name: i18n._("Manage groups"),
      free: "1",
      pro: "5",
      ultimate: i18n._("Unlimited"),
    },
    {
      name: i18n._("Members per group"),
      free: "20",
      pro: "100",
      ultimate: i18n._("Unlimited"),
    },
    {
      name: i18n._("Filters"),
      free: false,
      pro: true,
      ultimate: i18n._("Smart filters"),
    },
    {
      name: i18n._("Analytics"),
      free: false,
      pro: i18n._("Basic"),
      ultimate: i18n._("Full"),
    },
    {
      name: i18n._("Bot templates"),
      free: false,
      pro: i18n._("Basic"),
      ultimate: i18n._("Advanced"),
    },
    {
      name: i18n._("Automation"),
      free: false,
      pro: false,
      ultimate: i18n._("Coming soon"),
    },
  ];

  const proPackage = availablePackages.find((pkg) =>
    pkg.product.identifier.includes("pro")
  );
  const ultimatePackage = availablePackages.find((pkg) =>
    pkg.product.identifier.includes("ultimate")
  );

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "string") {
      return <Text style={styles.featureValue}>{value}</Text>;
    }
    return value ? (
      <Ionicons name="checkmark" size={20} color={colors.green500} />
    ) : (
      <Ionicons name="close" size={20} color={colors.red500} />
    );
  };

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("Compare Plans")} showBackButton />
      <DevelopmentBanner />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentScrollView}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tableScrollView}
        >
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <View style={styles.featureColumn}>
                <Text style={styles.columnTitle}>{i18n._("Feature")}</Text>
              </View>
              <View style={styles.planColumn}>
                <Text
                  style={[
                    styles.columnTitle,
                    currentSubscriptionType === "free" &&
                      styles.activeColumnTitle,
                  ]}
                >
                  {i18n._("Free")}
                </Text>
              </View>
              <View style={styles.planColumn}>
                <Text
                  style={[
                    styles.columnTitle,
                    currentSubscriptionType === "pro" &&
                      styles.activeColumnTitle,
                  ]}
                >
                  {i18n._("Pro")}
                </Text>
              </View>
              <View style={styles.planColumn}>
                <Text
                  style={[
                    styles.columnTitle,
                    currentSubscriptionType === "ultimate" &&
                      styles.activeColumnTitle,
                  ]}
                >
                  {i18n._("Ultimate")}
                </Text>
              </View>
            </View>

            {features.map((feature, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index === features.length - 1 && styles.lastTableRow,
                ]}
              >
                <View style={styles.featureColumn}>
                  <Text style={styles.featureName}>{feature.name}</Text>
                </View>
                <View style={styles.planColumn}>
                  {renderFeatureValue(feature.free)}
                </View>
                <View style={styles.planColumn}>
                  {renderFeatureValue(feature.pro)}
                </View>
                <View style={styles.planColumn}>
                  {renderFeatureValue(feature.ultimate)}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.upgradeButtons}>
          {proPackage && (
            <TouchableOpacity
              style={[
                styles.upgradeButton,
                (currentSubscriptionType === "pro" ||
                  currentSubscriptionType === "ultimate") &&
                  styles.disabledButton,
              ]}
              onPress={() => handleUpgrade(proPackage)}
              disabled={
                currentSubscriptionType === "pro" ||
                currentSubscriptionType === "ultimate"
              }
            >
              <Text
                style={[
                  styles.upgradeButtonText,
                  (currentSubscriptionType === "pro" ||
                    currentSubscriptionType === "ultimate") &&
                    styles.disabledButtonText,
                ]}
              >
                {currentSubscriptionType === "pro" ||
                currentSubscriptionType === "ultimate"
                  ? i18n._("Current Plan")
                  : i18n._("Upgrade to Pro")}
              </Text>
            </TouchableOpacity>
          )}
          {ultimatePackage && (
            <TouchableOpacity
              style={[
                styles.upgradeButton,
                currentSubscriptionType === "ultimate" && styles.disabledButton,
              ]}
              onPress={() => handleUpgrade(ultimatePackage)}
              disabled={currentSubscriptionType === "ultimate"}
            >
              <Text
                style={[
                  styles.upgradeButtonText,
                  currentSubscriptionType === "ultimate" &&
                    styles.disabledButtonText,
                ]}
              >
                {currentSubscriptionType === "ultimate"
                  ? i18n._("Current Plan")
                  : i18n._("Upgrade to Ultimate")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom }]}>
        <TermsAndPrivacyFooter />
      </View>
    </GradientBackground>
  );
};

export default ComparePlansScreen;
