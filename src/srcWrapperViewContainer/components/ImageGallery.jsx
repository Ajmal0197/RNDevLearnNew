import React from 'react';
import { Dimensions, StyleSheet, Modal, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { sampleImages } from './constants';

const { width, height } = Dimensions.get('screen');

const ContinuousScrollBannerReanimated = () => {
  const scrollStarted = useSharedValue(0);
  const scroll = useSharedValue(1);
  const scrollRef = useAnimatedRef();

  useDerivedValue(() => {
    scrollTo(scrollRef, scroll.value * width, 0, false);
  });

  const scrollValue = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = () => {
    if (scrollStarted.value === true) {
      const val = Math.round(scrollValue.value / width);
      if (val === 0) {
        scroll.value = sampleImages.length - 2;
      } else if (val === sampleImages.length - 1) {
        scroll.value = 1;
      } else {
        scroll.value = val;
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={() => {
          scrollStarted.value = true;
        }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {sampleImages.map((x, i) => (
          <View key={i} style={styles.expandedImage}>
            <ImageZoom uri={x?.download_url} />
          </View>
        ))}
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
};

const ContinuousScrollBannerModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} />
        <ContinuousScrollBannerReanimated />
      </View>
    </Modal>
  );
};

export default ContinuousScrollBannerModal;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  expandedImage: {
    height,
    width,
  },
  imageItem: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: 50,
    right: 20,
    backgroundColor: 'yellow',
    height: 25,
    width: 25,
    borderRadius: 20,
    // Add styles for your close button
  },
});
