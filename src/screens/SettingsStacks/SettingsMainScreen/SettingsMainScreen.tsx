import React, { FC, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useAuthProvider } from "../../../providers/AuthProvider/AuthProvider";
import { useWebViewProvider } from "../../../providers/WebViewProvider/WebViewProvider";

// constants
import { WEBVIEW_URLS } from "../../../providers/WebViewProvider/WebViewProvider.constants";

// navigation
import { PATHS_SETTINGS_STACKS } from "../../../navigators/paths";
import { useSettingsStacksNavigation } from "../../../navigators/SettingsStacks/SettingsStacks.helps";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import ModalUniversal from "../../../components/ModalUniversal/ModalUniversal";
import LanguageModal from "./components/LanguageModal/LanguageModal";
import SettingItem from "./components/SettingItem/SettingItem";
import BotSetupButton from "../../../components/BotSetupButton/BotSetupButton";

// styles
import { styles } from "./SettingsMainScreen.styles";
import colors from "../../../styles/colors";

const SettingsMainScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n, language } = useLocalesProvider();
  const { user, logout } = useAuthProvider();
  const { openWebView } = useWebViewProvider();
  const navigation = useSettingsStacksNavigation();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleLogout = () => {
    Alert.alert(i18n._("Logout"), i18n._("Are you sure you want to logout?"), [
      {
        text: i18n._("Cancel"),
        style: "cancel",
      },
      {
        text: i18n._("Logout"),
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.warn("Logout error:", error);
          }
        },
      },
    ]);
  };

  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) {
      return user.first_name;
    }
    if (user?.username) {
      return user.username;
    }
    return i18n._("User");
  };

  const getUsername = () => {
    if (user?.username) {
      return `@${user.username}`;
    }
    return "";
  };

  const getTelegramId = () => {
    if (user?.id) {
      return `Telegram ID: ${user.id}`;
    }
    return "";
  };

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("Settings")} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentScrollView,
          { paddingBottom: bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.photo_url ? (
              <Image source={{ uri: user.photo_url }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color={colors.white} />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{getDisplayName()}</Text>
          {getUsername() && (
            <Text style={styles.userUsername}>{getUsername()}</Text>
          )}
          {getTelegramId() && (
            <Text style={styles.userTelegramId}>{getTelegramId()}</Text>
          )}
        </View>
        <View style={styles.settingsList}>
          <SettingItem
            icon={
              <Ionicons name="card-outline" size={24} color={colors.gray400} />
            }
            title={i18n._("My Subscriptions")}
            onPress={() =>
              navigation.navigate(PATHS_SETTINGS_STACKS.subscriptions)
            }
          />
          <SettingItem
            icon={
              <Ionicons
                name="hardware-chip-outline"
                size={24}
                color={colors.gray400}
              />
            }
            title={i18n._("Bot Templates & Settings")}
            onPress={() =>
              navigation.navigate(PATHS_SETTINGS_STACKS.botSettings)
            }
          />
          <SettingItem
            icon={<BotSetupButton size={24} color={colors.gray400} />}
            title={i18n._("Bot Setup")}
            onPress={() =>
              navigation.navigate(PATHS_SETTINGS_STACKS.settingsBotSetup)
            }
          />
          <SettingItem
            icon={
              <Ionicons
                name="language-outline"
                size={24}
                color={colors.gray400}
              />
            }
            title={i18n._("Language")}
            onPress={() => setIsLanguageModalVisible(true)}
          />
          <SettingItem
            icon={
              <Ionicons name="moon-outline" size={24} color={colors.gray400} />
            }
            title={i18n._("Theme")}
            showArrow={false}
            showSwitch={true}
            switchValue={isDarkTheme}
            onSwitchChange={setIsDarkTheme}
            onPress={() => {}}
          />
          <SettingItem
            icon={
              <Ionicons
                name="shield-outline"
                size={24}
                color={colors.gray400}
              />
            }
            title={i18n._("Privacy Policy")}
            onPress={() =>
              openWebView({
                id: "privacy_policy",
                url: WEBVIEW_URLS.PRIVACY_POLICY,
                title: i18n._("Privacy Policy"),
              })
            }
          />
          <SettingItem
            icon={
              <Ionicons
                name="document-text-outline"
                size={24}
                color={colors.gray400}
              />
            }
            title={i18n._("Terms of Use")}
            onPress={() =>
              openWebView({
                id: "terms_of_use",
                url: WEBVIEW_URLS.TERMS_OF_USE,
                title: i18n._("Terms of Use"),
              })
            }
          />
          <SettingItem
            icon={
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={colors.gray400}
              />
            }
            title={i18n._("About")}
            onPress={() =>
              openWebView({
                id: "about",
                url: WEBVIEW_URLS.ABOUT,
                title: i18n._("About"),
              })
            }
          />
          <SettingItem
            icon={
              <Ionicons
                name="log-out-outline"
                size={24}
                color={colors.gray500}
              />
            }
            title={i18n._("Logout")}
            onPress={handleLogout}
            isDestructive
          />
        </View>
      </ScrollView>
      {isLanguageModalVisible && (
        <ModalUniversal
          visible={isLanguageModalVisible}
          onClose={() => setIsLanguageModalVisible(false)}
        >
          <LanguageModal
            currentLanguage={language}
            onClose={() => setIsLanguageModalVisible(false)}
          />
        </ModalUniversal>
      )}
    </GradientBackground>
  );
};

export default SettingsMainScreen;
