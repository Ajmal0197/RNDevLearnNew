/**
 * Translations
 

import React, {createContext, useState} from 'react';
import LocalizedStrings from 'react-native-localization';
import * as RNLocalize from 'react-native-localize';
import {setItem, getItem} from '../utils/storage';
import {APP_LANGUAGE, AR, EN} from '../constants';

const DEFAULT_LANGUAGE = AR;
const languages = {EN, AR};
const translations = new LocalizedStrings(languages);

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({children}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    setItem(APP_LANGUAGE, language);
  };
  const initializeAppLanguage = async () => {
    const currentLanguage = await getItem(APP_LANGUAGE);
    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  };
  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};

*/
