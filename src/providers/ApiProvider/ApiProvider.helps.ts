import { Platform } from "react-native";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";

export const getApiUrl = (isProduction: boolean = false) => {
  const herokuServer = process.env.EXPO_PUBLIC_BACKEND_API_BASE_URL as string;
  if (__DEV__ && !isProduction) {
    const baseUrl =
      Platform.OS === "android" || Device.isDevice
        ? "https://api.example.com/api/"
        : "http://localhost:5008/api/";
    return baseUrl;
  }
  return herokuServer;
};

export const getDeviceId = async () => {
  if (Platform.OS === "android") return Application.getAndroidId();

  const deviceId = await SecureStore.getItemAsync("deviceId");

  if (!deviceId) {
    const newDeviceId = await Application.getIosIdForVendorAsync();
    if (newDeviceId) await SecureStore.setItemAsync("deviceId", newDeviceId);
    return newDeviceId;
  }

  return deviceId;
};
