import { PATHS_MAIN_TABS } from "../paths";
import { AnalyticsStackParamListT } from "../AnalyticsStacks/AnalyticsStacks.types";

export type RootMainTabsParamListT = {
  [PATHS_MAIN_TABS.groups]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_TABS.users]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_TABS.analytics]?: AnalyticsStackParamListT;
  [PATHS_MAIN_TABS.profile]?: Record<string, string | number | boolean>;
};
