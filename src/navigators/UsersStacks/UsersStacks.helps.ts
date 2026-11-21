import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { UsersStackParamListT } from "./UsersStacks.types";

export const useUsersStacksNavigation = <
  T extends keyof UsersStackParamListT
>() => useNavigation<NavigationProp<UsersStackParamListT, T>>();

export const useUsersStacksRoute = <T extends keyof UsersStackParamListT>() =>
  useRoute<RouteProp<UsersStackParamListT, T>>();
