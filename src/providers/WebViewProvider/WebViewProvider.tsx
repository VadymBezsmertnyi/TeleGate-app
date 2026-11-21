import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { WebView } from "react-native-webview";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// styles
import styles from "./WebViewProvider.styles";
import colors from "../../styles/colors";

type WebViewProviderProps = {
  children: ReactNode;
};

type WebViewInfo = {
  id: string;
  url: string;
  title: string;
};

type WebViewContextType = {
  openWebView: (info: WebViewInfo) => void;
  closeWebView: () => void;
};

const webViewContext = createContext<WebViewContextType>(
  {} as WebViewContextType
);

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = 80;
const WEBVIEW_HEIGHT =
  SCREEN_HEIGHT -
  HEADER_HEIGHT -
  (Platform.select({ ios: 50, android: 10 }) || 0);

const WebViewProvider: FC<WebViewProviderProps> = ({ children }) => {
  const [info, setInfo] = useState<WebViewInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const openWebView = (info: WebViewInfo) => {
    setInfo(info);
    setIsLoading(true);
  };

  const closeWebView = () => {
    setInfo(null);
  };

  useEffect(() => {
    if (info) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  }, [info]);

  return (
    <webViewContext.Provider
      value={{
        openWebView,
        closeWebView,
      }}
    >
      {children}
      {info ? (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onDismiss={closeWebView}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
          handleComponent={() => null}
        >
          <BottomSheetView style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{info.title}</Text>
              <TouchableOpacity
                onPress={closeWebView}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.gray400} />
              </TouchableOpacity>
            </View>
            <View style={[styles.webViewContainer, { height: WEBVIEW_HEIGHT }]}>
              <WebView
                source={{ uri: info.url }}
                style={styles.webView}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={true}
                allowsBackForwardNavigationGestures={false}
                allowsLinkPreview={false}
                cacheEnabled={false}
                incognito={true}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn("WebView error:", nativeEvent);
                  setIsLoading(false);
                }}
              />
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.blue500} />
                </View>
              )}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      ) : null}
    </webViewContext.Provider>
  );
};

export const useWebViewProvider = () => useContext(webViewContext);

export default WebViewProvider;
