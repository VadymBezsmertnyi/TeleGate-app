import { PATHS_MAIN_SCREENS } from "./paths";

export type RootMainScreensParamListT = {
  [PATHS_MAIN_SCREENS.welcome]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_SCREENS.authorization]?: Record<
    string,
    string | number | boolean
  > & {
    isLogin?: boolean;
    email?: string;
  };
  [PATHS_MAIN_SCREENS.mainTabs]?: Record<string, string | number | boolean>;
};

export type RootAllScreensParamListT = RootMainScreensParamListT;
