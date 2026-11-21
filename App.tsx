import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";

// types
import { RootAllScreensParamListT } from "./src/navigators/navigators.types";

// providers
import ApiProvider from "./src/providers/ApiProvider/ApiProvider";
import LocalesProvider from "./localization/localization.provider";
import UpdateProvider from "./src/providers/UpdateProvider/UpdateProvider";
import KeyboardProvider from "./src/providers/KeyboardProvider/KeyboardProvider";
import AuthProvider from "./src/providers/AuthProvider/AuthProvider";
import TelegramAuthProvider from "./src/providers/TelegramAuthProvider/TelegramAuthProvider";
import ThemeProvider from "./src/providers/ThemeProvider/ThemeProvider";
import GroupsProvider from "./src/providers/GroupsProvider/GroupsProvider";
import GroupSubscriptionsProvider from "./src/providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider";
import MembersProvider from "./src/providers/MembersProvider/MembersProvider";
import MessageTemplatesProvider from "./src/providers/MessageTemplatesProvider/MessageTemplatesProvider";
import BotSendMessagesProvider from "./src/providers/BotSendMessagesProvider/BotSendMessagesProvider";
import PushProvider from "./src/providers/PushProvider/PushProvider";
import WebViewProvider from "./src/providers/WebViewProvider/WebViewProvider";
import PurchasesProvider from "./src/providers/PurchasesProvider/PurchasesProvider";
import MemberSubscriptionsProvider from "./src/providers/MemberSubscriptionsProvider/MemberSubscriptionsProvider";

// navigators
import Navigators from "./src/navigators/navigators";

// styles
import styles from "./App.styles";

if (__DEV__) import("./ReactotronConfig");

SplashScreen.preventAutoHideAsync();

const App: FunctionComponent = () => {
  const [currentRouteName, setCurrentRouteName] = useState<string | null>(null);
  const navigationRef =
    useRef<NavigationContainerRef<RootAllScreensParamListT>>(null);

  useEffect(() => {
    const customTextProps = {
      allowFontScaling: false,
    };
    setCustomText(customTextProps);
    setCustomTextInput(customTextProps);
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <BottomSheetModalProvider>
            <ApiProvider>
              <KeyboardProvider>
                <LocalesProvider>
                  <AuthProvider>
                    <PushProvider>
                      <PurchasesProvider>
                        <GroupsProvider>
                          <GroupSubscriptionsProvider>
                            <MemberSubscriptionsProvider>
                              <MembersProvider>
                                <MessageTemplatesProvider>
                                  <BotSendMessagesProvider>
                                    <UpdateProvider>
                                      <TelegramAuthProvider>
                                        <WebViewProvider>
                                          <NavigationContainer
                                            ref={navigationRef}
                                            onStateChange={() => {
                                              const nameRoute =
                                                navigationRef.current?.getCurrentRoute()
                                                  ?.name;
                                              if (nameRoute) {
                                                setCurrentRouteName(nameRoute);
                                              }
                                            }}
                                          >
                                            <Navigators
                                              currentRouteName={
                                                currentRouteName
                                              }
                                              navigation={navigationRef.current}
                                            />
                                          </NavigationContainer>
                                        </WebViewProvider>
                                      </TelegramAuthProvider>
                                    </UpdateProvider>
                                  </BotSendMessagesProvider>
                                </MessageTemplatesProvider>
                              </MembersProvider>
                            </MemberSubscriptionsProvider>
                          </GroupSubscriptionsProvider>
                        </GroupsProvider>
                      </PurchasesProvider>
                    </PushProvider>
                  </AuthProvider>
                </LocalesProvider>
              </KeyboardProvider>
            </ApiProvider>
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
