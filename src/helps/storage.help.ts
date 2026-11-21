import AsyncStorage from "@react-native-async-storage/async-storage";
import { ZodSchema } from "zod";

export async function setDeviceStorage(
  key: string,
  value: string
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (_error) {
    return false;
  }
}

export async function getDeviceStorage<T>(
  key: string,
  schema?: ZodSchema<T>
): Promise<T | string | null> {
  try {
    const result = await AsyncStorage.getItem(key);
    if (!schema) return result;

    const resultParse = schema.safeParse(JSON.parse(result || ""));
    if (!resultParse.success) {
      if (__DEV__) console.warn(resultParse.error);
      return null;
    }
    return resultParse.data;
  } catch (_error) {
    return null;
  }
}

export async function deleteDeviceStorage(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (_error) {
    return false;
  }
}
