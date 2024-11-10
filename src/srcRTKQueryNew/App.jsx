// src/App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import MainApp from './MainApp';
import rtkStore from './store/store';

const persistor = persistStore(rtkStore);

const App = () => (
  <Provider store={rtkStore}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
