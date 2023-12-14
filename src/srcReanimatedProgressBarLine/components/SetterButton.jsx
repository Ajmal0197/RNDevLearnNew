import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SetterButton = ({ progressValue, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>{progressValue}</Text>
  </TouchableOpacity>
);

export default SetterButton;

const styles = StyleSheet.create({
  button: {
    margin: 4,
    padding: 4,
    backgroundColor: '#FFFF',
    borderColor: '#7f8c8d',
    borderWidth: 1,
    borderRadius: 8,
  },
});
