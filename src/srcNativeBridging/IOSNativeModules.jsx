import React, { useEffect } from 'react';
import { Button, NativeModules, NativeEventEmitter, StyleSheet, View } from 'react-native';

const { CustomMethods } = NativeModules;

const IOSNativeModules = () => {
  const sendDataToIOS = () => {
    // iOS Files Modified for NativeModules(sending data from RN to iOS):
    // 1. CustomMethods.swift(also added bridging header by default)
    // 2. CustomMethods.m
    CustomMethods.myMethod('THIS IS SENT FROM RN TO IOS');
  };

  useEffect(() => {
    // iOS Files Modified for NativeModules(sending data from iOS to RN):
    // 1. RNEventEmitter.swift
    // 2. RNEventEmitter.m
    // 3. CustomMethods.swift
    const getDataFromIOS = new NativeEventEmitter(NativeModules.RNEventEmitter);
    const eventListener = getDataFromIOS.addListener('onReady', (string) => {
      console.log('sendDataToIOS to IOS then from IOS to RN: ', string);
    });
    return () => eventListener.remove();
  }, []);

  return (
    <View style={styles.main}>
      <Button title="Send Data From RN To IOS" onPress={sendDataToIOS} />
    </View>
  );
};

export default IOSNativeModules;

const styles = StyleSheet.create({
  main: { justifyContent: 'space-evenly', alignItems: 'center', flex: 1 },
});
