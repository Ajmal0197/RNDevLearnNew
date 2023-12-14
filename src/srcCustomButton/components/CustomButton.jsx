import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

/**
 * Custom Button Component
 *
 * @component
 * @example
 * // Example of a filled button with animation
 * <CustomButton
 *   onPress={handleButtonPress}
 *   title="Filled Animated Button"
 *   enableAnimation={true} // Enable animation on press
 *   filled={true} // Filled button style
 * />
 *
 * @param {Object} props - The properties of the component.
 * @param {Function} props.onPress - Function to be called when the button is pressed.
 * @param {Function} [props.onLongPress] - Function to be called when the button is long-pressed.
 * @param {string} props.title - Text to be displayed on the button.
 * @param {ReactNode} [props.iconLeft] - React element to be displayed on the left side of the button.
 * @param {ReactNode} [props.iconRight] - React element to be displayed on the right side of the button.
 * @param {Object} [props.style] - Additional styles for the button container.
 * @param {Object} [props.textStyle] - Additional styles for the button text.
 * @param {boolean} [props.disabled] - Whether the button should be disabled.
 * @param {number} [props.activeOpacity] - Opacity value when the button is active.
 * @param {boolean} [props.loading] - Whether to show a loading indicator instead of the text.
 * @param {boolean} [props.enableAnimation] - Whether to enable the press animation.
 * @param {boolean} [props.filled] - Whether the button should be filled or bordered.
 *
 * @returns {ReactNode} Returns the custom button component.
 */
const CustomButton = ({
  onPress,
  onLongPress,
  title,
  iconLeft,
  iconRight,
  style,
  textStyle,
  disabled,
  activeOpacity,
  loading,
  enableAnimation = true,
  filled = true,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (enableAnimation) {
      scale.value = withTiming(0.95);
    }
  };

  const handlePressOut = () => {
    if (enableAnimation) {
      scale.value = withTiming(1);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const buttonStyle = filled ? styles.filledButton : styles.borderedButton;

  return (
    <Animated.View style={[styles.buttonContainer, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={activeOpacity}
        style={[buttonStyle, style]}
      >
        {iconLeft}
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
        {iconRight}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  filledButton: {
    backgroundColor: '#42a5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderedButton: {
    borderColor: '#42a5f5',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomButton;
