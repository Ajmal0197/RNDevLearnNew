/**
 * Locale
 */

// Import necessary modules
import * as RNLocalize from 'react-native-localize';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { AR, EN } from '../constants';
import { loadLanguageCode, saveLanguage } from '../storage/asyncStorage';

// Define the default language (in this case, Arabic)
export const DefaultLanguage = AR;

// Create an instance of the I18n class
const i18n = new I18n();

// Define translation data for different languages
const translationGetters = {
  // English translations
  en: {
    ...require('./locales/en/profile.json'),
    ...require('./locales/en/common.json'),
  },
  // Arabic translations
  ar: {
    ...require('./locales/ar/profile.json'),
    ...require('./locales/ar/common.json'),
  },
};

// Set up the configuration for internationalization
export const setI18nConfig = (appLang) => {
  try {
    // Determine if the language is Right-to-Left (RTL)
    const isRTLBool = appLang === AR;
    i18n.fallbacks = true;

    // Set up fallback language if needed
    const fallback = {
      languageTag: appLang || DefaultLanguage,
      isRTL: isRTLBool,
    };

    // Find the best available language using react-native-localize
    const locales = RNLocalize.getLocales();
    const languageTag = appLang || (locales && locales[0]?.languageTag) || fallback.languageTag;

    // Set the translations and locale in the I18n instance
    i18n.translations = { [languageTag]: translationGetters[languageTag] };
    i18n.locale = languageTag;

    // Force RTL if needed
    I18nManager.forceRTL(isRTLBool);
  } catch (error) {
    console.log('iI8Error', error.message);
  }
};

/**
 * change App language
 */
export const changeAppLang = async () => {
  try {
    const lastSelectedLanguage = await loadLanguageCode();
    const changeLanguage = lastSelectedLanguage === EN ? AR : EN;
    await saveLanguage(changeLanguage);
    setI18nConfig(changeLanguage);
    RNRestart.Restart();
  } catch (error) {
    console.log('iI8ErrorLangChange', message);
  }
};

// Translation method to retrieve localized strings
export function strings(key, params = {}) {
  return key ? i18n.t(key, params) : null;
}

// Get the current locale
export function getLocale() {
  return i18n.locale;
}

// Get the initials of the current locale
export function getLocaleInitials() {
  return i18n.locale.slice(0, 2);
}

// Check if the current language is Right-to-Left
export function isRTL() {
  return I18nManager.isRTL;
}

// Export the configured i18n instance
export default i18n;
