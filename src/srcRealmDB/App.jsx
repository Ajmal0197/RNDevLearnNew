// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RealmProvider } from '@realm/react';
import CreateScreen from './screens/CreateScreen';
import { Person } from './models/Person';
import { Car } from './models/Car';
import { Address } from './models/Address';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <RealmProvider deleteRealmIfMigrationNeeded schema={[Person, Car, Address]}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Create" component={CreateScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
};

export default App;
