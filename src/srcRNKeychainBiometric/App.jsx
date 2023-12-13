import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import callBiometric from './utils/Biometric';

const App = () => {
  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button title="Biometric" color="yellow" onPress={callBiometric} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
