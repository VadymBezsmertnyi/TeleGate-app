import { PATHS_GROUPS_STACKS } from "../paths";

export type GroupsStackParamListT = {
  [PATHS_GROUPS_STACKS.groupsMain]?: undefined;
  [PATHS_GROUPS_STACKS.groupDetails]: { groupId: string };
  [PATHS_GROUPS_STACKS.groupSubscriptions]: { groupId: string };
  [PATHS_GROUPS_STACKS.groupUsers]: { groupId: string };
  [PATHS_GROUPS_STACKS.groupUserDetails]: {
    userId: string;
    groupId?: string;
  };
  [PATHS_GROUPS_STACKS.subscriptionForm]: {
    groupId: string;
    subscriptionId?: string;
    mode: "create" | "edit";
  };
  [PATHS_GROUPS_STACKS.groupsBotSetup]?: undefined;
};
