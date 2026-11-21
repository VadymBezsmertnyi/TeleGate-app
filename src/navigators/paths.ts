export const PATHS_MAIN_SCREENS = {
  welcome: "welcome",
  authorization: "authorization",
  mainTabs: "mainTabs",
} as const;

export const PATHS_MAIN_TABS = {
  groups: "groups",
  users: "users",
  analytics: "analytics",
  profile: "profile",
} as const;

export const PATHS_GROUPS_STACKS = {
  groupsMain: "GroupsMain",
  groupDetails: "GroupDetails",
  groupSubscriptions: "GroupSubscriptions",
  groupUsers: "GroupUsers",
  groupUserDetails: "GroupUserDetails",
  subscriptionForm: "SubscriptionForm",
  groupsBotSetup: "GroupsBotSetup",
} as const;

export const PATHS_USERS_STACKS = {
  usersMain: "UsersMain",
  userDetails: "UserDetails",
  usersBotSetup: "UsersBotSetup",
} as const;

export const PATHS_ANALYTICS_STACKS = {
  analyticsMain: "AnalyticsMain",
} as const;

export const PATHS_SETTINGS_STACKS = {
  settingsMain: "SettingsMain",
  botSettings: "BotSettings",
  botTemplates: "BotTemplates",
  subscriptions: "Subscriptions",
  comparePlans: "ComparePlans",
  settingsBotSetup: "SettingsBotSetup",
} as const;
