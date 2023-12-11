import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getFcmToken, registerListenerWithFCM } from './services/NotificationService';

const App = () => {
  useEffect(() => {
    getFcmToken();
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title={`PUSH NOTIF LOCAL`}
        color="#841584"
        // onPress={changeAppLanguageFunc}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
