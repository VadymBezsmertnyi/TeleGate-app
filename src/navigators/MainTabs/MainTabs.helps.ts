import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootMainTabsParamListT } from "./MainTabs.types";

export const useMainTabsNavigation = <
  T extends keyof RootMainTabsParamListT
>() => useNavigation<NavigationProp<RootMainTabsParamListT, T>>();

export const useMainTabsRoute = <T extends keyof RootMainTabsParamListT>() =>
  useRoute<RouteProp<RootMainTabsParamListT, T>>();
