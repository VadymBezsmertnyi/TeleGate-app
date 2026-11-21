// types
import { UsersStackParamListT } from "./UsersStacks.types";

// screens
import UsersMainScreen from "../../screens/UsersStacks/UsersMainScreen/UsersMainScreen";
import UserDetailsScreen from "../../screens/UsersStacks/UserDetailsScreen/UserDetailsScreen";
import BotSetupScreen from "../../screens/SettingsStacks/BotSetupScreen/BotSetupScreen";

// constants
import { PATHS_USERS_STACKS } from "../paths";

export const LIST_USERS_STACKS: Array<{
  id: keyof UsersStackParamListT;
  name: keyof UsersStackParamListT;
  title: keyof UsersStackParamListT;
  mainScreen: keyof UsersStackParamListT;
  component: React.ComponentType<any>;
  headerShown: boolean;
  gestureEnabled?: boolean;
}> = [
  {
    id: PATHS_USERS_STACKS.usersMain,
    name: PATHS_USERS_STACKS.usersMain,
    mainScreen: PATHS_USERS_STACKS.usersMain,
    title: PATHS_USERS_STACKS.usersMain,
    component: UsersMainScreen,
    headerShown: false,
  },
  {
    id: PATHS_USERS_STACKS.userDetails,
    name: PATHS_USERS_STACKS.userDetails,
    mainScreen: PATHS_USERS_STACKS.userDetails,
    title: PATHS_USERS_STACKS.userDetails,
    component: UserDetailsScreen,
    headerShown: false,
  },
  {
    id: PATHS_USERS_STACKS.usersBotSetup,
    name: PATHS_USERS_STACKS.usersBotSetup,
    mainScreen: PATHS_USERS_STACKS.usersBotSetup,
    title: PATHS_USERS_STACKS.usersBotSetup,
    component: BotSetupScreen,
    headerShown: false,
  },
];
