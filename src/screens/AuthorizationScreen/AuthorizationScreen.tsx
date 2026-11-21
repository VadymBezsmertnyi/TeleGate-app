import React, { FC } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

// Providers
import { useTelegramAuthProvider } from "../../providers/TelegramAuthProvider/TelegramAuthProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";
import GradientBackground from "../../components/GradientBackground/GradientBackground";

// Components
import TermsAndPrivacyFooter from "../../components/TermsAndPrivacyFooter/TermsAndPrivacyFooter";

// Styles
import styles from "./AuthorizationScreen.styles";

const AuthorizationScreen: FC = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { startTelegramAuth, isAuthenticating } = useTelegramAuthProvider();
  const { i18n } = useLocalesProvider();

  const handleLogin = async () => {
    await startTelegramAuth();
  };

  return (
    <GradientBackground>
      <View
        style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
      >
        <View style={styles.box}>
          <View style={styles.logoTitleContainer}>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
            <View style={styles.titlesContainer}>
              <Text style={styles.title}>{i18n._("Welcome to TeleGate")}</Text>
              <Text style={styles.subtitle}>
                {i18n._("Please authorize with Telegram to continue")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.loginButton,
              isAuthenticating && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isAuthenticating}
          >
            <Text style={styles.loginButtonText}>
              {isAuthenticating
                ? i18n._("Authenticating...")
                : i18n._("Login with Telegram")}
            </Text>
          </TouchableOpacity>
        </View>
        <TermsAndPrivacyFooter />
      </View>
    </GradientBackground>
  );
};

export default AuthorizationScreen;
