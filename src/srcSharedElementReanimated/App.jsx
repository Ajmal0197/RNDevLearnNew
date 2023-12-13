// REF: https://blog.logrocket.com/using-react-native-reanimated-seamless-ui-transitions/

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './routes';

const App = () => (
  <SafeAreaProvider>
    <Navigator />
  </SafeAreaProvider>
);

export default App;
