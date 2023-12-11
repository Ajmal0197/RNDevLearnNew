import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const RenderItemGrid = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    // Animated.View for fading in the item with delay based on index
    <Animated.View entering={FadeInDown.delay(100 * index)}>
      <Pressable
        style={styles.container}
        onPress={() => {
          navigation.navigate('Details', { item });
        }}
      >
        {/* Animated.Image with sharedTransitionTag is used to create a visually appealing shared element transition between screens when navigating, ensuring a smooth animation of the image as it moves from one screen to another. */}
        <Animated.Image source={item.image} style={styles.image} sharedTransitionTag={item.name} />
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textLocation}>{item.location}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default RenderItemGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingBottom: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  textName: {
    color: '#323232',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  textLocation: {
    color: '#323232',
    fontSize: 12,
  },
});
