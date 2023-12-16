import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ViewWrapper from './components/ViewWrapper';
import CustomButton from './components/CustomButton';
import CustomTextInput from './components/CustomTextInput';
import ImageComponent from './components/ImageComponent';
import ContinuousScrollBannerModal from './components/ImageGallery';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   // Preload images when the component mounts
  //   BlastedImage.preload([
  //     { uri: 'https://example.com/image1.jpg' },
  //     { uri: 'https://example.com/image2.jpg', skipMemoryCache: true },
  //   ]);
  // }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <ViewWrapper hideTopSafeArea>
        <View style={styles.container}>
          <Text>Your TOP Content Goes Here</Text>

          <ImageComponent
            source={{ uri: 'https://picsum.photos/200/300' }}
            resizeMode="cover"
            width={200}
            height={200}
            style={{ borderRadius: 10 }}
            isBackground
            enableImageExpand={false}
          >
            <Text>Your TOP Content Goes Here</Text>
            <Text>Your TOP Content Goes Here</Text>
            <Text>Your TOP Content Goes Here</Text>
          </ImageComponent>
          <ImageComponent
            source={{ uri: 'https://picsum.photos/200/300' }}
            resizeMode="cover"
            width={200}
            height={200}
            style={{ borderRadius: 100 }}
            isBackground
          />

          <CustomTextInput
            placeholder="Text input"
            errorText="THIS IS ERROR TEXT"
            type="password"
          />

          <CustomButton
            onPress={openModal}
            onLongPress={() => {
              // Handle button long-press event
            }}
            title="Open Gallery"
            iconLeft={null}
            iconRight={null}
            style={styles.customButton}
            textStyle={styles.customButtonText}
            loading={false}
            // ... Other props
          />
          <ContinuousScrollBannerModal visible={modalVisible} onClose={closeModal} />
        </View>
      </ViewWrapper>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default App;
