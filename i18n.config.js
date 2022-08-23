import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './translate/en';
import ar from './translate/ar';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ar',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
});
export default i18n;
