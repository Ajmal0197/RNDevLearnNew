import React from 'react';
import { View, Button, Linking, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const openWebURL = () => {
    Linking.openURL('https://www.example.com');
  };

  const openPhoneDialer = () => {
    Linking.openURL('tel:+123456789');
  };

  const sendEmail = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const openMaps = () => {
    Linking.openURL('https://maps.apple.com/?q=latitude,longitude');
  };

  const openDeepLink = () => {
    // Check if deep linking is supported on the device
    Linking.canOpenURL('testapp://profile/100911').then((supported) => {
      if (supported) {
        Linking.openURL('testapp://profile/100911');
      } else {
        console.log('Deep linking is not supported.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Open Web URL" onPress={openWebURL} />
      <Button title="Open Phone Dialer" onPress={openPhoneDialer} />
      <Button title="Send Email" onPress={sendEmail} />
      <Button title="Open Maps" onPress={openMaps} />
      <Button title="Open Deep Link" onPress={openDeepLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default HomeScreen;
