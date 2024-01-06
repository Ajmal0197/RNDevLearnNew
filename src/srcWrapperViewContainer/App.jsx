import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ViewWrapper from './components/ViewWrapper';
import CustomButton from './components/CustomButton';
import CustomTextInput from './components/CustomTextInput';
import ImageComponent from './components/ImageComponent';
import ContinuousScrollBannerModal from './components/ImageGallery';
import PostUI from './components/PostUI';
import downloadHelperWithPermission from '../srcThemeingAndNetInfo/utils/helperDownloadUpload';

const { width, height } = Dimensions.get('screen');

const SkeletonLoader = () => (
  <SkeletonPlaceholder borderRadius={4}>
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10 }}>
      <View style={{ width: 60, height: 60, borderRadius: 50 }} />
      <View style={{ marginLeft: 20 }}>
        <View style={{ width: width / 2, height: 20 }} />
        <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
      </View>
    </View>
  </SkeletonPlaceholder>
);

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

  const downloadFile = () => {
    const downloadParams = {
      url: 'https://picsum.photos/200/300',
      filename: 'newImage',
      fileType: 'image',
    };
    downloadHelperWithPermission(downloadParams);
  };

  return (
    <SafeAreaProvider>
      <ViewWrapper hideTopSafeArea>
        <ScrollView style={styles.container}>
          <Text>Your TOP Content Goes Here</Text>
          <View style={{ height: 20 }} />
          <SkeletonLoader />
          <View style={{ height: 20 }} />

          <Button title="Download" onPress={downloadFile} />

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
          <View style={{ height: 20 }} />

          <ImageComponent
            source={{ uri: 'https://picsum.photos/200/300' }}
            resizeMode="cover"
            width={200}
            height={200}
            style={{ borderRadius: 100 }}
          />
          <View style={{ height: 20 }} />

          <PostUI images={[2, 2, 3]} />
          <View style={{ height: 20 }} />

          <CustomTextInput
            placeholder="Text input"
            errorText="THIS IS ERROR TEXT"
            type="password"
          />
          <View style={{ height: 20 }} />

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
          <View style={{ height: 111 }} />
        </ScrollView>
      </ViewWrapper>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 100,
  },
});

export default App;
