import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from "./en/translation.json";
import translationDE from "./de/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") !== "de" ? "en" : "de",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
