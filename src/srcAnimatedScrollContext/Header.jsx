import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSharedState } from './SharedContext';

const Header = () => {
  const { scrollY } = useSharedState();

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollY.value === 1
            ? withTiming(-100, { duration: 300 })
            : withTiming(0, { duration: 300 }),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.header, animatedHeaderStyle]}>
      <Text style={styles.headerText}>Animated Header</Text>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    height: 100,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
});
