// types
import { RootMainTabsParamListT } from "./MainTabs.types";
import { RootMainScreensParamListT } from "../navigators.types";

// screens
import GroupsStacks from "../GroupsStacks/GroupsStacks";
import UsersStacks from "../UsersStacks/UsersStacks";
import AnalyticsStacks from "../AnalyticsStacks/AnalyticsStacks";
import SettingsStacks from "../SettingsStacks/SettingsStacks";

// constants
import {
  PATHS_ANALYTICS_STACKS,
  PATHS_GROUPS_STACKS,
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_SETTINGS_STACKS,
  PATHS_USERS_STACKS,
} from "../paths";

export const PATHS_MAIN_TABS_HIDE_TAB_BAR = [
  PATHS_GROUPS_STACKS.groupDetails,
  PATHS_GROUPS_STACKS.groupSubscriptions,
  PATHS_GROUPS_STACKS.subscriptionForm,
  PATHS_GROUPS_STACKS.groupUsers,
  PATHS_GROUPS_STACKS.groupUserDetails,
  PATHS_USERS_STACKS.userDetails,
  PATHS_SETTINGS_STACKS.botSettings,
  PATHS_SETTINGS_STACKS.botTemplates,
  PATHS_SETTINGS_STACKS.subscriptions,
  PATHS_SETTINGS_STACKS.comparePlans,
  // setup bot
  PATHS_GROUPS_STACKS.groupsBotSetup,
  PATHS_USERS_STACKS.usersBotSetup,
  PATHS_SETTINGS_STACKS.settingsBotSetup,
] as const;

export const LIST_MAIN_TABS: Array<{
  id: keyof RootMainTabsParamListT;
  name: keyof RootMainTabsParamListT;
  title: keyof RootMainTabsParamListT;
  mainScreen: keyof RootMainScreensParamListT;
  component: React.ComponentType<any>;
  headerShown: boolean;
  gestureEnabled?: boolean;
  icon: string;
  activeIcon: string;
}> = [
  {
    id: PATHS_MAIN_TABS.groups,
    name: PATHS_MAIN_TABS.groups,
    mainScreen: PATHS_MAIN_SCREENS.mainTabs,
    title: PATHS_MAIN_TABS.groups,
    component: GroupsStacks,
    headerShown: false,
    icon: "people-outline",
    activeIcon: "people",
  },
  {
    id: PATHS_MAIN_TABS.users,
    name: PATHS_MAIN_TABS.users,
    mainScreen: PATHS_MAIN_SCREENS.mainTabs,
    title: PATHS_MAIN_TABS.users,
    component: UsersStacks,
    headerShown: false,
    icon: "person-outline",
    activeIcon: "person",
  },
  {
    id: PATHS_MAIN_TABS.analytics,
    name: PATHS_MAIN_TABS.analytics,
    mainScreen: PATHS_MAIN_SCREENS.mainTabs,
    title: PATHS_MAIN_TABS.analytics,
    component: AnalyticsStacks,
    headerShown: false,
    icon: "analytics-outline",
    activeIcon: "analytics",
  },
  {
    id: PATHS_MAIN_TABS.profile,
    name: PATHS_MAIN_TABS.profile,
    mainScreen: PATHS_MAIN_SCREENS.mainTabs,
    title: PATHS_MAIN_TABS.profile,
    component: SettingsStacks,
    headerShown: false,
    icon: "settings-outline",
    activeIcon: "settings",
  },
];
