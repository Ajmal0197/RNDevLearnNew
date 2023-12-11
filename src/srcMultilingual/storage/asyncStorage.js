/**
 * Async Storage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_CODE_ASYNC_KEY } from '../constants';

/**
 *
 * @param {*} key
 * @param {*} value
 * @returns
 */
const setItem = async (key, value) => {
  try {
    if (value) {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 *
 * @param {*} key
 * @returns
 */
const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

/**
 *
 * @param {*} language
 * @returns
 */
const saveLanguage = async (language) => setItem(LANGUAGE_CODE_ASYNC_KEY, language);

/**
 *
 * @returns
 */
const loadLanguageCode = async () => getItem(LANGUAGE_CODE_ASYNC_KEY);

export { setItem, getItem, saveLanguage, loadLanguageCode };
