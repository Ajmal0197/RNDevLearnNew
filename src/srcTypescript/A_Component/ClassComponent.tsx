import { Text, View } from 'react-native';
import React, { Component } from 'react';

// Define the prop and state interfaces
interface MyProps {
  name: string;
  age: number;
  email: string;
}

interface MyState {
  id: number;
}

// Extend the Component class with the specified prop and state types
class ClassComponent extends Component<MyProps, MyState> {
  // Initialize state with default values
  state: MyState = {
    id: 0,
  };

  render() {
    // Destructure props for easier usage
    const { name, age, email } = this.props;

    return (
      <View>
        {/* Display the class component's properties */}
        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
        <Text>Email: {email}</Text>
        <Text>ID from State: {this.state.id}</Text>
      </View>
    );
  }
}

export default ClassComponent;
