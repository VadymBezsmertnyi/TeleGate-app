import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootAllScreensParamListT } from "./navigators.types";

export const useRootNavigation = <T extends keyof RootAllScreensParamListT>() =>
  useNavigation<NavigationProp<RootAllScreensParamListT, T>>();

export const useRootRoute = <T extends keyof RootAllScreensParamListT>() =>
  useRoute<RouteProp<RootAllScreensParamListT, T>>();
