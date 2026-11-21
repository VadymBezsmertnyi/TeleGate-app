import React, { FunctionComponent, useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { NavigationContainerRef } from "@react-navigation/native";

// types
import {
  RootAllScreensParamListT,
  RootMainScreensParamListT,
} from "./navigators.types";

// constants
import { LIST_MAIN_SCREENS } from "./navigators.constants";
import { PATHS_MAIN_SCREENS } from "./paths";

// styles
import styles from "./navigators.styles";

type NavigatorsProps = {
  currentRouteName: string | null;
  navigation: NavigationContainerRef<RootAllScreensParamListT> | null;
};

const Stack = createNativeStackNavigator<RootMainScreensParamListT>();

const Navigators: FunctionComponent<NavigatorsProps> = ({
  currentRouteName,
  navigation,
}) => {
  const options = (
    headerShown: boolean,
    gestureEnabled = true
  ): NativeStackNavigationOptions => ({
    headerShown,
    gestureEnabled,
  });

  const onPressBack = useCallback(() => {
    if (navigation && currentRouteName) {
      const stateNavigator = navigation.getState();
      const mainName = stateNavigator.routes[stateNavigator.index].name;
      if (
        currentRouteName === PATHS_MAIN_SCREENS.welcome &&
        mainName === PATHS_MAIN_SCREENS.welcome
      ) {
        BackHandler.exitApp();
      } else {
        navigation.goBack();
      }
    }

    return true;
  }, [currentRouteName]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onPressBack
    );
    return () => {
      backHandler.remove();
    };
  }, [currentRouteName]);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: styles.container,
      }}
      initialRouteName={PATHS_MAIN_SCREENS.welcome}
    >
      {LIST_MAIN_SCREENS.map((mainScreen) => (
        <Stack.Screen
          key={`screen_${String(mainScreen.name)}`}
          name={mainScreen.name}
          component={mainScreen.component}
          options={options(mainScreen.headerShown, mainScreen.gestureEnabled)}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Navigators;
