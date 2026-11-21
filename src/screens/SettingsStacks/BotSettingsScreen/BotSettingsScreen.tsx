import React, { FC, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";

// navigation
import { useSettingsStacksNavigation } from "../../../navigators/SettingsStacks/SettingsStacks.helps";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import TermsAndPrivacyFooter from "../../../components/TermsAndPrivacyFooter/TermsAndPrivacyFooter";

// constants
import { PATHS_SETTINGS_STACKS } from "../../../navigators/paths";

// styles
import { styles } from "./BotSettingsScreen.styles";
import colors from "../../../styles/colors";

const BotSettingsScreen: FC = () => {
  const navigation = useSettingsStacksNavigation();
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();

  // State for bot behavior settings
  const [autoRemoveExpired, setAutoRemoveExpired] = useState(false);
  const [gracePeriod, setGracePeriod] = useState("3");
  const [autoSendReminders, setAutoSendReminders] = useState(false);
  const [selectedReminderInterval, setSelectedReminderInterval] = useState<
    string | null
  >(null);

  // State for integrations
  const [webhookUrl, setWebhookUrl] = useState(
    "https://api.example.com/webhook"
  );
  const [secretToken, setSecretToken] = useState("");
  const [paymentProvider, setPaymentProvider] = useState("Stripe");
  const [currency, setCurrency] = useState("USD");

  const reminderIntervals = ["7d", "3d", "1d"];
  const paymentProviders = ["Stripe", "PayPal", "Square"];
  const currencies = ["USD", "EUR", "GBP", "UAH"];

  const handleCopyToClipboard = (text: string, label: string) => {
    // In a real app, you would use Clipboard API here
    Alert.alert(i18n._("Copied"), `${label} copied to clipboard`);
  };

  const handleSendTestMessage = () => {
    Alert.alert(
      i18n._("Test Message"),
      i18n._("Test message sent successfully!")
    );
  };

  const handleSave = () => {
    Alert.alert(i18n._("Success"), i18n._("Bot settings saved successfully!"));
  };

  const handleDiscard = () => {
    Alert.alert(
      i18n._("Discard Changes"),
      i18n._("Are you sure you want to discard all changes?"),
      [
        { text: i18n._("Cancel"), style: "cancel" },
        { text: i18n._("Discard"), style: "destructive" },
      ]
    );
  };

  return (
    <GradientBackground>
      <CustomHeader title={i18n._("Bot Settings")} showBackButton />
      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentScrollView,
          { paddingBottom: bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Manage Bot Message Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {i18n._("Manage Bot Message Templates")}
          </Text>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() =>
              navigation.navigate(PATHS_SETTINGS_STACKS.botTemplates)
            }
          >
            <View style={styles.templateButtonLeft}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={colors.gray400}
              />
              <Text style={styles.templateButtonText}>
                {i18n._("Manage Bot Message Templates")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Bot Behavior Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {i18n._("Bot Behavior Settings")}
          </Text>

          {/* Auto-remove expired users */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>
                {i18n._("Auto-remove expired users")}
              </Text>
            </View>
            <Switch
              value={autoRemoveExpired}
              onValueChange={setAutoRemoveExpired}
              trackColor={{ false: colors.gray800, true: colors.blue500 }}
              thumbColor={autoRemoveExpired ? colors.white : colors.gray300}
            />
          </View>

          {/* Grace period */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>
                {i18n._("Grace period (days)")}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              value={gracePeriod}
              onChangeText={setGracePeriod}
              keyboardType="numeric"
              placeholder="3"
              placeholderTextColor={colors.gray400}
            />
          </View>

          {/* Auto-send reminders */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>
                {i18n._("Auto-send reminders")}
              </Text>
            </View>
            <Switch
              value={autoSendReminders}
              onValueChange={setAutoSendReminders}
              trackColor={{ false: colors.gray800, true: colors.blue500 }}
              thumbColor={autoSendReminders ? colors.white : colors.gray300}
            />
          </View>

          {/* Reminder intervals */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>
                {i18n._("Reminder intervals")}
              </Text>
            </View>
            <View style={styles.intervalButtons}>
              {reminderIntervals.map((interval) => (
                <TouchableOpacity
                  key={interval}
                  style={[
                    styles.intervalButton,
                    selectedReminderInterval === interval &&
                      styles.intervalButtonActive,
                  ]}
                  onPress={() => setSelectedReminderInterval(interval)}
                >
                  <Text
                    style={[
                      styles.intervalButtonText,
                      selectedReminderInterval === interval &&
                        styles.intervalButtonTextActive,
                    ]}
                  >
                    {interval}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Integrations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n._("Integrations")}</Text>

          {/* Webhook URL */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>{i18n._("Webhook URL")}</Text>
            </View>
            <View style={styles.inputWithCopy}>
              <TextInput
                style={styles.inputField}
                value={webhookUrl}
                onChangeText={setWebhookUrl}
                placeholder="https://api.example.com/webhook"
                placeholderTextColor={colors.gray400}
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopyToClipboard(webhookUrl, "Webhook URL")}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={colors.gray400}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Secret Token */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>{i18n._("Secret Token")}</Text>
            </View>
            <View style={styles.inputWithCopy}>
              <TextInput
                style={styles.inputField}
                value={secretToken}
                onChangeText={setSecretToken}
                placeholder="sk_test_..."
                placeholderTextColor={colors.gray400}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() =>
                  handleCopyToClipboard(secretToken, "Secret Token")
                }
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={colors.gray400}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Provider */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>
                {i18n._("Payment Provider")}
              </Text>
            </View>
            <DropdownMenu
              value={paymentProvider}
              options={paymentProviders}
              onSelect={setPaymentProvider}
              placeholder={i18n._("Select payment provider")}
            />
          </View>

          {/* Currency */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>{i18n._("Currency")}</Text>
            </View>
            <DropdownMenu
              value={currency}
              options={currencies}
              onSelect={setCurrency}
              placeholder={i18n._("Select currency")}
            />
          </View>
        </View>

        {/* Test Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n._("Test Actions")}</Text>
          <TouchableOpacity
            style={styles.testButton}
            onPress={handleSendTestMessage}
          >
            <View style={styles.testButtonLeft}>
              <Ionicons
                name="paper-plane-outline"
                size={24}
                color={colors.gray400}
              />
              <Text style={styles.testButtonText}>
                {i18n._("Send Test Message to Me")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={handleDiscard}
          >
            <Text style={styles.discardButtonText}>{i18n._("Discard")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{i18n._("Save")}</Text>
          </TouchableOpacity>
        </View>
        <TermsAndPrivacyFooter />
      </View>
    </GradientBackground>
  );
};

export default BotSettingsScreen;
