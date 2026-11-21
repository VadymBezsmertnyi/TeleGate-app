import React, { useState, useEffect, useMemo, useContext } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";

// types
import { LanguageT, LocalesContextT, PropsT } from "./localization.types";

// helps
import {
  dynamicActivateLanguage,
  getDeviceLanguage,
} from "./localization.helpers";
import { setDeviceStorage } from "../src/helps/storage.help";

// locales
import { messages as translationsEn } from "../localization/en/messages";
import { messages as translationsUk } from "../localization/uk/messages";

// constants
import {
  defaultLanguage,
  languageKey,
  languages_short,
  languagesLinguiAlias,
} from "./localization.const";

const CATALOGS_LANGUAGES = {
  en: translationsEn as Messages,
  uk: translationsUk as Messages,
};

export const localesContext = React.createContext({} as LocalesContextT);

const LocalesProvider: React.FC<PropsT> = ({ children }) => {
  const [languageUser, setLanguage] = useState<LanguageT>(defaultLanguage);
  const language = languageUser || defaultLanguage;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language as keyof typeof languagesLinguiAlias],
  });
  const localesArgument = useMemo(() => languages_short[language as keyof typeof languages_short], [language]);

  const setLanguageAsync = async (language: LanguageT): Promise<void> => {
    try {
      await dynamicActivateLanguage(language, i18n);
      await setDeviceStorage(languageKey, language);
      setLanguage(language);
    } catch (error: any) {
      if (__DEV__) console.warn("Error set language", error);
      else console.warn(error);
    }
  };

  const getLanguageStorage = async () => {
    try {
      const language = await getDeviceLanguage();
      await setLanguageAsync(language);
      setLanguage(language);
    } catch (error: any) {
      if (__DEV__) console.warn("Error get language", error);
      else console.warn(error);
    }
  };

  const contextValue: LocalesContextT = useMemo(
    () => ({
      i18n,
      language: language as LanguageT,
      localesArgument,
      getLanguageStorage,
      setLanguage: setLanguageAsync,
    }),
    [i18n, language, localesArgument]
  );

  useEffect(() => {
    getLanguageStorage();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <localesContext.Provider value={contextValue}>
        {children}
      </localesContext.Provider>
    </I18nProvider>
  );
};

export const useLocalesProvider = () => useContext(localesContext);

export default LocalesProvider;
