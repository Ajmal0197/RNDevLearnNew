import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const RenderItem = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    // Animated.View for fading in the item with delay based on index
    <Animated.View entering={FadeInDown.delay(200 * index)}>
      <Pressable
        style={styles.container}
        onPress={() => {
          navigation.navigate('Details', { item: item });
        }}
      >
        {/* Animated.Image with sharedTransitionTag is used to create a visually appealing shared element transition between screens when navigating, ensuring a smooth animation of the image as it moves from one screen to another. */}
        <Animated.Image source={item.image} style={styles.image} sharedTransitionTag={item.name} />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textLocation}>{item.location}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  textContainer: {
    margin: 20,
    flexShrink: 1,
    gap: 10,
  },
  textName: {
    color: '#323232',
    fontSize: 28,
    fontWeight: 'bold',
  },
  textLocation: {
    color: '#323232',
    fontSize: 18,
  },
});
