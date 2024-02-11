import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AndroidNativeModules from './AndroidNativeModules';
import AndroidNativeUIComp from './AndroidNativeUIComp';

const App = () => {
  const showFile = 1;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {showFile === 0 && <AndroidNativeModules />}
        {showFile === 1 && <AndroidNativeUIComp />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
