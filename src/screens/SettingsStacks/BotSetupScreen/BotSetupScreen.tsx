import React, { FC } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";

import { styles } from "./BotSetupScreen.styles";
import colors from "../../../styles/colors";

const BotSetupScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();

  const handleOpenBot = async () => {
    try {
      const botUrl = "https://t.me/TeleGateAuthBot";
      const canOpen = await Linking.canOpenURL(botUrl);
      if (canOpen) await Linking.openURL(botUrl);
      else Alert.alert(i18n._("Error"), i18n._("Cannot open Telegram"));
    } catch (error) {
      console.warn("Error opening bot:", error);
      Alert.alert(i18n._("Error"), i18n._("Cannot open Telegram"));
    }
  };

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("Bot Setup")} showBackButton />
      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentScrollView,
          { paddingBottom: bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.botInfoSection}>
          <View style={styles.botAvatarContainer}>
            <View style={styles.botAvatar}>
              <Ionicons name="rocket" size={40} color={colors.blue500} />
            </View>
          </View>
          <Text style={styles.botName}>TeleGate Auth Bot</Text>
          <Text style={styles.botUsername}>@TeleGateAuthBot</Text>
          <Text style={styles.botDescription}>
            {i18n._("Authentication bot for TeleGate app")}
          </Text>
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>
            {i18n._("How to add bot to group")}
          </Text>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                {i18n._("Open bot in Telegram")}
              </Text>
              <Text style={styles.stepDescription}>
                {i18n._("Click the button below to open the bot in Telegram")}
              </Text>
              <TouchableOpacity
                style={styles.botButton}
                onPress={handleOpenBot}
              >
                <Ionicons name="send" size={20} color={colors.white} />
                <Text style={styles.botButtonText}>{i18n._("Open Bot")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                {i18n._("Add bot to your group")}
              </Text>
              <Text style={styles.stepDescription}>
                {i18n._(
                  "In the bot chat, click 'Add to Group or Channel' button"
                )}
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                {i18n._("Grant all permissions")}
              </Text>
              <Text style={styles.stepDescription}>
                {i18n._("Make sure to enable all permissions for the bot")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.usersInfoSection}>
          <Text style={styles.sectionTitle}>{i18n._("About users")}</Text>

          <View style={styles.infoItem}>
            <Ionicons name="people" size={20} color={colors.blue400} />
            <Text style={styles.infoText}>
              {i18n._(
                "Users are added automatically to the group or when you tag them"
              )}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark" size={20} color={colors.orange} />
            <Text style={styles.infoText}>
              {i18n._(
                "Some users may have private profiles, so not all data may be available"
              )}
            </Text>
          </View>
        </View>

        <View style={styles.permissionsSection}>
          <Text style={styles.sectionTitle}>
            {i18n._("Required permissions")}
          </Text>

          <View style={styles.permissionItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.green500}
            />
            <Text style={styles.permissionText}>
              {i18n._("Delete messages")}
            </Text>
          </View>

          <View style={styles.permissionItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.green500}
            />
            <Text style={styles.permissionText}>{i18n._("Ban users")}</Text>
          </View>

          <View style={styles.permissionItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.green500}
            />
            <Text style={styles.permissionText}>
              {i18n._("Invite users via link")}
            </Text>
          </View>

          <View style={styles.permissionItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.green500}
            />
            <Text style={styles.permissionText}>{i18n._("Pin messages")}</Text>
          </View>

          <View style={styles.permissionItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.green500}
            />
            <Text style={styles.permissionText}>
              {i18n._("Add new admins")}
            </Text>
          </View>

          <View style={styles.permissionItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.green500}
            />
            <Text style={styles.permissionText}>
              {i18n._("Change group info")}
            </Text>
          </View>
        </View>

        <View style={styles.noteSection}>
          <View style={styles.noteContainer}>
            <Ionicons
              name="information-circle"
              size={20}
              color={colors.infoBlue}
            />
            <Text style={styles.noteText}>
              {i18n._("This bot cannot independently manage a group")}
            </Text>
          </View>
        </View>

        <View style={styles.developmentSection}>
          <Text style={styles.sectionTitle}>
            {i18n._("Development status")}
          </Text>

          <View style={styles.infoItem}>
            <Ionicons name="construct" size={20} color={colors.yellow} />
            <Text style={styles.infoText}>
              {i18n._(
                "The app is in development - some features may not be available or work as expected"
              )}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="settings" size={20} color={colors.blue400} />
            <Text style={styles.infoText}>
              {i18n._(
                "Automation events are being developed to configure bot actions for user management in groups"
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default BotSetupScreen;
