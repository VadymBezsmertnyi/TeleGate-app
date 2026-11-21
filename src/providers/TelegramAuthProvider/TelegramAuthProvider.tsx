import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";

// Components
import WebViewAuth from "../../components/WebViewAuth/WebViewAuth";

// Types and schemas
import { AuthResultT, UserPublicT } from "../AuthProvider/AuthProvider.types";

// Providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { useAuthProvider } from "../AuthProvider/AuthProvider";

// Helpers
import { getApiUrl } from "../ApiProvider/ApiProvider.helps";

// Constants
import { buildAuthUrl } from "./TelegramAuthProvider.constants";

type TelegramAuthContext = {
  startTelegramAuth: () => Promise<AuthResultT | null>;
  isAuthenticating: boolean;
};

type TelegramAuthProviderProps = {
  children: React.ReactNode;
};

const BACKEND_URL = getApiUrl(true);

export const telegramAuthContext = createContext({} as TelegramAuthContext);

const TelegramAuthProvider: FunctionComponent<TelegramAuthProviderProps> = ({
  children,
}) => {
  const { login: authLogin } = useAuthProvider();
  const { i18n } = useLocalesProvider();
  const [authPromiseResolve, setAuthPromiseResolve] = useState<
    ((result: AuthResultT | null) => void) | null
  >(null);
  const [showWebView, setShowWebView] = useState(false);
  const [authUrl, setAuthUrl] = useState<string>("");

  const startTelegramAuth = async (): Promise<AuthResultT | null> => {
    if (!BACKEND_URL) {
      Toast.show({
        type: "error",
        text1: i18n._("Configuration Error"),
        text2: i18n._("Please contact the developers about this issue."),
      });
      return null;
    }

    return new Promise((resolve) => {
      setAuthPromiseResolve(() => resolve);

      const timeoutId = setTimeout(() => {
        setShowWebView(false);
        Toast.show({
          type: "error",
          text1: i18n._("Authentication Timeout"),
          text2: i18n._("Please try again."),
        });
        setAuthPromiseResolve(null);
        resolve(null);
      }, 120000);

      const url = buildAuthUrl(BACKEND_URL);

      setAuthUrl(url);
      setShowWebView(true);

      const originalResolve = authPromiseResolve;
      setAuthPromiseResolve((result: AuthResultT | null) => {
        clearTimeout(timeoutId);
        if (originalResolve) {
          originalResolve(result);
        } else {
          resolve(result);
        }
      });
    });
  };

  const completeAuthentication = async (
    authResult: AuthResultT
  ): Promise<void> => {
    try {
      await authLogin(authResult);
      setShowWebView(false);
    } catch (error) {
      console.warn("Failed to complete authentication:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Authentication Failed"),
        text2: i18n._("Failed to save authentication data"),
      });
    }
  };

  const handleWebViewNavigation = (url: string) => {
    if (url.startsWith("telegate://")) handleDeepLink(url);
  };

  const handleWebViewClose = () => {
    setTimeout(() => {
      setShowWebView(false);

      if (showWebView && authPromiseResolve) {
        authPromiseResolve(null);
        setAuthPromiseResolve(null);
      }
    }, 100);
  };

  const handleDeepLink = (url: string) => {
    const parsedUrl = Linking.parse(url);
    if (showWebView) setTimeout(() => setShowWebView(false), 50);

    if (parsedUrl.hostname === "auth-success") {
      const { token, userId, username, firstName, lastName, photoUrl } =
        parsedUrl.queryParams || {};

      if (token && userId) {
        const decodedToken = decodeURIComponent(token as string);
        const user: UserPublicT = {
          id: parseInt(userId as string),
          username: (username as string) || undefined,
          first_name: (firstName as string) || undefined,
          last_name: (lastName as string) || undefined,
          photo_url: (photoUrl as string) || undefined,
        };

        const authResult: AuthResultT = {
          accessToken: decodedToken,
          user,
        };

        completeAuthentication(authResult)
          .then(() => {
            if (authPromiseResolve) {
              authPromiseResolve(authResult);
              setAuthPromiseResolve(null);
            }
          })
          .catch((error) => {
            console.warn("Authentication completion failed:", error);
            Toast.show({
              type: "error",
              text1: i18n._("Authentication Failed"),
              text2: i18n._(
                "Failed to complete authentication. Tap to try again."
              ),
              onPress: () => {
                startTelegramAuth();
              },
            });
            if (authPromiseResolve) {
              authPromiseResolve(null);
              setAuthPromiseResolve(null);
            }
          });
      } else {
        Toast.show({
          type: "error",
          text1: i18n._("Authentication Failed"),
          text2: i18n._("Invalid response from server. Tap to try again."),
          onPress: () => {
            // Якщо користувач натисне на повідомлення, спробуємо ще раз
            startTelegramAuth();
          },
        });
        if (authPromiseResolve) {
          authPromiseResolve(null);
          setAuthPromiseResolve(null);
        }
      }
    } else if (parsedUrl.hostname === "auth-error") {
      const { error } = parsedUrl.queryParams || {};
      let errorMessage = i18n._("Please try again or contact support.");

      switch (error) {
        case "auth_denied":
          errorMessage = i18n._(
            "Authentication was cancelled or denied. Please try again."
          );
          break;
        case "parse_error":
          errorMessage = i18n._(
            "Invalid authentication response. Please try again."
          );
          break;
        case "missing_params":
          errorMessage = i18n._(
            "Missing authentication parameters. Please try again."
          );
          break;
        case "invalid_signature":
          errorMessage = i18n._(
            "Invalid authentication signature. Please try again."
          );
          break;
        case "expired":
          errorMessage = i18n._(
            "Authentication data has expired. Please try again."
          );
          break;
        case "server_config":
          errorMessage = i18n._(
            "Server configuration error. Please try again."
          );
          break;
        default:
          errorMessage = i18n._("Please try again or contact support.");
      }

      Toast.show({
        type: "error",
        text1: i18n._("Authentication Failed"),
        text2: errorMessage + " Tap to try again.",
        onPress: () => {
          // Якщо користувач натисне на повідомлення, спробуємо ще раз
          if (error === "auth_denied") {
            startTelegramAuth();
          }
        },
      });
      if (authPromiseResolve) {
        authPromiseResolve(null);
        setAuthPromiseResolve(null);
      }
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  // Computed state based on data
  const isAuthenticating = showWebView && !!authPromiseResolve;

  const contextValue: TelegramAuthContext = {
    startTelegramAuth,
    isAuthenticating,
  };

  return (
    <telegramAuthContext.Provider value={contextValue}>
      {children}

      {showWebView && (
        <WebViewAuth
          visible={showWebView}
          url={authUrl}
          onClose={handleWebViewClose}
          onNavigationStateChange={handleWebViewNavigation}
        />
      )}
    </telegramAuthContext.Provider>
  );
};

export const useTelegramAuthProvider = () => useContext(telegramAuthContext);

export default TelegramAuthProvider;
