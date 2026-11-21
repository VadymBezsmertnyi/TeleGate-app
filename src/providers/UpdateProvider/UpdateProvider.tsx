import React, {
  createContext,
  FunctionComponent,
  JSX,
  useContext,
  useMemo,
  useState,
} from "react";
import { Linking, Platform, Text, View, TouchableOpacity } from "react-native";
import * as Application from "expo-application";
import { z } from "zod";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// components
import ModalUniversal from "../../components/ModalUniversal/ModalUniversal";

// constants
import PATHS from "../paths.constants";

// styles
import styles from "./UpdateProvider.styles";

type UpdateContext = {
  checkNewVersion: () => void;
};

type UpdateProviderProps = {
  children: React.ReactNode;
};

export const updateContext = createContext({} as UpdateContext);

const getMainVersion = (version: string) => {
  const [major, minor, patch] = version.split(".").map(Number) || [1, 0, 0];
  return major * 10000 + minor * 100 + patch;
};

const UpdateProvider: FunctionComponent<UpdateProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();
  const [isShowModal, setIsShowModal] = useState(false);

  const appVersion = useMemo(
    () => getMainVersion(Application.nativeApplicationVersion || "1.0.0"),
    []
  );

  const getLatestIOSVersion = async () => {
    try {
      const response = await api(
        `${PATHS.external.itunesLookup}?bundleId=${Application.applicationId}`,
        {
          schema: z.object({
            results: z.array(
              z.object({
                version: z.string(),
              })
            ),
          }),
        }
      );
      if (!response) return appVersion;

      const latestVersion = response.results[0]?.version || null;
      if (!latestVersion) return appVersion;

      const currentVersion = getMainVersion(latestVersion);
      return currentVersion;
    } catch (error) {
      if (__DEV__) console.warn("Error on get latest iOS version", error);
      return appVersion;
    }
  };

  const getLatestAndroidVersion = async () => {
    try {
      const response = await api(
        `${PATHS.external.playGoogleDetails}?id=${Application.applicationId}`,
        {
          schema: z.string(),
        }
      );
      if (!response) return appVersion;

      const match = response.match(/Current Version.*?>([\d.]+)<\/span>/);
      const latestVersion = match ? match[1] : null;
      if (!latestVersion) return appVersion;

      const currentVersion = getMainVersion(latestVersion);
      return currentVersion;
    } catch (error) {
      if (__DEV__) console.warn("Error on get latest Android version", error);
      return appVersion;
    }
  };

  const checkNewVersion = async () => {
    try {
      const latestVersion =
        Platform.OS === "ios"
          ? await getLatestIOSVersion()
          : await getLatestAndroidVersion();
      const timeout = setTimeout(() => {
        setIsShowModal(latestVersion > appVersion);
      }, 500);
      return () => clearTimeout(timeout);
    } catch (error) {
      if (__DEV__) console.warn("Error on should show modal", error);
    }
  };

  const onUpdate = async () => {
    try {
      const url = Platform.select({
        ios: `https://apps.apple.com/app/id${Application.applicationId}`,
        android: `https://play.google.com/store/apps/details?id=${Application.applicationId}`,
      });
      if (!url) return;

      await Linking.openURL(url);
    } catch (error) {
      if (__DEV__) console.warn("Error on update app", error);
    } finally {
      setIsShowModal(false);
    }
  };

  return (
    <updateContext.Provider value={{ checkNewVersion }}>
      {children}
      {isShowModal && (
        <ModalUniversal visible onClose={() => setIsShowModal(false)}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>There is a new version available</Text>
            <TouchableOpacity onPress={onUpdate} style={styles.buttonUpdate}>
              <Text style={styles.buttonUpdateText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ModalUniversal>
      )}
    </updateContext.Provider>
  );
};

export const useUpdateProvider = () => useContext(updateContext);

export default UpdateProvider;
