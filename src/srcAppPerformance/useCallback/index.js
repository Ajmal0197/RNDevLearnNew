import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';

const App = () => {
  const [number, setnumber] = useState(0);

  // 1. Whenever set state is called all function that are not memoized get recreated
  // const onDecrement = () => {
  //   console.log('rerenders-', number);
  //   setnumber(number - 1);
  // };
  // const onIncrement = () => {
  //   console.log('rerenders+', number);
  //   setnumber(number + 1);
  // };

  // 2. If we dont pass dependency array next state updation wont happen and reflect, as this function does not get recreated
  // const onDecrement = useCallback(() => {
  //   console.log('rerenders-', number);
  //   setnumber(number - 1);
  // }, []);

  // 3. Since we have memoised the function and also passed dependency so this function will only be recreated whenever dependency data changes
  const onDecrement = useCallback(() => {
    console.log('rerenders-', number);
    setnumber(number - 1);
  }, [number]);

  const onIncrement = useCallback(() => {
    console.log('rerenders+', number);
    setnumber(number + 1);
  }, [number]);

  // 4. Since below function is not memoised this function will be recreated whenever any state changes
  const notMemoizedFunction = () => {
    console.log('rerendersNM', number);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onDecrement}>
          <Text style={styles.textStyle}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{number}</Text>
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
