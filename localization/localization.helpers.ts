import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// constants
import {
  languages_short,
  defaultLanguage,
  languageKey,
  LANGUAGE_EN,
  LANGUAGE_UK,
} from "./localization.const";
import { LanguageT } from "./localization.types";

// locales
import { messages as translationsEn } from "./en/messages";
import { messages as translationsUk } from "./uk/messages";

// types
import type { I18n as i18Type } from "@lingui/core";

export const languagesRegexGroup = `${Object.keys(languages_short).join("|")}`;

export function getPathWithoutLanguage(path: string): string {
  const languagesRegex = new RegExp(`^/(${languagesRegexGroup})/`);
  const match = languagesRegex.exec(path);
  if (!match) return path;
  return path.slice(match.index + match[0].length - 1);
}
export async function dynamicActivateLanguage(
  locale: LanguageT,
  i18n: i18Type
): Promise<void> {
  const messages = getMessagesByLocale(locale);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
const getMessagesByLocale = (locale: LanguageT) => {
  switch (locale) {
    case LANGUAGE_EN:
      return translationsEn;
    case LANGUAGE_UK:
      return translationsUk;
    default:
      return translationsEn;
  }
};

export const isLanguage = (value: string): value is LanguageT => {
  return value in languages_short;
};

export const getDeviceLanguage = async (): Promise<LanguageT> => {
  const deviceLanguage = Localization.getLocales()[0].languageCode;
  let localizationLanguage = defaultLanguage;
  const languageAsyncStorage = await AsyncStorage.getItem(languageKey);
  if (languageAsyncStorage && isLanguage(languageAsyncStorage))
    localizationLanguage = languageAsyncStorage as LanguageT;
  else if (deviceLanguage && isLanguage(deviceLanguage))
    localizationLanguage = deviceLanguage as LanguageT;

  return localizationLanguage;
};
