import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  interpolateColor, // Function to interpolate colors during animation
  useSharedValue, // Hook to create a variable that can be shared across components
  useAnimatedStyle, // Hook to define styles based on animated values
  withSpring, // Function to apply spring animation to a value
  withTiming, // Function to apply timing animation to a value
  useDerivedValue, // Hook to create a derived (computed) animated value
} from 'react-native-reanimated';

const AnimatedSwitch = ({
  activeColor = 'green',
  inActiveColor = 'grey',
  onToggleSwitch = () => null,
}) => {
  // value for Switch Animation
  const switchTranslate = useSharedValue(0);
  // state for activate Switch
  const [active, setActive] = useState(false);
  // Progress Value
  // Creating a derived animated value for progress using useDerivedValue
  const progress = useDerivedValue(() => {
    // Defining a timing animation with a target value of 22 when active is true, and 0 when active is false
    return withTiming(active ? 22 : 0);
  });

  // useEffect for changing the switchTranslate Value
  useEffect(() => {
    // If active is true, set the switchTranslate value to 22; otherwise, set it to 4
    if (active) {
      switchTranslate.value = 22;
    } else {
      switchTranslate.value = 4;
    }
  }, [active, switchTranslate]);

  // Circle Animation
  //useAnimatedStyle helps you describe how your UI components should look based on animated values, allowing you to create smooth and dynamic animations in React Native.
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Applying a spring animation to translateX property based on switchTranslate value
          translateX: withSpring(switchTranslate.value, {
            // Mass of the object in the spring animation (higher value means more mass)
            mass: 1,
            // Damping factor (higher value means more damping, slowing down the animation)
            damping: 15,
            // Stiffness of the spring (higher value means a stiffer spring)
            stiffness: 120,
            // If true, overshoot will be clamped
            overshootClamping: false,
            // The threshold at which the spring is considered at rest for speed
            restSpeedThreshold: 0.001,
            // The threshold at which the spring is considered at rest for displacement
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  // Background Color Animation
  const backgroundColorStyle = useAnimatedStyle(() => {
    // Interpolating the progress value between 0 and 22 to determine the background color
    const backgroundColor = interpolateColor(progress.value, [0, 22], [inActiveColor, activeColor]);
    return {
      backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(!active);
        onToggleSwitch(!active);
      }}
    >
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedSwitch;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#F2F5F7',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
