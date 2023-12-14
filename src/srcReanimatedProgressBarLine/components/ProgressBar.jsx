import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ProgressBar = ({ progress, style }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress}%`, { duration: 1000 }),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.completion, style, animatedStyle]} />
    </View>
  );
};
export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'stretch',
    height: 10,
    backgroundColor: '#e4e4e4',
    margin: 10,
    borderRadius: 20,
  },
  completion: {
    position: 'absolute',
    alignSelf: 'stretch',
    height: '100%',
    backgroundColor: '#0968da',
    borderRadius: 20,
  },
});
