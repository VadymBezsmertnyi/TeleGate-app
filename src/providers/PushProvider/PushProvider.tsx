import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
  useRef,
} from "react";
import { Platform } from "react-native";
import {
  getMessaging,
  onMessage,
  onTokenRefresh,
  requestPermission,
  getToken,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";
import * as Device from "expo-device";

// Providers
import { useAuthProvider } from "../AuthProvider/AuthProvider";
import { useApiProvider } from "../ApiProvider/ApiProvider";

// Constants
import PATHS from "../paths.constants";

export type PushContextType = {
  refreshToken: () => Promise<void>;
  isInitialized: boolean;
  currentToken: string | null;
};

export type PushProviderProps = {
  children: React.ReactNode;
};

const PushContext = createContext<PushContextType>({} as PushContextType);

const PushProvider: FunctionComponent<PushProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuthProvider();
  const { api } = useApiProvider();
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const isRefreshingRef = useRef(false);

  const getPlatform = (): "ios" | "android" | "web" => {
    if (Platform.OS === "ios") return "ios";
    if (Platform.OS === "android") return "android";
    return "web";
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const messaging = getMessaging();
      const authStatus = await requestPermission(messaging);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      return enabled;
    } catch (error) {
      console.warn("Failed to request messaging permissions:", error);
      return false;
    }
  };

  const sendTokenToServer = async (
    pushToken: string,
    platform: "ios" | "android" | "web"
  ) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      const deviceBrand = Device.brand || "unknown";
      const deviceModel = Device.modelName || "unknown";
      const deviceName = Device.deviceName || "unknown";
      const isSimulator = Device.isDevice ? false : true;

      await api(PATHS.api.users.pushTokens.LIST, {
        config: {
          method: "POST",
          data: {
            token: pushToken,
            platform,
            deviceBrand,
            deviceModel,
            deviceName,
            isSimulator,
          },
        },
      });
    } catch (error) {
      console.warn("Failed to send push token to server:", error);
    }
  };

  const deleteTokenFromServer = async (pushToken: string) => {
    if (!isAuthenticated) return;

    try {
      await api(PATHS.api.users.pushTokens.BY_TOKEN(pushToken), {
        config: {
          method: "DELETE",
        },
      });
    } catch (error) {
      console.warn("Failed to delete push token from server:", error);
    }
  };

  const refreshToken = async (): Promise<void> => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;

    try {
      if (!isAuthenticated || !user?.id) return;

      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      const messaging = getMessaging();
      const firebaseToken = await getToken(messaging);

      setCurrentToken(firebaseToken);
      if (firebaseToken !== currentToken) {
        const platform = getPlatform();
        await sendTokenToServer(firebaseToken, platform);
        setCurrentToken(firebaseToken);
      }
    } catch (error) {
      console.warn("Failed to refresh push token:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      user?.id &&
      !isInitialized &&
      !isRefreshingRef.current
    ) {
      refreshToken().then(() => setIsInitialized(true));
    } else if (!isAuthenticated) {
      if (currentToken) {
        deleteTokenFromServer(currentToken);
        setCurrentToken(null);
      }
      setIsInitialized(false);
    }
  }, [isAuthenticated, user?.id, isInitialized, currentToken]);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const messaging = getMessaging();
    const unsubscribe = onTokenRefresh(messaging, refreshToken);
    return unsubscribe;
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, async (remoteMessage) => {});

    return unsubscribe;
  }, []);

  const contextValue: PushContextType = {
    refreshToken,
    isInitialized,
    currentToken,
  };

  return (
    <PushContext.Provider value={contextValue}>{children}</PushContext.Provider>
  );
};

export const usePushProvider = () => useContext(PushContext);

export default PushProvider;
