import { Button, NativeModules, StyleSheet, View } from 'react-native';
import React from 'react';

const { MyModule } = NativeModules;

// Android Files Modified for NativeModules:
// 1. TestController.java
// 2. TestControllerPackage.java
// 3. MainApplication.java (getPackages())

const AndroidNativeModules = () => {
  // Define a function to send data to the native Android module
  const sendDataToAndroid = () => {
    // Call the native method without using a promise
    MyModule.myMethod('THIS IS SENT FROM RN TO ANDROID');
  };

  // Define a function to get data from the native Android module
  const getDataFromAndroid = () => {
    // Call the native method with a promise
    MyModule.myMethodWithPromise('Sent From RN To A then from A to RN')
      // Handle the resolved promise (success case)
      .then((result) => {
        // Log the success result
        console.log('Success:', result);
      })
      // Handle the rejected promise (error case)
      .catch((error) => {
        // Log the error information
        console.error('Error:', error.code, error.message);
      });
  };

  return (
    <View style={styles.main}>
      <Button
        title="Send Data From RN To Android"
        onPress={sendDataToAndroid} // MyModule & myMethod are defined in Java Class
      />
      <Button
        title="Send Data To Android From RN"
        onPress={getDataFromAndroid} // MyModule & myMethod are defined in Java Class
      />
    </View>
  );
};

export default AndroidNativeModules;

const styles = StyleSheet.create({
  main: { justifyContent: 'space-evenly', alignItems: 'center', flex: 1 },
});
