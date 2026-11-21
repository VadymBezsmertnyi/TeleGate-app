import React, { FunctionComponent, useContext } from "react";
import { ZodSchema } from "zod";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import * as SecureStore from "expo-secure-store";

// helpers
import { getApiUrl } from "./ApiProvider.helps";

// constants
import { SECURE_STORE_KEYS } from "../AuthProvider/AuthProvider.constants";

type ApiType = <T>(
  url: string,
  configurations?: {
    config?: AxiosRequestConfig | null;
    schema?: ZodSchema<T>;
    type?: "api";
  }
) => Promise<T | null>;

type ApiContext = {
  api: ApiType;
};

type ApiProviderProps = {
  children: React.ReactNode;
};

export const apiContext = React.createContext({} as ApiContext);

const ApiProvider: FunctionComponent<ApiProviderProps> = ({ children }) => {
  const urlApi = `${getApiUrl()}`;

  const api: ApiType = async (url, configurations = {}) => {
    const { config, schema } = configurations;
    const queryParams = qs.stringify(
      {},
      {
        addQueryPrefix: !url.includes("?"),
      }
    );
    const currentUrl = url.includes("http")
      ? url
      : `${urlApi}${url}${url.includes("?") ? `&${queryParams}` : queryParams}`;

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((config?.headers as Record<string, string>) || {}),
      };
      const token = await SecureStore.getItemAsync(
        SECURE_STORE_KEYS.ACCESS_TOKEN
      );
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await axios(currentUrl, {
        ...config,
        headers,
      });
      if (!schema) return response.data;

      const isCurrent = schema.safeParse(response.data);
      if (isCurrent.success) return isCurrent.data;
      if (__DEV__) {
        console.warn("currentUrl", currentUrl);
        console.warn("config", config);
        console.warn("response.data", response.data);
        console.warn("isCurrent", JSON.stringify(isCurrent.error, null, 2));
      }

      return null;
    } catch (error: any) {
      if (__DEV__) {
        console.warn("currentUrl", currentUrl);
        console.warn("error", error);
      }
      throw error;
    }
  };

  return <apiContext.Provider value={{ api }}>{children}</apiContext.Provider>;
};

export const useApiProvider = () => useContext(apiContext);

export default ApiProvider;
