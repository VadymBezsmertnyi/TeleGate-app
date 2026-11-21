// types
import type { I18n as i18Type } from "@lingui/core";
import { ImageSource } from "expo-image";
import { languages_short } from "./localization.const";

export type LanguageT = "en" | "uk";

const VALUES_LANGUAGES_SHORT = Object.values(languages_short);

type LanguageShortTypeT = (typeof VALUES_LANGUAGES_SHORT)[number];

export type LocalesContextT = {
  i18n: i18Type;
  language: LanguageT;
  localesArgument: LanguageShortTypeT;
  getLanguageStorage: () => Promise<void>;
  setLanguage: (language: LanguageT) => Promise<void>;
  children?: React.ReactNode;
};
export type PropsT = {
  children?: React.ReactNode;
};
export type LanguageTypeT = {
  title: string;
  key: LanguageT;
  icon: ImageSource;
  native: string;
};
export type LanguagesT = LanguageTypeT[];
