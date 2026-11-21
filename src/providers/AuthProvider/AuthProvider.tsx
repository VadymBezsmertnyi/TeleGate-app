import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
  useMemo,
} from "react";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

// Types and schemas
import { AuthResultT, UserPublicT } from "./AuthProvider.types";
import { UserPublicSchema } from "./AuthProvider.schemas";

// Constants
import { SECURE_STORE_KEYS, AUTH_CONFIG } from "./AuthProvider.constants";

// Providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { useApiProvider } from "../ApiProvider/ApiProvider";

// Paths
import PATHS from "../paths.constants";

export enum EAuthState {
  Idle = "idle",
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
  Error = "error",
}

export type AuthContextType = {
  authState: EAuthState;
  user: UserPublicT | null;
  token: string | null;
  login: (authResult: AuthResultT) => Promise<void>;
  logout: () => Promise<void>;
  autoLogin: () => Promise<boolean>;
  refreshUser: () => Promise<UserPublicT | null>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuper: boolean;
  isPro: boolean;
  isUltimate: boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const { i18n } = useLocalesProvider();
  const { api } = useApiProvider();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserPublicT | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => !!(user && token), [user, token]);

  const isSuper = useMemo(() => {
    return user?.is_super || false;
  }, [user?.is_super]);

  const isPro = useMemo(() => {
    if (isSuper) return true;
    if (!user?.subscription_type) return false;
    return (
      user.subscription_type === "pro" || user.subscription_type === "ultimate"
    );
  }, [isSuper, user?.subscription_type]);

  const isUltimate = useMemo(() => {
    if (isSuper) return true;
    if (!user?.subscription_type) return false;
    return user.subscription_type === "ultimate";
  }, [isSuper, user?.subscription_type]);

  const authState: EAuthState = useMemo(
    () =>
      isLoading
        ? EAuthState.Loading
        : isAuthenticated
        ? EAuthState.Authenticated
        : EAuthState.Unauthenticated,
    [isLoading, isAuthenticated]
  );

  const login = async (authResult: AuthResultT): Promise<void> => {
    try {
      await SecureStore.setItemAsync(
        SECURE_STORE_KEYS.ACCESS_TOKEN,
        authResult.accessToken
      );
      await SecureStore.setItemAsync(
        SECURE_STORE_KEYS.USER_DATA,
        JSON.stringify(authResult.user)
      );
      setToken(authResult.accessToken);
      setUser(authResult.user);
      Toast.show({
        type: "success",
        text1: i18n._("Authentication Successful"),
        text2: i18n._("Welcome back!"),
      });
    } catch (error) {
      console.warn("Login error:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Authentication Failed"),
        text2: i18n._("Failed to save authentication data"),
      });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.USER_DATA);
      setToken(null);
      setUser(null);
      Toast.show({
        type: "info",
        text1: i18n._("Logged Out"),
        text2: i18n._("You have been logged out"),
      });
    } catch (error) {
      console.warn("Logout error:", error);
    }
  };

  const refreshUser = async (): Promise<UserPublicT | null> => {
    try {
      if (!token) return null;

      const response = await api(PATHS.api.users.me, {
        config: { method: "GET" },
        schema: UserPublicSchema,
      });

      if (response) {
        setUser(response);
        await SecureStore.setItemAsync(
          SECURE_STORE_KEYS.USER_DATA,
          JSON.stringify(response)
        );
        return response;
      }

      return null;
    } catch (error) {
      console.warn("Failed to refresh user:", error);
      // Token might be invalid, logout
      await logout();
      return null;
    }
  };

  const autoLogin = async (): Promise<boolean> => {
    try {
      const storedToken = await SecureStore.getItemAsync(
        SECURE_STORE_KEYS.ACCESS_TOKEN
      );

      if (!storedToken) {
        setIsLoading(false);
        return false;
      }

      setToken(storedToken);

      const response = await api(PATHS.api.users.me, {
        config: { method: "GET" },
        schema: UserPublicSchema,
      });

      if (response) {
        setUser(response);
        await SecureStore.setItemAsync(
          SECURE_STORE_KEYS.USER_DATA,
          JSON.stringify(response)
        );
        setIsLoading(false);
        return true;
      } else {
        // Token is invalid, clear it
        await logout();
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.warn("Auto login error:", error);
      await logout();
      setIsLoading(false);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    authState,
    user,
    token,
    login,
    logout,
    autoLogin,
    refreshUser,
    isAuthenticated,
    isLoading,
    isSuper,
    isPro,
    isUltimate,
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);

export default AuthProvider;
