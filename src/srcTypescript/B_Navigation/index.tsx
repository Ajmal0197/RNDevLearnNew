// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Details from './screens/Details';
import Feed from './screens/Feed';
import ProductScreen from './screens/ProductScreen';

//FOR bottom/drawer navigation no need to type cast

// Define a TypeScript type named RootStackParamList
export type RootStackParamList = {
  Home: undefined; // 'Home' screen with no additional parameters
  Details: { id: number }; // 'Details' screen with a parameter 'id' of type number
  Feed: { sort: 'latest' | 'top' } | undefined; // 'Feed' screen with a parameter 'sort' of type 'latest' or 'top', or undefined
  ProductScreen: undefined
};

// Create a stack navigator using createNativeStackNavigator and specify the type of the route parameters
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/* useState, useRef usage in typescript */}
        <Stack.Screen name="Home" component={Home} />

        {/* useReducer usage in typescript */}
        <Stack.Screen name="Details" component={Details}
        />

        {/* useContext usage in typescript */}
        {/* Get data from api and show in flat_list */}
        <Stack.Screen name="Feed" component={Feed}
          initialParams={{ sort: 'top' }}
        />

        {/* Get data from api and show in flat_list */}
        <Stack.Screen name="ProductScreen" component={ProductScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
