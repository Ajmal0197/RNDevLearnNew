import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cakeSlice from './slices/cakeSlice';
import { rtkBaseUrl1Api } from './slices/rtkBaseUrl1Api';
import { rtkBaseUrl2Api } from './slices/rtkBaseUrl2Api';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['cake'], // these reduce will not persist data
  // whitelist: ['users'], //these reduce will persist data
};

const reducer = combineReducers({
  cake: cakeSlice,
  [rtkBaseUrl1Api.reducerPath]: rtkBaseUrl1Api.reducer,
  [rtkBaseUrl2Api.reducerPath]: rtkBaseUrl2Api.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const getEnhancers = (getDefaultEnhancers) => {
  if (process.env.NODE_ENV === 'development') {
    const reactotron = require('./reactotronConfig/ReactotronConfig').default;
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  }
  return getDefaultEnhancers();
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([rtkBaseUrl1Api.middleware, rtkBaseUrl2Api.middleware]),
  enhancers: getEnhancers,
});

export default store;
