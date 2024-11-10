import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSharedState } from './SharedContext';

const ScrollToTopButton = ({ onPress }) => {
  const { scrollYGlobal } = useSharedState();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: scrollYGlobal.value > 100 ? 1 : 0,
    transform: [{ translateY: scrollYGlobal.value > 100 ? 0 : 100 }],
  }));

  return (
    <Animated.View style={[styles.buttonContainer, animatedStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Top</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ScrollToTopButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
