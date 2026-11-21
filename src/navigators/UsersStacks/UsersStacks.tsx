import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// constants
import { LIST_USERS_STACKS } from "./UsersStacks.constants";

// types
import { UsersStackParamListT } from "./UsersStacks.types";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const Stack = createNativeStackNavigator<UsersStackParamListT>();

const UsersStacks: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {LIST_USERS_STACKS.map((screen) => (
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

export const useUsersStacksNavigation = <
  T extends keyof UsersStackParamListT
>() => useNavigation<NavigationProp<UsersStackParamListT, T>>();

export const useUsersStacksRoute = <T extends keyof UsersStackParamListT>() =>
  useRoute<RouteProp<UsersStackParamListT, T>>();

export default UsersStacks;
