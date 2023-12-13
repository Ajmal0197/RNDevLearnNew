import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import {
  getFcmToken,
  localDisplayNotificationSample,
  registerListenerWithFCM,
} from './firebase/notificationConfiguration';
import { navigationRef } from './services/NavigationService';
import { trackEventAnalytics } from './firebase/analytics';

const RootStack = createNativeStackNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
    <Text>{Config.APP_CONFIG}</Text>
    <Button title="PUSH NOTIF LOCAL" color="red" onPress={localDisplayNotificationSample} />
    <Button title="CRASH APP" color="blue" onPress={() => crashlytics().crash()} />
    <Button
      title="LOG EVENT"
      color="green"
      onPress={() =>
        trackEventAnalytics('basket', {
          id: 3745092,
          item: 'mens grey t-shirt',
          description: ['round neck', 'long sleeved'],
          size: 'L',
        })
      }
    />
  </View>
);
const NewHomeScreen = () => <View style={{ flex: 1, backgroundColor: 'blue' }} />;

const App = () => {
  const routeNameRef = useRef();

  // const firebaseConfig = useCallback(() => {
  //   if (Config.APP_CONFIG === 'production' && !__DEV__) {
  //     firebaseCrashlyticsConfiguration();
  //   }
  // }, []);

  useEffect(() => {
    BootSplash.hide();
    // firebaseConfig();
    getFcmToken();
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            // Use onStateChange instead to ensure the navigation container is ready
          }}
          onStateChange={async () => {
            // eslint-disable-next-line no-console
            console.log('NAVIGATION_STATE: ', navigationRef?.current?.getState());
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName && Config.APP_CONFIG === 'production') {
              // uncomment if needed
              // await analytics().logScreenView({
              //   screen_name: currentRouteName,
              //   screen_class: currentRouteName,
              // });
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <RootStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen name="NewHomeScreen" component={NewHomeScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
