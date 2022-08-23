import i18n from "i18n-js";
import EN from "./en";
import AR from "./ar";

export const initTranslate = () => {
  // Set the key-value pairs for the different languages you want to support.
  i18n.translations = {
    en: EN,
    ar: AR,
  };

  //i18n.locale = 'fr';

  // When a value is missing from a language it'll fallback to another language with the key present.
  i18n.fallbacks = true;
};
