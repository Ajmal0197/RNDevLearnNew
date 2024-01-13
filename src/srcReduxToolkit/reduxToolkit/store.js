import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import cakeReducer from './slices/cakeSlice';
import icecreamReducer from './slices/icecreamSlice';
import userReducer from './slices/userSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { reduxStorageMMKV } from '../constants/constants';
// import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorageMMKV,
  blacklist: ['icecream', 'cake'], // these reduce will not persist data
  // whitelist: ['users'], //these reduce will persist data
};
const reducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
  users: userReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //
      },
    }),
  enhancers: (getDefaultEnhancers) =>
    !__DEV__
      ? getDefaultEnhancers()
      : getDefaultEnhancers().concat(
          require('./reactotronConfig/ReactotronConfig').createEnhancer()
        ),
});

export default store;
