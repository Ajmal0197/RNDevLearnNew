// REF: https://thoughtbot.com/blog/implementing-deep-linking-in-react-native-a-quick-step-by-step-guide
/*
1. App uri by running commnds in terminal:
a) npx uri-scheme add testapp
b) npx uri-scheme add myapp
... testapp/myapp will be prefixes provided to you

2. Update AppDelegate.mm (Ref: https://reactnavigation.org/docs/deep-linking/#set-up-with-bare-react-native-projects)

3. Recheck all uri added by running `npx uri-scheme list` (ref. https://www.npmjs.com/package/uri-scheme)

4. Configure linking to NavigationContainer as per below(Way 1: using `const linking`; Way 2: `Linking.addEventListener('url'`).)

5. Test devices by running these commands:
a) npx uri-scheme open "testapp://profile/100911" --ios
b) npx uri-scheme open "myapp://home" --android //will work in real device only
c) npx uri-scheme open "myapp://chat/211/Ajmal" --ios
*/

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Linking, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

const RootStack = createNativeStackNavigator();

const AppContainer = () => {
  useEffect(() => {
    // Hide BootSplash when component mounts
    BootSplash.hide();

    // Define the event handler function
    const handleUrl = (event) => {
      Alert.alert('Received URL', JSON.stringify(event.url));
    };

    // Add the event listener
    Linking.addEventListener('url', handleUrl);

    // Clean up the event listener when the component unmounts
    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  /**
   * Linking Configuration
   */
  const linking = {
    // Prefixes accepted by the navigation container, should match the added schemes
    prefixes: ['myapp://', 'testapp://'],

    // Route config to map uri paths to screens
    config: {
      // Initial route name to be added to the stack before any further navigation,
      // should match one of the available screens
      initialRouteName: 'Home',

      screens: {
        // myapp://home (in uri: `Scheme (myapp://)` and `Path (home)`)

        // Here LHS=Screen Name; RHS=path in uri

        // myapp://home -> HomeScreen
        // testapp://home -> HomeScreen
        Home: 'home',

        // myapp://chat/211/Ajmal -> ChatScreen
        // testapp://chat/121/Hasan -> ChatScreen
        // returns: {"key": "Chat-m0i4LuhpJBiNNDUipBwd7", "name": "Chat", "params": {"id": "chat-211", "name": "Ajmal"}, "path": "chat/211/Ajmal"}
        Chat: {
          path: 'chat/:id/:name?',
          parse: {
            id: (id) => `chat-${id}`,
          },
          stringify: {
            id: (id) => id.replace(/^chat-/, ''),
          },
        },

        // myapp://profile/1 -> ProfileScreen with param id: 1
        // testapp://profile/1 -> ProfileScreen with param id: 1
        Profile: 'profile/:id',
        NotFound: '*',
      },
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          <RootStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="Chat" component={ChatScreen} />
            <RootStack.Screen name="Profile" component={ProfileScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppContainer;
