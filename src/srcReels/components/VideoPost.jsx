import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import Send_Svg from '../assets/svgs/send-svg.svg';
import Double_Down from '../assets/svgs/double-down.svg';

const VideoPost = ({ post, activePostId, index = 0 }) => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { height } = useWindowDimensions();

  console.log('VideoPostVideoPost', isPlaying, activePostId, index, activePostId === index);

  return (
    <View style={[styles.container, { height }]}>
      <Video
        ref={video}
        style={[StyleSheet.absoluteFill, styles.video]}
        source={{ uri: post.video }}
        resizeMode="cover"
        paused={!isPlaying || activePostId === index}
        onError={(e) => console.log('onError', e)} // Callback when video cannot be loaded
        repeat
      />
      <Pressable onPress={() => setIsPlaying((v) => !v)} style={styles.content}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        {!isPlaying && (
          <Send_Svg
            style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
            height={70}
            width={70}
          />
        )}
        <SafeAreaView style={{ flex: 1, paddingBottom: 34 }}>
          <View style={styles.footer}>
            {/* bottom: caption */}
            <View style={styles.leftColumn}>
              <Text style={styles.caption}>{post.caption}</Text>
            </View>

            <View style={styles.rightColumn}>
              <Double_Down height={32} width={32} />
              <Double_Down height={32} width={32} />
              <Double_Down height={32} width={32} />
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  video: {},
  content: {
    flex: 1,
    padding: 10,
  },
  overlay: {
    top: '50%',
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  leftColumn: {
    flex: 1,
  },
  caption: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 18,
  },
  rightColumn: {
    gap: 10,
  },
});

export default VideoPost;
