import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// constants
import { LIST_GROUPS_STACKS } from "./GroupsStacks.constants";

// types
import { GroupsStackParamListT } from "./GroupsStacks.types";

const Stack = createNativeStackNavigator<GroupsStackParamListT>();

const GroupsStacks: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {LIST_GROUPS_STACKS.map((screen) => (
        <Stack.Screen
          key={String(screen.id)}
          name={screen.name}
          component={screen.component}
          options={() => ({
            headerShown: screen.headerShown,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default GroupsStacks;
