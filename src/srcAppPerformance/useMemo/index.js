import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';

const App = () => {
  const [number, setnumber] = useState(0);
  const [randomNumber, setrandomNumber] = useState(0);

  const onDecrement = useCallback(() => {
    // memoised function
    setnumber(number - 1);
  }, [number]);

  const onIncrement = useCallback(() => {
    // memoised function
    setnumber(number + 1);
  }, [number]);

  const onRandomNumber = useCallback(() => {
    // memoised function
    setrandomNumber(Math.random());
  }, []);

  const expensiveCalculation = (num) => {
    console.log('Calculating...');
    for (let i = 0; i < 100000000; i++) {
      num += 1;
    }
    return num;
  };

  // 1. If we dont memoise it this resource extensive function will be called on any state update which will result in lag
  // const calculation = expensiveCalculation(number);
  // 2. If we memoise it, useMemo function will only be called when dependency changes.
  const calculation = useMemo(() => expensiveCalculation(number), [number]);

  return (
    <View style={styles.container}>
      <View style={styles.alignCenter}>
        <Text onPress={onRandomNumber} style={styles.textStyle}>
          Random Number: {randomNumber}
        </Text>
        <TouchableOpacity onPress={onDecrement}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>Memoised Number: {calculation}</Text>
        <TouchableOpacity onPress={onIncrement}>
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  alignCenter: {
    alignContent: 'center',
    alignItems: 'center',
  },
});
