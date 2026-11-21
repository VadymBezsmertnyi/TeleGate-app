import React, { FC } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import GroupsAnalytics from "./components/GroupsAnalytics/GroupsAnalytics";
import GroupSubscriptionsAnalytics from "./components/GroupSubscriptionsAnalytics/GroupSubscriptionsAnalytics";
import MembersAnalytics from "./components/MembersAnalytics/MembersAnalytics";
import MembersWithSubscriptionsAnalytics from "./components/MembersWithSubscriptionsAnalytics/MembersWithSubscriptionsAnalytics";
import SubscriptionRatioAnalytics from "./components/SubscriptionRatioAnalytics/SubscriptionRatioAnalytics";

// styles
import styles from "./AnalyticsMainScreen.styles";

const AnalyticsMainScreen: FC = () => {
  const { i18n } = useLocalesProvider();
  const { bottom } = useSafeAreaInsets();

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("Analytics Dashboard")} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom + 60,
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
      >
        <GroupsAnalytics />
        <GroupSubscriptionsAnalytics />
        <MembersAnalytics />
        <MembersWithSubscriptionsAnalytics />
        <SubscriptionRatioAnalytics />
      </ScrollView>
    </GradientBackground>
  );
};

export default AnalyticsMainScreen;
