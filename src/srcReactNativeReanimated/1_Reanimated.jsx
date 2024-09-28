import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  runOnJS,
  runOnUI,
} from 'react-native-reanimated';

export default function App() {
  // Shared values for animations
  const opacity = useSharedValue(1);    // Controls opacity
  const scale = useSharedValue(1);      // Controls scale
  const rotation = useSharedValue(0);   // Controls rotation in degrees
  const translateX = useSharedValue(0); // Controls horizontal translation
  const translateY = useSharedValue(0); // Controls vertical translation

  // ---- Animated Styles ----

  // Style for fading, scaling, and rotating the box
  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotation.value}deg` }, // Rotation in degrees
      ],
    };
  });

  // Style for dragging the box
  const dragStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // ---- Animation Functions ----

  // 1. Sequence Animation (withSequence)
  // This function fades the box out, scales it up, and rotates it sequentially.
  const runSequence = () => {
    opacity.value = withSequence(
      withTiming(0, { duration: 500 }), // First fade out
      withTiming(1, { duration: 500 })  // Then fade in
    );
    scale.value = withSequence(
      withTiming(1.5, { duration: 500 }), // Scale up
      withTiming(1, { duration: 500 })    // Scale back to original
    );
    rotation.value = withSequence(
      withTiming(180, { duration: 500 }), // Rotate 180 degrees
      withTiming(0, { duration: 500 })    // Rotate back to original
    );
  };

  // 2. Delayed Animation (withDelay)
  // This function scales up the box after a delay of 2000ms.
  const runDelayedAnimation = () => {
    scale.value = withDelay(1000, withSpring(1.5, { damping: 5 })); // Delayed scale up
  };

  // 3. Repeated Animation (withRepeat)
  // This function continuously rotates the box between 0 and 360 degrees.
  const runRepeatedAnimation = () => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }), // Rotate 360 degrees in 1 second
      -1, // Repeat forever (-1 means infinite)
      true // Reverse the direction on each iteration
    );
  };

  /**
   * 4. Running animations on the UI thread using a worklet
   *
   * Worklets run directly on the UI thread for optimal performance. They are useful for smooth animations
   * and interactions that should not be affected by the JS thread.
   *
   * In React Native, the UI thread is responsible for rendering and updating the visual elements, whereas the JavaScript thread handles the logic and data. Worklets avoid JS thread delays by running animations on the UI thread.
   * 
   * runOnUI() allows you to invoke a worklet from the JavaScript thread and run it on the UI thread.
   *
   * Use this for smooth gestures, animations, or any UI updates that need to happen independently of JavaScript logic.
   */
  const runOnUiThread = () => {
    runOnUI(() => {
      'worklet';  // This function is marked as a worklet, executed on the UI thread
      translateX.value = withSpring(50);  // Move the box 50px to the right
      translateY.value = withSpring(-50); // Move the box 50px upwards
      opacity.value = withTiming(1, { duration: 1000 }); // Fade in
    })();
  };

  /**
   * 5. Triggering a JavaScript function after an animation completes (runOnJS)
   *
   * Worklets cannot directly call JS functions since they run on the UI thread.
   * runOnJS() allows you to invoke a JS function from within a worklet after an animation or interaction finishes.
   *
   * Useful for triggering JS logic (e.g., showing alerts, navigating) after an animation or gesture.
   */
  const triggerJsAlert = () => {
    opacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) {
        runOnJS(showAlert)(); // Call a JS function after animation finishes
      }
    });
  };

  // JS Alert function to be called after animation completes
  const showAlert = () => {
    Alert.alert('Animation Complete!', 'The opacity animation has finished.');
    // Optionally trigger another UI thread animation after the alert
    runOnUiThread();
  };

  return (
      <View style={styles.container}>
        {/* Animated box with fade, scale, rotation, and drag */}
        <Animated.View style={[styles.box, animatedBoxStyle, dragStyle]} />

        <View style={styles.buttonContainer}>
          <Button title="Run Sequence" onPress={runSequence} />
          <Button title="Run Delayed Scale" onPress={runDelayedAnimation} />
          <Button title="Run Repeated Rotation" onPress={runRepeatedAnimation} />
        </View>

        {/* Run UI thread worklet */}
        <Button title="Run on UI Thread (Move)" onPress={runOnUiThread} />

        {/* Run JS alert after animation */}
        <Button title="Trigger JS Alert after animation" onPress={triggerJsAlert} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 10,
  },
});
