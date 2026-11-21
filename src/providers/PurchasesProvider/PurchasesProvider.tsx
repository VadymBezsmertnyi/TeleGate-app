import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  LogInResult,
  PURCHASES_ERROR_CODE,
  PurchasesError,
  PurchasesPackage,
  STOREKIT_VERSION,
} from "react-native-purchases";
import {
  getAnalytics,
  logEvent,
  logPurchase,
} from "@react-native-firebase/analytics";
import * as Application from "expo-application";
import * as Device from "expo-device";

// types
import { PurchasesOfferingsType } from "./PurchasesProvider.types";

// providers
import { useAuthProvider } from "../AuthProvider/AuthProvider";
import { usePushProvider } from "../PushProvider/PushProvider";

type PurchasesContext = {
  initialized: boolean;
  initializedLogIn: boolean;
  isWasTrial: boolean;
  isActiveSubscription: boolean;
  activeSubscription: PurchasesPackage | null;
  availablePackages: PurchasesPackage[];
  logInUser: LogInResult | null;
  buyPackageWithDiscount: (packageBuy: PurchasesPackage) => Promise<boolean>;
};

type PurchasesProviderProps = {
  children: React.ReactNode;
};

export const purchasesContext = createContext({} as PurchasesContext);

const PurchasesProvider: FunctionComponent<PurchasesProviderProps> = ({
  children,
}) => {
  const { user } = useAuthProvider();
  const { currentToken } = usePushProvider();
  const [initialized, setInitialized] = useState(false);
  const [initializedLogIn, setInitializedLogIn] = useState(false);
  const [logInUser, setLogInUser] = useState<LogInResult | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOfferingsType | null>(
    null
  );

  const userUUID = useMemo(() => (user ? user.id.toString() : null), [user]);

  const isWasTrial = useMemo(() => {
    if (!logInUser) return false;

    const all = Object.values(logInUser.customerInfo.entitlements.all);
    const trials = all.filter(
      (entitlement) => entitlement.periodType === "TRIAL"
    );
    const isExpirationDate = trials.some((trial) => {
      const date = trial.expirationDate;
      if (!date) return false;

      const dateMills = new Date(date).getTime();
      const now = new Date().getTime();
      const diff = dateMills - now;
      return diff < 0;
    });

    return isExpirationDate;
  }, [logInUser]);

  const isActiveSubscription = useMemo(() => {
    if (!logInUser) return false;

    return logInUser.customerInfo.activeSubscriptions.length > 0;
  }, [logInUser]);

  const availablePackages = useMemo(() => {
    if (!offerings || !offerings.current) return [];
    const packages = offerings.current.availablePackages || [];

    return packages.sort((a, b) => {
      const aIsPro = a.product.identifier.includes("pro");
      const aIsUltimate = a.product.identifier.includes("ultimate");
      const bIsPro = b.product.identifier.includes("pro");
      const bIsUltimate = b.product.identifier.includes("ultimate");

      if (aIsPro && bIsUltimate) return -1;
      if (aIsUltimate && bIsPro) return 1;

      return 0;
    });
  }, [offerings]);

  const activeSubscriptionId = useMemo(
    () =>
      logInUser?.customerInfo.activeSubscriptions.find(
        (subscription) => subscription
      ),
    [logInUser]
  );

  const activeSubscription = useMemo(
    () =>
      availablePackages.find(
        (packageBuy) =>
          (activeSubscriptionId &&
            packageBuy.product.identifier.includes(activeSubscriptionId)) ||
          activeSubscriptionId?.includes(packageBuy.product.identifier)
      ) || null,
    [activeSubscriptionId, availablePackages]
  );

  const startSetAttributesRevenueCat = async () => {
    const deviceId =
      Platform.OS === "android"
        ? Application.getAndroidId()
        : await Application.getIosIdForVendorAsync();
    const attributes: Record<string, string | null> = {
      $idfv: Platform.OS === "android" ? null : deviceId,
      $androidId: Platform.OS === "android" ? deviceId : null,
      $deviceVersion: Device.osVersion,
    };
    await Purchases.setAttributes(attributes);
    await Purchases.setDisplayName(user?.username || user?.first_name || null);
    await Purchases.setPushToken(currentToken || null);
  };

  const onLogIn = async () => {
    if (!userUUID) return;

    try {
      const logIn = await Purchases.logIn(userUUID);
      setLogInUser(logIn);
    } catch (error) {
      if (__DEV__) console.warn("Error logging in", error);
    } finally {
      setInitializedLogIn(true);
    }
  };

  const onLogOut = async () => {
    try {
      await Purchases.logOut();
      setLogInUser(null);
    } catch (error) {
      if (__DEV__) console.warn("Error logging out", error);
    }
  };

  const getOfferings = async () => {
    try {
      const offerings =
        (await Purchases.getOfferings()) as PurchasesOfferingsType;
      setOfferings(offerings);
    } catch (error) {
      if (__DEV__) console.warn("Error getting offerings", error);
    }
  };

  const setInitialPurchases = async () => {
    try {
      await Purchases.setLogLevel(LOG_LEVEL.INFO);
      if (Platform.OS === "ios")
        Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_APPLE,
          appUserID: userUUID,
          storeKitVersion: STOREKIT_VERSION.STOREKIT_2,
        });
      else
        Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_GOOGLE,
          appUserID: userUUID,
        });
    } catch (error) {
      if (__DEV__) console.warn("Error setting up Purchases", error);
    } finally {
      getOfferings();
      setInitialized(true);
    }
  };

  const buyPackage = async (packageBuy: PurchasesPackage) => {
    try {
      const result = await Purchases.purchasePackage(packageBuy);
      if (logInUser)
        setLogInUser({
          ...logInUser,
          customerInfo: result.customerInfo,
        });
      else
        setLogInUser({
          created: true,
          customerInfo: result.customerInfo,
        });
      logPurchase(getAnalytics(), {
        value: packageBuy.product.price,
        currency: packageBuy.product.currencyCode,
        items: [
          {
            item_id: packageBuy.product.identifier,
            item_name: packageBuy.product.title,
            item_category: packageBuy.product.description,
            price: packageBuy.product.price,
            quantity: 1,
          },
        ],
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const notError = "Purchase was cancelled";
        const errorRevenueCat = error as unknown as PurchasesError;
        const isNotError =
          error.message
            .toLocaleLowerCase()
            .includes(notError.toLocaleLowerCase()) ||
          errorRevenueCat.code ===
            PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR;
        if (isNotError) return false;
        Alert.alert(error.name, error.message);
        logEvent(getAnalytics(), "ErrorBuyPackage", {
          error: error.message,
          name: error.name,
        });
        return false;
      }
      logEvent(getAnalytics(), "ErrorBuyPackageUnknown", {
        error,
      });
      return false;
    }
  };

  const buyPackageWithDiscount = async (packageBuy: PurchasesPackage) => {
    try {
      const discount =
        packageBuy.product.discounts?.[0] && !isWasTrial
          ? await Purchases.getPromotionalOffer(
              packageBuy.product,
              packageBuy.product.discounts?.[0]
            )
          : null;

      const result =
        Platform.OS === "ios" && discount && !isWasTrial
          ? await Purchases.purchaseDiscountedPackage(packageBuy, discount)
          : await Purchases.purchasePackage(packageBuy);
      if (logInUser)
        setLogInUser({
          ...logInUser,
          customerInfo: result.customerInfo,
        });
      else
        setLogInUser({
          created: true,
          customerInfo: result.customerInfo,
        });
      logPurchase(getAnalytics(), {
        value: packageBuy.product.price,
        currency: packageBuy.product.currencyCode,
        items: [
          {
            item_id: packageBuy.product.identifier,
            item_name: packageBuy.product.title,
            item_category: packageBuy.product.description,
            price: packageBuy.product.price,
            quantity: 1,
          },
        ],
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const notError = "Purchase was cancelled";
        const notDiscountError = "The User is ineligible for that action";
        const errorRevenueCat = error as unknown as PurchasesError;
        const isNotError =
          error.message
            .toLocaleLowerCase()
            .includes(notError.toLocaleLowerCase()) ||
          errorRevenueCat.code ===
            PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR;
        const isNotDiscountError =
          error.message
            .toLocaleLowerCase()
            .includes(notDiscountError.toLocaleLowerCase()) ||
          errorRevenueCat.code ===
            PURCHASES_ERROR_CODE.INVALID_PROMOTIONAL_OFFER_ERROR;
        if (isNotDiscountError) {
          const buyNotDiscount = await buyPackage(packageBuy);
          return buyNotDiscount;
        }
        if (isNotError) return false;

        Alert.alert(error.name, error.message);
        logEvent(getAnalytics(), "ErrorBuyPackage", {
          error: error.message,
          name: error.name,
        });
        return false;
      }

      const title = "Error on buy package with discount";
      logEvent(getAnalytics(), "ErrorBuyPackageUnknown", {
        error,
      });
      return false;
    }
  };

  useEffect(() => {
    if (!userUUID) {
      if (logInUser) onLogOut();
      setInitializedLogIn(true);
      return;
    }

    setInitialPurchases().then(() => {
      onLogIn();
    });
  }, [userUUID]);

  useEffect(() => {
    if (!initialized || !currentToken) return;
    startSetAttributesRevenueCat();
  }, [initialized, currentToken]);

  return (
    <purchasesContext.Provider
      value={{
        initialized,
        initializedLogIn,
        isWasTrial,
        isActiveSubscription,
        activeSubscription,
        availablePackages,
        logInUser,
        buyPackageWithDiscount,
      }}
    >
      {children}
    </purchasesContext.Provider>
  );
};

export const usePurchasesProvider = () => useContext(purchasesContext);

export default PurchasesProvider;
