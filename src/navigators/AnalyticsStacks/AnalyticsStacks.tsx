import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// constants
import { LIST_ANALYTICS_STACKS } from "./AnalyticsStacks.constants";

// types
import { AnalyticsStackParamListT } from "./AnalyticsStacks.types";

const Stack = createNativeStackNavigator<AnalyticsStackParamListT>();

const AnalyticsStacks: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {LIST_ANALYTICS_STACKS.map((screen) => (
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

export default AnalyticsStacks;
