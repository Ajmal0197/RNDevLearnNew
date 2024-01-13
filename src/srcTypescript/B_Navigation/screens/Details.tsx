// Import necessary components, modules, and types from 'react-native' and other dependencies
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useReducer } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '..';

// Define the prop types for the 'Details' screen
interface DetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
}

// Define the initial state shape for the useReducer hook
interface InitialState {
  count: number;
}

// Define the action shape for the useReducer hook
interface Action {
  type: 'INCREMENT' | 'DECREMENT';
}

// Initialize the initial state with a count of 0
const initialState: InitialState = {
  count: 0
};

// Define the reducer function to handle state changes based on actions
const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Define the Details component, which uses the useReducer hook to manage state
const Details = ({ navigation }: DetailScreenProps) => {

  // Use useReducer to manage state and dispatch actions
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View>
      {/* Button to navigate to the 'Feed' screen */}
      <Button title='Go to Feed' onPress={() => navigation.navigate('Feed')} />
      {/* Button to change the count based on the current count value */}
      <Button
        title='CHANGE COUNT'
        onPress={() => {
          // Increment or decrement the count based on its parity
          state.count % 2 === 0 ? dispatch({ type: 'INCREMENT' }) : dispatch({ type: 'DECREMENT' });
        }}
      />

      {/* Display the current count value */}
      <Text style={{ fontSize: 50, alignSelf: 'center', marginBottom: 200 }}>{state.count}</Text>

    </View>
  );
};

// Export the Details component as the default export of this module
export default Details;

// Define styles for the component using StyleSheet.create (currently empty in this example)
const styles = StyleSheet.create({});
