import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CounterComponent = ({ number = 0 }) => {
  console.log('Is component rerendered', number);
  return <Text style={styles.textStyle}>{number}</Text>;
};

export default React.memo(CounterComponent);

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
