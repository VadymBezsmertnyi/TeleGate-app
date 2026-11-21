import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PATHS_ANALYTICS_STACKS } from "../paths";

export type AnalyticsStackParamListT = {
  [PATHS_ANALYTICS_STACKS.analyticsMain]: undefined;
};

export type AnalyticsStackScreenPropsT<
  T extends keyof AnalyticsStackParamListT
> = NativeStackScreenProps<AnalyticsStackParamListT, T>;
