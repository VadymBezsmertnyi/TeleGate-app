import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { GroupsStackParamListT } from "./GroupsStacks.types";

export const useGroupsStacksNavigation = <
  T extends keyof GroupsStackParamListT
>() => useNavigation<NavigationProp<GroupsStackParamListT, T>>();

export const useGroupsStacksRoute = <T extends keyof GroupsStackParamListT>() =>
  useRoute<RouteProp<GroupsStackParamListT, T>>();
