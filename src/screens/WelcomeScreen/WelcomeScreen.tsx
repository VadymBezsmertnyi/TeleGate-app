import React, { FC, useEffect } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import {
  useAuthProvider,
  EAuthState,
} from "../../providers/AuthProvider/AuthProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";

// hooks
import { useRootNavigation } from "../../navigators/navigators.helps";

// components
import PointsLoader from "./components/PointsLoader/PointsLoader";
import LogoLoader from "./components/LogoLoader/LogoLoader";
import GradientBackground from "../../components/GradientBackground/GradientBackground";
import TermsAndPrivacyFooter from "../../components/TermsAndPrivacyFooter/TermsAndPrivacyFooter";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigators/paths";

// styles
import styles from "./WelcomeScreen.styles";

const WelcomeScreen: FC = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useRootNavigation();
  const { i18n } = useLocalesProvider();
  const { authState, isAuthenticated, isLoading } = useAuthProvider();

  const getLoadingText = () => {
    switch (authState) {
      case EAuthState.Loading:
        return i18n._("Checking authentication...");
      case EAuthState.Authenticated:
        return i18n._("Welcome back! Redirecting...");
      case EAuthState.Unauthenticated:
        return i18n._("Redirecting to login...");
      default:
        return i18n._("Loading...");
    }
  };

  const onPressPrivacyPolicy = () => {};

  const onPressTermsOfUse = () => {};

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated)
        navigation.navigate(PATHS_MAIN_SCREENS.mainTabs as never);
      else navigation.navigate(PATHS_MAIN_SCREENS.authorization as never);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, navigation]);

  return (
    <GradientBackground>
      <View
        style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
      >
        <View style={styles.logoContainer}>
          <LogoLoader />
          <Text style={styles.loadingText}>{getLoadingText()}</Text>
          <PointsLoader />
        </View>
        <TermsAndPrivacyFooter />
      </View>
    </GradientBackground>
  );
};

export default WelcomeScreen;
