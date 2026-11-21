// types
import { AnalyticsStackParamListT } from "./AnalyticsStacks.types";

// screens
import AnalyticsMainScreen from "../../screens/AnalyticsStacks/AnalyticsMainScreen/AnalyticsMainScreen";

// constants
import { PATHS_ANALYTICS_STACKS } from "../paths";

export const LIST_ANALYTICS_STACKS: Array<{
  id: keyof AnalyticsStackParamListT;
  name: keyof AnalyticsStackParamListT;
  title: keyof AnalyticsStackParamListT;
  mainScreen: keyof AnalyticsStackParamListT;
  component: React.ComponentType<any>;
  headerShown: boolean;
  gestureEnabled?: boolean;
}> = [
  {
    id: PATHS_ANALYTICS_STACKS.analyticsMain,
    name: PATHS_ANALYTICS_STACKS.analyticsMain,
    mainScreen: PATHS_ANALYTICS_STACKS.analyticsMain,
    title: PATHS_ANALYTICS_STACKS.analyticsMain,
    component: AnalyticsMainScreen,
    headerShown: false,
  },
];
