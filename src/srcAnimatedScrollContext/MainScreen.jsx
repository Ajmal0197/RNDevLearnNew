import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { withTiming } from 'react-native-reanimated';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';
import { useSharedState } from './SharedContext';

const MainScreen = () => {
  const { scrollY, scrollYGlobal, scrollToTop } = useSharedState();
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    const isScrollingDown = currentScrollY > 100;
    scrollY.value = isScrollingDown
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 });
    scrollYGlobal.value = currentScrollY;
  };

  const handleScrollToTop = () => {
    scrollToTop();
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const data = Array.from({ length: 50 }, (_, i) => ({ id: String(i), text: `Item ${i + 1}` }));

  return (
    <View style={styles.container}>
      <Header />
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
          </View>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 100 }}
      />
      <ScrollToTopButton onPress={handleScrollToTop} />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
