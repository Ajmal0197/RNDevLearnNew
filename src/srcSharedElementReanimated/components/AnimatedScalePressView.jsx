import React, { memo } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedScalePressView = ({
  children,
  onPress,
  onLongPress,
  style,
  hitSlop,
  disabled = false,
  appOpacity = true,
}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const appOpacityValue = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
    translateX.value = withSpring(50);
    appOpacityValue.value = withTiming(0.7); // Adjust the opacity value as needed
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    appOpacityValue.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    // The transform property in React Native is used to apply transformations to a component,
    // allowing you to modify its appearance, position, and scale. The transform property takes an array of
    // transformation objects as its value. Each transformation object represents a specific type of
    // transformation, such as scale, rotation, or translation.
    // { transform: [{ translateX: 10 }, { scaleY: 1.5 }, { rotate: '45deg' }] }
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
    opacity: appOpacity ? appOpacityValue.value : 1,
  }));

  return true ? (
    <AnimatedPressable
      hitSlop={hitSlop}
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
      disabled={disabled}
    >
      {children}
    </AnimatedPressable>
  ) : (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        hitSlop={hitSlop}
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        disabled={disabled}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(AnimatedScalePressView);
