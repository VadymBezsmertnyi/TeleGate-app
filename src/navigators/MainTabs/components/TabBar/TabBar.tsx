import React, { FunctionComponent, useMemo } from "react";
import { View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// providers
import { useLocalesProvider } from "../../../../../localization/localization.provider";

// components
import ButtonTabBar from "../ButtonTabBar/ButtonTabBar";

// constants
import {
  LIST_MAIN_TABS,
  PATHS_MAIN_TABS_HIDE_TAB_BAR,
} from "../../MainTabs.constants";
import { PATHS_MAIN_TABS } from "../../../paths";

// styles
import styles from "./TabBar.styles";

const TabBar: FunctionComponent<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const { i18n } = useLocalesProvider();
  const { bottom } = useSafeAreaInsets();
  const selectIndex = useMemo(() => state.index, [state.index]);

  const shouldHideTabBar = useMemo(() => {
    const currentRoute = state.routes[selectIndex];
    if (!currentRoute) return false;

    const routeName = getFocusedRouteNameFromRoute(currentRoute);
    return routeName
      ? PATHS_MAIN_TABS_HIDE_TAB_BAR.includes(routeName as any)
      : false;
  }, [state.routes, selectIndex]);

  const getName = (name: string) => {
    if (name === PATHS_MAIN_TABS.groups) return i18n._("Groups");
    if (name === PATHS_MAIN_TABS.users) return i18n._("Users");
    if (name === PATHS_MAIN_TABS.analytics) return i18n._("Analytics");
    if (name === PATHS_MAIN_TABS.profile) return i18n._("Profile");

    return i18n._("Unknown Tab");
  };

  if (shouldHideTabBar) return null;
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isActive = selectIndex === index;
        const tab = LIST_MAIN_TABS.find((tab) => tab.name === route.name);
        if (!tab) return null;

        return (
          <ButtonTabBar
            key={`tab-bar-${route.key}`}
            name={getName(route.name)}
            isActive={isActive}
            isReset
            icon={isActive ? tab.activeIcon : tab.icon}
            onPress={() => {
              if (isActive)
                navigation.reset({
                  index: 0,
                  routes: [{ name: route.name }],
                });
              else navigation.navigate(route.name);
            }}
          />
        );
      })}
    </View>
  );
};

export default TabBar;
