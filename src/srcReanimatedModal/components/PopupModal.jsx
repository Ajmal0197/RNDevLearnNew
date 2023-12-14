import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Modal, StyleSheet } from 'react-native';
import Animated, {
  ZoomIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const PopupModal = ({ children, onDismiss, isVisible }) => {
  const opacity = useSharedValue(0);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * 0.6,
  }));

  useEffect(() => {
    opacity.value = withTiming(isVisible ? 1 : 0);
    if (!isVisible) Keyboard.dismiss();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.fullScreen}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
  },
});

export default PopupModal;
