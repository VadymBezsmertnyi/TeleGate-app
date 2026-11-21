import type { LanguageT, LanguagesT } from "./localization.types";

// images
import imageCountryUk from "../src/images/countries/icon-country-uk.png";
import imageCountryUs from "../src/images/countries/icon-country-us.png";

export const defaultLanguage: LanguageT = "en";
export const languagesKeys = ["en", "uk"] as const;
export const languageKey = "language";

export const languages: LanguagesT = [
  {
    title: "English",
    key: "en",
    icon: imageCountryUs,
    native: "English",
  },
  {
    title: "Українська",
    key: "uk",
    icon: imageCountryUk,
    native: "Ukrainian",
  },
];

export const languages_short = {
  en: "en-US",
  uk: "uk-UA",
} as const;

export const languagesLinguiAlias = {
  en: "en",
  uk: "uk",
} as const;

export const LANGUAGE_EN = "en";
export const LANGUAGE_UK = "uk";

export const languagePattern = /\b(en|uk)\b/;
