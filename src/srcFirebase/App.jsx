import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import crashlytics from '@react-native-firebase/crashlytics';
import { getFcmToken, registerListenerWithFCM } from './services/NotificationService';

const App = () => {
  useEffect(() => {
    BootSplash.hide();
    getFcmToken();
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="PUSH NOTIF LOCAL"
        color="#841584"
        // onPress={changeAppLanguageFunc}
      />
      <Button title="CRASH APP" color="#221584" onPress={() => crashlytics().crash()} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
