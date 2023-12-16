import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import BlastedImage from 'react-native-blasted-image';
import { ImageZoom } from '@likashefqet/react-native-image-zoom'; // https://github.com/likashefqet/react-native-image-zoom

const ImageComponent = ({
  source,
  resizeMode = 'cover',
  width,
  height,
  style,
  isBackground = false,
  fallbackSource = '',
  enableImageExpand = true,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useSharedValue(1);

  const pinchHandler = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 80 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!enableImageExpand}
        onPress={() => setModalVisible(true)}
      >
        <BlastedImage
          source={source}
          resizeMode={resizeMode}
          width={width}
          height={height}
          style={style}
          isBackground={isBackground}
          fallbackSource={fallbackSource}
          {...props}
        />

        {enableImageExpand ? (
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <GestureDetector gesture={pinchHandler}>
                <Animated.View style={[styles.expandedImage, animatedStyle]}>
                  <ImageZoom
                    uri={source?.uri}
                    minScale={0.5}
                    maxScale={3}
                    onInteractionStart={() => console.log('Interaction started')}
                    onInteractionEnd={() => console.log('Interaction ended')}
                    onPinchStart={() => console.log('Pinch gesture started')}
                    onPinchEnd={() => console.log('Pinch gesture ended')}
                    onPanStart={() => console.log('Pan gesture started')}
                    onPanEnd={() => console.log('Pan gesture ended')}
                    renderLoader={() => <ActivityIndicator />}
                    resizeMode="contain"
                  />
                </Animated.View>
              </GestureDetector>
            </TouchableOpacity>
          </Modal>
        ) : null}
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  expandedImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ImageComponent;
