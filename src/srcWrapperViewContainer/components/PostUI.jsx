import React from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';

const OneImage = () => (
  <View style={styles.container}>
    <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.bigImage} />
  </View>
);
const TwoImage = () => (
  <View style={styles.container}>
    {/* First Image Post */}
    <View
      style={{
        ...styles.imageContainer2,
        marginEnd: 5, // Add margin between image posts
      }}
    >
      <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image2} />
    </View>

    {/* Second Image Post */}
    <View style={styles.imageContainer2}>
      <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image2} />
    </View>
  </View>
);
const ThreeOrMoreImage = () => (
  <View style={styles.container}>
    {/* Left section with the big image */}
    <View style={styles.leftSection}>
      <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.bigImage} />
    </View>

    {/* Right section with two smaller images */}
    <View style={styles.rightSection}>
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style={{ ...styles.smallImage, marginBottom: 5 }}
      />
      <ImageBackground source={{ uri: 'https://picsum.photos/200/300' }} style={styles.smallImage}>
        <View style={styles.containerIB}>
          <Text style={styles.textIB}>1+</Text>
        </View>
      </ImageBackground>
    </View>
  </View>
);

const PostUI = ({ images = [] }) => {
  const renderUIImage = (images) => {
    const imageLength = (images && images.length) || 0;
    switch (imageLength) {
      case 0:
        return <View />;
      case 1:
        return <OneImage images={images} />;
      case 2:
        return <TwoImage images={images} />;
      default:
        return <ThreeOrMoreImage images={images} />;
    }
  };

  return <View style={styles.mainContainer}>{renderUIImage(images)}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Add space between left and right sections
    height: 200,
  },
  leftSection: {
    flex: 2, // Takes 1/3 of the available space
    marginEnd: 5,
  },
  rightSection: {
    flex: 1, // Takes 2/3 of the available space
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'space-between', // Add space between the two smaller images
  },
  bigImage: {
    flex: 1, // Take the full height of the left section
    borderRadius: 8, // Optional: Add borderRadius for styling
  },
  smallImage: {
    width: '100%', // Take the full width of the right section
    flex: 1,
    borderRadius: 8, // Optional: Add borderRadius for styling
    overflow: 'hidden',
  },
  containerIB: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 5,
  },
  textIB: {
    fontSize: 30,
    fontWeight: '500',
    color: 'yellow',
  },
  imageContainer2: {
    flex: 1, // Take equal space in the row
  },
  image2: {
    width: '100%',
    flex: 1, // Set a fixed height or adjust as needed
    borderRadius: 8, // Optional: Add borderRadius for styling
    resizeMode: 'cover', // or 'contain' based on your preference
  },
});

export default PostUI;
