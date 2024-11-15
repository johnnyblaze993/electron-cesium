import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation JSON files
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";

i18n
  .use(initReactI18next) // Connect i18n instance to React
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
