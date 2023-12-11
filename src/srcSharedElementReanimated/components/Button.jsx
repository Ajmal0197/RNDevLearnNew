import { Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Button = () => {
  const { width } = useWindowDimensions();

  // Creating an Animated Pressable component using createAnimatedComponent //ALTERNATE:==> <Animated.View/>
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable
      style={[styles.container, { width: width * 0.9 }]} // Styles for the Pressable
      entering={FadeInDown.delay(1000)} // FadeInDown animation with a delay of 1000 milliseconds
      onPress={() => {
        console.log('BOOKING NOW');
      }}
    >
      <Text style={styles.text}>Booking Now</Text>
    </AnimatedPressable>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c6cce',
    padding: 22,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
