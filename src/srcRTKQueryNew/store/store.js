// src/store/store.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { authApi } from '../api/authApi';
import { postsApi } from '../api/postsApi';
import { usersApi } from '../api/usersApi';
import authSlice from '../features/auth/authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['auth', postsApi.middleware, usersApi.middleware, authApi.middleware], // these reduce will not persist data (NOTE: blacklist rtk api slices so that to use tags)
  // whitelist: ['users'], //these reduce will persist data
};

const getEnhancers = (getDefaultEnhancers) => {
  if (process.env.NODE_ENV === 'development') {
    const reactotron = require('../reactotronConfig/ReactotronConfig').default;
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  }
  return getDefaultEnhancers();
};

/**
 * On api error this will be called
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log('isRejectedWithValue', action.error, action.payload);
    alert(JSON.stringify(action)); // This is just an example. You can replace it with your preferred method for displaying notifications.
  }

  return next(action);
};

const reducer = combineReducers({
  auth: authSlice,
  [postsApi.reducerPath]: postsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(postsApi.middleware, usersApi.middleware, authApi.middleware, rtkQueryErrorLogger),
  enhancers: getEnhancers,
});

setupListeners(store.dispatch);

export default store;
