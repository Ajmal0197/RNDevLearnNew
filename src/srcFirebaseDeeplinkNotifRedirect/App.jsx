import React, { useEffect } from 'react';
import { Linking, ActivityIndicator, View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { requestUserPermission } from './utils/notificationService';

const Stack = createNativeStackNavigator();
const NAVIGATION_IDS = ['home', 'post', 'settings'];

function buildDeepLinkFromNotificationData(data) {
  console.log('buildDeepLinkFromNotificationData', data);
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'home') {
    return 'myapp://home';
  }
  if (navigationId === 'settings') {
    return 'myapp://settings';
  }
  const postId = data?.postId;
  if (typeof postId === 'string') {
    return `myapp://post/${postId}`;
  }
  console.warn('Missing postId');
  return null;
}

const linking = {
  prefixes: ['myapp://'], // REF: src/srcLinkingDeeplinking/App.jsx (On click "npx uri-scheme open "myapp://settings" --android"; first part ie "myapp" is "scheme" and second part "settings" is screen name )
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: 'home',
      Post: 'post/:id',
      Settings: 'settings',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    // getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    // onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

const HomeScreen = () => <View style={{ flex: 1, backgroundColor: 'red' }} />;
const SettingsScreen = () => <View style={{ flex: 1, backgroundColor: 'blue' }} />;
const PostScreen = ({ route }) => {
  console.log('PostScreenPostScreen', route);
  return (
    <View
      style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontSize: 22 }}>ID: {route?.params?.id}</Text>
    </View>
  );
};

function App() {
  useEffect(() => {
    // notification permission request and get token
    requestUserPermission();

    // Foreground Service (for Notifee usage ref: src/srcFirebase/firebase/notificationConfiguration/index.js)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator animating />}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/*
STEPS:

1. https://rnfirebase.io/#installation-for-react-native-cli-projects
2. https://rnfirebase.io/messaging/usage
3. https://rnfirebase.io/messaging/usage#foreground-state-messages
4. https://rnfirebase.io/messaging/notifications#handling-interaction
5. https://reactnavigation.org/docs/deep-linking & https://reactnavigation.org/docs/configuring-links

/Test: 
https://testfcm.com/
Server Key: AAAA6pJENcg---
User Token: em3SEpFySK6M2-dqzFYwUr---
Title: Notif TITLE
Body: Notification request for the request for this information from my office
Click Url:
Icon Url:
Data: { "navigationId":"post", "postId":"111" }
/
*/
