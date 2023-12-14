import { View, StyleSheet, FlatList } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import VideoPost from './components/VideoPost';
import BootSplash from 'react-native-bootsplash';
import { FlashList } from '@shopify/flash-list';

const dummyPosts = [
  {
    id: '2',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
    caption: 'Caption of the post',
  },
  {
    id: '1',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
    caption: 'Hey there',
  },
  {
    id: '3',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
    caption: 'Hola',
  },
  {
    id: '4',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
    caption: 'Piano practice',
  },
  {
    id: '5',
    video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
    caption: 'Hello World!',
  },
];

const FeedScreen = () => {
  const flatListRef = useRef();
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    BootSplash.hide();

    const fetchPosts = async () => {
      // fetch posts from the server
      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const firstViewableItem = viewableItems[0];
    if (firstViewableItem && firstViewableItem.isViewable) {
      setActivePostId(firstViewableItem?.index);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged,
    },
  ]);

  const onEndReached = () => {
    // fetch more posts from database
    setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  };

  return (
    <View style={styles.container}>
      <FlashList
        flatListRef={flatListRef}
        data={posts}
        renderItem={({ item, index }) => (
          <VideoPost post={item} activePostId={activePostId} index={index} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={3}
        estimatedItemSize={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default FeedScreen;
