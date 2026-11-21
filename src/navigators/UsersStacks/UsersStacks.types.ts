import { NavigatorScreenParams } from "@react-navigation/native";
import { PATHS_USERS_STACKS } from "../paths";

export type UsersStackParamListT = {
  [PATHS_USERS_STACKS.usersMain]?: undefined;
  [PATHS_USERS_STACKS.userDetails]: {
    userId: string;
  };
  [PATHS_USERS_STACKS.usersBotSetup]?: undefined;
};

export type RootUsersStacksParamListT =
  NavigatorScreenParams<UsersStackParamListT>;
