/**
 * MMKV Storage
 */
import MMKV from 'react-native-mmkv';
import { LANGUAGE_CODE_ASYNC_KEY } from '../constants';

/**
 * @param {*} key
 * @param {*} value
 * @returns
 */
const setItem = (key, value) => {
  try {
    // Use MMKV.set for setting values
    if (value) {
      MMKV.set(key, value);
    } else {
      // Use MMKV.delete for removing values
      MMKV.delete(key);
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * @param {*} key
 * @returns
 */
const getItem = (key) => {
  try {
    // Use MMKV.get for retrieving values
    return MMKV.get(key);
  } catch (e) {
    return null;
  }
};

/**
 * @param {*} language
 * @returns
 */
const saveLanguage = (language) => setItem(LANGUAGE_CODE_ASYNC_KEY, language);

/**
 * @returns
 */
const loadLanguageCode = () => getItem(LANGUAGE_CODE_ASYNC_KEY);

export { setItem, getItem, saveLanguage, loadLanguageCode };
