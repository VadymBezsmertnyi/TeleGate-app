// types
import { GroupsStackParamListT } from "./GroupsStacks.types";

// screens
import GroupsMainScreen from "../../screens/GroupsStacks/GroupsMainScreen/GroupsMainScreen";
import GroupDetailsScreen from "../../screens/GroupsStacks/GroupDetailsScreen/GroupDetailsScreen";
import GroupSubscriptionsScreen from "../../screens/GroupsStacks/GroupSubscriptionsScreen/GroupSubscriptionsScreen";
import GroupUsersScreen from "../../screens/GroupsStacks/GroupUsersScreen/GroupUsersScreen";
import GroupUserDetailsScreen from "../../screens/GroupsStacks/GroupUserDetailsScreen/GroupUserDetailsScreen";
import SubscriptionFormScreen from "../../screens/GroupsStacks/SubscriptionFormScreen/SubscriptionFormScreen";
import BotSetupScreen from "../../screens/SettingsStacks/BotSetupScreen/BotSetupScreen";

// constants
import { PATHS_GROUPS_STACKS } from "../paths";

export const LIST_GROUPS_STACKS: Array<{
  id: keyof GroupsStackParamListT;
  name: keyof GroupsStackParamListT;
  title: keyof GroupsStackParamListT;
  mainScreen: keyof GroupsStackParamListT;
  component: React.ComponentType<any>;
  headerShown: boolean;
  gestureEnabled?: boolean;
}> = [
  {
    id: PATHS_GROUPS_STACKS.groupsMain,
    name: PATHS_GROUPS_STACKS.groupsMain,
    mainScreen: PATHS_GROUPS_STACKS.groupsMain,
    title: PATHS_GROUPS_STACKS.groupsMain,
    component: GroupsMainScreen,
    headerShown: false,
  },
  {
    id: PATHS_GROUPS_STACKS.groupDetails,
    name: PATHS_GROUPS_STACKS.groupDetails,
    mainScreen: PATHS_GROUPS_STACKS.groupDetails,
    title: PATHS_GROUPS_STACKS.groupDetails,
    component: GroupDetailsScreen,
    headerShown: false,
  },
  {
    id: PATHS_GROUPS_STACKS.groupSubscriptions,
    name: PATHS_GROUPS_STACKS.groupSubscriptions,
    mainScreen: PATHS_GROUPS_STACKS.groupSubscriptions,
    title: PATHS_GROUPS_STACKS.groupSubscriptions,
    component: GroupSubscriptionsScreen,
    headerShown: false,
  },
  {
    id: PATHS_GROUPS_STACKS.groupUsers,
    name: PATHS_GROUPS_STACKS.groupUsers,
    mainScreen: PATHS_GROUPS_STACKS.groupUsers,
    title: PATHS_GROUPS_STACKS.groupUsers,
    component: GroupUsersScreen,
    headerShown: false,
  },
  {
    id: PATHS_GROUPS_STACKS.groupUserDetails,
    name: PATHS_GROUPS_STACKS.groupUserDetails,
    mainScreen: PATHS_GROUPS_STACKS.groupUserDetails,
    title: PATHS_GROUPS_STACKS.groupUserDetails,
    component: GroupUserDetailsScreen,
    headerShown: false,
  },
  {
    id: PATHS_GROUPS_STACKS.subscriptionForm,
    name: PATHS_GROUPS_STACKS.subscriptionForm,
    mainScreen: PATHS_GROUPS_STACKS.subscriptionForm,
    title: PATHS_GROUPS_STACKS.subscriptionForm,
    component: SubscriptionFormScreen,
    headerShown: false,
  },
  {
    id: PATHS_GROUPS_STACKS.groupsBotSetup,
    name: PATHS_GROUPS_STACKS.groupsBotSetup,
    mainScreen: PATHS_GROUPS_STACKS.groupsBotSetup,
    title: PATHS_GROUPS_STACKS.groupsBotSetup,
    component: BotSetupScreen,
    headerShown: false,
  },
];
