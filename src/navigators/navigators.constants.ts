// types
import { RootMainScreensParamListT } from "./navigators.types";

// screens
import AuthorizationScreen from "../screens/AuthorizationScreen/AuthorizationScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import MainTabs from "./MainTabs/MainTabs";

// constants
import { PATHS_MAIN_SCREENS } from "./paths";

export const LIST_MAIN_SCREENS: Array<{
  id: keyof RootMainScreensParamListT;
  name: keyof RootMainScreensParamListT;
  title: keyof RootMainScreensParamListT;
  component: React.ComponentType<any>;
  headerShown: boolean;
  gestureEnabled?: boolean;
}> = [
  {
    id: PATHS_MAIN_SCREENS.welcome,
    name: PATHS_MAIN_SCREENS.welcome,
    title: PATHS_MAIN_SCREENS.welcome,
    component: WelcomeScreen,
    headerShown: false,
    gestureEnabled: false,
  },
  {
    id: PATHS_MAIN_SCREENS.authorization,
    name: PATHS_MAIN_SCREENS.authorization,
    title: PATHS_MAIN_SCREENS.authorization,
    component: AuthorizationScreen,
    headerShown: false,
    gestureEnabled: false,
  },
  {
    id: PATHS_MAIN_SCREENS.mainTabs,
    name: PATHS_MAIN_SCREENS.mainTabs,
    title: PATHS_MAIN_SCREENS.mainTabs,
    component: MainTabs,
    headerShown: false,
    gestureEnabled: false,
  },
];
