import React, { FunctionComponent, useEffect, useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// types
import { RootMainTabsParamListT } from "./MainTabs.types";

// providers
import { useUpdateProvider } from "../../providers/UpdateProvider/UpdateProvider";

// components
import TabBar from "./components/TabBar/TabBar";

// constants
import { PATHS_MAIN_TABS } from "../paths";
import { LIST_MAIN_TABS } from "./MainTabs.constants";

const Tab = createBottomTabNavigator<RootMainTabsParamListT>();

const MainTabs: FunctionComponent = () => {
  const { checkNewVersion } = useUpdateProvider();
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
    }),
    []
  );

  useEffect(() => {
    checkNewVersion();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
      }}
      initialRouteName={PATHS_MAIN_TABS.groups}
      tabBar={(props) => <TabBar {...props} />}
    >
      {LIST_MAIN_TABS.map((screen) => (
        <Tab.Screen
          key={`tab-screen-${String(screen.id)}`}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTabs;
