// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rtkStore from './reduxToolkit/store';
import HomeScreen from './screens/home';

const persistor = persistStore(rtkStore);

const App = () => {
  useEffect(() => {
    BootSplash.hide();
  }, []);
  return (
    <Provider store={rtkStore}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
