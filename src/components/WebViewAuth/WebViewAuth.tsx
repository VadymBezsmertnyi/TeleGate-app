import React, { useState, useRef, useEffect, useCallback, FC } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheetModal, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { WebViewErrorEvent } from "react-native-webview/lib/RNCWebViewNativeComponent";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// styles
import colors from "../../styles/colors";
import styles from "./WebViewAuth.styles";

interface WebViewAuthProps {
  visible: boolean;
  url: string;
  onClose: () => void;
  onNavigationStateChange?: (url: string) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = 80; // Висота хедера
const WEBVIEW_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - 100; // Висота екрану мінус хедер мінус відступи

const WebViewAuth: FC<WebViewAuthProps> = ({
  visible,
  url,
  onClose,
  onNavigationStateChange,
}) => {
  const { i18n } = useLocalesProvider();
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authCompleted, setAuthCompleted] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setIsNavigating(navState.loading);

    if (navState.url.startsWith("telegate://")) {
      setAuthCompleted(true);
      setIsNavigating(false);
      onNavigationStateChange?.(navState.url);
      setTimeout(() => closeBottomSheet(), 50);
      return false;
    }

    if (
      navState.url.includes("/auth-telegram/redirect?") &&
      navState.url.includes("id=") &&
      navState.url.includes("hash=")
    ) {
      try {
        const url = new URL(navState.url);
        const params = url.searchParams;

        const id = params.get("id");
        const username = params.get("username");
        const firstName = params.get("first_name");
        const lastName = params.get("last_name");
        const photoUrl = params.get("photo_url");
        const authDate = params.get("auth_date");
        const hash = params.get("hash");

        if (id && hash && authDate) {
          const deepLink = `telegate://auth-success?token=token_${id}_${Date.now()}&userId=${id}&username=${
            username || ""
          }&firstName=${firstName || ""}&lastName=${lastName || ""}&photoUrl=${
            photoUrl || ""
          }`;

          setAuthCompleted(true);
          setIsNavigating(false);
          onNavigationStateChange?.(deepLink);
          setTimeout(() => closeBottomSheet(), 50);
          return false;
        }
      } catch (error) {
        console.warn("Error processing auth params:", error);
      }
    }

    if (navState.url.includes("/auth-telegram/redirect#tgAuthResult=")) {
      try {
        const url = new URL(navState.url);
        const fragment = url.hash.substring(1);
        const match = fragment.match(/tgAuthResult=([^&]+)/);

        if (match) {
          const encodedData = match[1];

          // Обробка відхилення авторизації
          if (encodedData === "ZmFsc2U") {
            setAuthCompleted(true);
            setIsNavigating(false);
            setLoading(false);
            setHasError(true);
            setErrorMessage(
              i18n._(
                "Telegram requires additional verification for security purposes."
              )
            );
            return false;
          }

          // Обробка успішної авторизації
          try {
            const decodedData = atob(encodedData);
            const authData = JSON.parse(decodedData);

            const deepLink = `telegate://auth-success?token=token_${
              authData.id
            }_${Date.now()}&userId=${authData.id}&username=${
              authData.username || ""
            }&firstName=${authData.first_name || ""}&lastName=${
              authData.last_name || ""
            }&photoUrl=${authData.photo_url || ""}`;

            setAuthCompleted(true);
            setIsNavigating(false);
            onNavigationStateChange?.(deepLink);
            setTimeout(() => closeBottomSheet(), 50);
            return false;
          } catch (decodeError) {
            console.warn("Error decoding auth result:", decodeError);
            setAuthCompleted(true);
            setIsNavigating(false);
            setLoading(false);
            setHasError(true);
            setErrorMessage(
              i18n._("Unable to process verification data. Please try again.")
            );
            return false;
          }
        }
      } catch (error) {
        console.warn("Error processing auth fragment:", error);
      }
    }

    if (
      Platform.OS === "android" &&
      authCompleted &&
      navState.url.includes("oauth.telegram.org/auth")
    ) {
      return false;
    }

    if (
      navState.url.includes("/auth-telegram/redirect") &&
      !navState.url.includes("?") &&
      !navState.url.includes("#") &&
      navState.navigationType === "formsubmit"
    )
      return true;
    if (navState.url.includes("/bot-telegram/connect")) return true;

    onNavigationStateChange?.(navState.url);
    return true;
  };

  const handleLoadStart = () => {
    setLoading(true);
    setIsNavigating(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setIsNavigating(false);
  };

  const handleError = (error: WebViewErrorEvent) => {
    setLoading(false);
    console.warn("WebView error:", error);
    setAuthCompleted(false);
    setHasError(true);
    setErrorMessage(
      i18n._("Unable to load verification page. Please try again.")
    );
  };

  const closeBottomSheet = () => {
    // Якщо авторизація ще не завершена і немає помилки, показуємо помилку
    if (!authCompleted && !hasError) {
      setHasError(true);
      setErrorMessage(i18n._("Verification was cancelled. Please try again."));
    }
    bottomSheetRef.current?.close();
  };

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage("");
    setAuthCompleted(false);
    setLoading(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        // Якщо WebView закривається під час авторизації, показуємо помилку
        if (!authCompleted && !hasError) {
          setHasError(true);
          setErrorMessage(
            i18n._("Verification was cancelled. Please try again.")
          );
        }
        onClose();
      }
    },
    [onClose, authCompleted, hasError]
  );

  useEffect(() => {
    if (visible) {
      setAuthCompleted(false);
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={["85%"]}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleStyle={styles.handleStyle}
      handleComponent={() => null}
    >
      <BottomSheetView
        style={[styles.contentContainer, { paddingBottom: bottom }]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{i18n._("Telegram Login")}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeBottomSheet}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.webViewContainer, { height: WEBVIEW_HEIGHT }]}>
          {(loading || isNavigating) && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.blue300} />
              <Text style={styles.loadingText}>
                {loading
                  ? i18n._("Loading Telegram...")
                  : isNavigating
                  ? i18n._("Redirecting...")
                  : i18n._("Loading...")}
              </Text>
              {isNavigating && (
                <Text style={styles.loadingSubtext}>
                  {i18n._("Please wait while we redirect you to Telegram")}
                </Text>
              )}
            </View>
          )}

          {hasError && (
            <View style={styles.errorContainer}>
              <View style={styles.errorIconContainer}>
                <Text style={styles.errorIcon}>🔒</Text>
              </View>
              <Text style={styles.errorTitle}>
                {i18n._("Additional Verification Required")}
              </Text>
              <Text style={styles.errorMessage}>
                {i18n._(
                  "Telegram requires additional verification for security purposes. This is a standard security measure to protect your account."
                )}
              </Text>
              <Text style={styles.errorSubtext}>
                {i18n._(
                  "Please try again to complete the verification process."
                )}
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
              >
                <Text style={styles.retryButtonText}>
                  {i18n._("Try Again")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeBottomSheet}
              >
                <Text style={styles.cancelButtonText}>{i18n._("Cancel")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {!hasError && (
            <WebView
              ref={webViewRef}
              source={{ uri: url }}
              onNavigationStateChange={handleNavigationStateChange}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onHttpError={(syntheticEvent) => {
                console.warn("WebView HTTP Error:", syntheticEvent.nativeEvent);
                setAuthCompleted(false);
                setHasError(true);
                setErrorMessage(
                  i18n._(
                    "Connection error. Please check your internet connection and try again."
                  )
                );
              }}
              style={styles.webView}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              allowsBackForwardNavigationGestures={true}
              mixedContentMode="compatibility"
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              allowsProtectedMedia={true}
              allowsFullscreenVideo={true}
              bounces={false}
              cacheEnabled={false}
              incognito={true}
              injectedJavaScript={`
              (function() {
                function processFragment() {
                  const fragment = window.location.hash.substring(1);
                  if (fragment.includes('tgAuthResult=')) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'fragment_detected',
                      fragment: fragment
                    }));
                  }
                }
                
                setTimeout(processFragment, 100);
                
                window.addEventListener('hashchange', processFragment);
              })();
            `}
              onMessage={(event) => {
                try {
                  const message = JSON.parse(event.nativeEvent.data);

                  if (message.type === "fragment_detected") {
                    const fragment = message.fragment;
                    const match = fragment.match(/tgAuthResult=([^&]+)/);

                    if (match) {
                      const encodedData = match[1];

                      if (encodedData === "ZmFsc2U") {
                        setAuthCompleted(true);
                        setIsNavigating(false);
                        setLoading(false);
                        setHasError(true);
                        setErrorMessage(
                          i18n._(
                            "Telegram requires additional verification for security purposes."
                          )
                        );
                        return;
                      }

                      try {
                        const decodedData = atob(encodedData);
                        const authData = JSON.parse(decodedData);

                        const deepLink = `telegate://auth-success?token=token_${
                          authData.id
                        }_${Date.now()}&userId=${authData.id}&username=${
                          authData.username || ""
                        }&firstName=${authData.first_name || ""}&lastName=${
                          authData.last_name || ""
                        }&photoUrl=${authData.photo_url || ""}`;

                        setAuthCompleted(true);
                        setIsNavigating(false);
                        onNavigationStateChange?.(deepLink);
                        setTimeout(() => closeBottomSheet(), 50);
                      } catch (decodeError) {
                        console.warn(
                          "Error decoding auth result:",
                          decodeError
                        );
                        setAuthCompleted(true);
                        setIsNavigating(false);
                        setLoading(false);
                        setHasError(true);
                        setErrorMessage(
                          i18n._(
                            "Unable to process verification data. Please try again."
                          )
                        );
                      }
                    }
                  }
                } catch (error) {
                  console.warn("Error parsing WebView message:", error);
                }
              }}
              onShouldStartLoadWithRequest={(request) => {
                if (request.url.startsWith("telegate://")) {
                  setAuthCompleted(true);
                  setIsNavigating(false);
                  onNavigationStateChange?.(request.url);
                  setTimeout(() => closeBottomSheet(), 50);
                  return false;
                }
                if (
                  request.url.includes("/auth-telegram/redirect#tgAuthResult=")
                )
                  return true;
                if (request.url.includes("/auth-telegram/redirect"))
                  return true;
                if (
                  Platform.OS === "android" &&
                  authCompleted &&
                  request.url.includes("oauth.telegram.org/auth")
                ) {
                  return false;
                }

                if (
                  request.url.startsWith(
                    "https://api.example.com"
                  ) ||
                  request.url.startsWith(
                    "http://api.example.com"
                  ) ||
                  request.url.startsWith("https://telegram.org") ||
                  request.url.startsWith("https://oauth.telegram.org") ||
                  request.url.startsWith("https://core.telegram.org") ||
                  request.url.startsWith("http://localhost") ||
                  request.url.includes("/bot-telegram/connect")
                )
                  return true;

                return true;
              }}
              userAgent="TeleGate-Mobile-WebView/1.0 (Expo)"
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default WebViewAuth;
