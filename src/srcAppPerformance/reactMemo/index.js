import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import CounterComponent from './CounterComponent';

const App = () => {
  const [number, setnumber] = useState(0);
  const [randomNumber, setrandomNumber] = useState(0);

  const onDecrement = useCallback(() => {
    setnumber(number - 1);
  }, [number]);

  const onIncrement = useCallback(() => {
    setnumber(number + 1);
  }, [number]);

  // 1. Since randomNumber will always be random, so no need to add dependency as always different value is memoised
  // 2. On clicking onRandomNumber, child component ie "CounterComponent" also gets rerendered though we are not passing randomNumber state to it.
  // 3. In order to avoid it we wrap our child component with React.memo(ChildComponent), so that this component only gets rerendered when passed prop changes ie number.
  const onRandomNumber = useCallback(() => {
    setrandomNumber(Math.random());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.alignCenter}>
        <Text onPress={onRandomNumber} style={styles.textStyle}>
          {randomNumber}
        </Text>
        <TouchableOpacity onPress={onDecrement}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <CounterComponent number={number} />
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
