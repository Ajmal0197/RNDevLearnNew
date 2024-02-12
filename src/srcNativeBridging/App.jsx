import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AndroidNativeModules from './AndroidNativeModules';
import AndroidNativeUIComp from './AndroidNativeUIComp';
import IOSNativeModules from './IOSNativeModules';

const App = () => {
  const showFile = 2;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {showFile === 0 && <AndroidNativeModules />}
        {showFile === 1 && <AndroidNativeUIComp />}
        {showFile === 2 && <IOSNativeModules />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
