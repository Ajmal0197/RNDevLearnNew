import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
//     {
//     id: `user-custom-storage`,
//     //   path: `${USER_DIRECTORY}/storage`,
//     encryptionKey: 'hunter2'
// }

export const reduxStorageMMKV = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
