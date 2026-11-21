// types
import { SettingsStackParamListT } from "./SettingsStacks.types";

// screens
import SettingsMainScreen from "../../screens/SettingsStacks/SettingsMainScreen/SettingsMainScreen";
import BotSettingsScreen from "../../screens/SettingsStacks/BotSettingsScreen/BotSettingsScreen";
import BotTemplatesScreen from "../../screens/SettingsStacks/BotTemplatesScreen/BotTemplatesScreen";
import SubscriptionsScreen from "../../screens/SettingsStacks/SubscriptionsScreen/SubscriptionsScreen";
import ComparePlansScreen from "../../screens/SettingsStacks/ComparePlansScreen/ComparePlansScreen";
import BotSetupScreen from "../../screens/SettingsStacks/BotSetupScreen/BotSetupScreen";

// constants
import { PATHS_SETTINGS_STACKS } from "../paths";

export const LIST_SETTINGS_STACKS: Array<{
  id: keyof SettingsStackParamListT;
  name: keyof SettingsStackParamListT;
  title: keyof SettingsStackParamListT;
  mainScreen: keyof SettingsStackParamListT;
  component: React.ComponentType<any>;
  headerShown: boolean;
  gestureEnabled?: boolean;
}> = [
  {
    id: PATHS_SETTINGS_STACKS.settingsMain,
    name: PATHS_SETTINGS_STACKS.settingsMain,
    mainScreen: PATHS_SETTINGS_STACKS.settingsMain,
    title: PATHS_SETTINGS_STACKS.settingsMain,
    component: SettingsMainScreen,
    headerShown: false,
  },
  {
    id: PATHS_SETTINGS_STACKS.botSettings,
    name: PATHS_SETTINGS_STACKS.botSettings,
    mainScreen: PATHS_SETTINGS_STACKS.botSettings,
    title: PATHS_SETTINGS_STACKS.botSettings,
    component: BotSettingsScreen,
    headerShown: false,
  },
  {
    id: PATHS_SETTINGS_STACKS.botTemplates,
    name: PATHS_SETTINGS_STACKS.botTemplates,
    mainScreen: PATHS_SETTINGS_STACKS.botTemplates,
    title: PATHS_SETTINGS_STACKS.botTemplates,
    component: BotTemplatesScreen,
    headerShown: false,
  },
  {
    id: PATHS_SETTINGS_STACKS.subscriptions,
    name: PATHS_SETTINGS_STACKS.subscriptions,
    mainScreen: PATHS_SETTINGS_STACKS.subscriptions,
    title: PATHS_SETTINGS_STACKS.subscriptions,
    component: SubscriptionsScreen,
    headerShown: false,
  },
  {
    id: PATHS_SETTINGS_STACKS.comparePlans,
    name: PATHS_SETTINGS_STACKS.comparePlans,
    mainScreen: PATHS_SETTINGS_STACKS.comparePlans,
    title: PATHS_SETTINGS_STACKS.comparePlans,
    component: ComparePlansScreen,
    headerShown: false,
  },
  {
    id: PATHS_SETTINGS_STACKS.settingsBotSetup,
    name: PATHS_SETTINGS_STACKS.settingsBotSetup,
    mainScreen: PATHS_SETTINGS_STACKS.settingsBotSetup,
    title: PATHS_SETTINGS_STACKS.settingsBotSetup,
    component: BotSetupScreen,
    headerShown: false,
  },
];
