import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import HomeScreen from './screens/HomeScreen';
import NewHomeScreen from './screens/NewHomeScreen';
import Colors from './utils/colors';
import NetInfoComp from './components/NetInfo';

const RootStack = createNativeStackNavigator();

const AppContainer = () => {
  const theme = useColorScheme();

  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer theme={theme === 'dark' ? Colors.dark : Colors.light}>
          <NetInfoComp />
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen name="NewHomeScreen" component={NewHomeScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppContainer;
