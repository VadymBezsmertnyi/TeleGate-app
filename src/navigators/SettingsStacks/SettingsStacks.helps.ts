import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SettingsStackParamListT } from "./SettingsStacks.types";

export const useSettingsStacksNavigation = <
  T extends keyof SettingsStackParamListT
>() => useNavigation<NavigationProp<SettingsStackParamListT, T>>();

export const useSettingsStacksRoute = <
  T extends keyof SettingsStackParamListT
>() => useRoute<RouteProp<SettingsStackParamListT, T>>();
