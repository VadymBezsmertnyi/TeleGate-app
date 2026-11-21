import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// constants
import { LIST_SETTINGS_STACKS } from "./SettingsStacks.constants";

// types
import { SettingsStackParamListT } from "./SettingsStacks.types";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const Stack = createNativeStackNavigator<SettingsStackParamListT>();

const SettingsStacks: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {LIST_SETTINGS_STACKS.map((screen) => (
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

export default SettingsStacks;
