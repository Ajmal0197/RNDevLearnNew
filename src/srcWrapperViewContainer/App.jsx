import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ViewWrapper from './components/ViewWrapper';
import CustomButton from './components/CustomButton';
import CustomTextInput from './components/CustomTextInput';
import ImageComponent from './components/ImageComponent';

const App = () => (
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

        <CustomTextInput placeholder="Text input" errorText="THIS IS ERROR TEXT" type="password" />

        <CustomButton
          onPress={() => {
            // Handle button press event
          }}
          onLongPress={() => {
            // Handle button long-press event
          }}
          title="Button"
          iconLeft={null}
          iconRight={null}
          style={styles.customButton}
          textStyle={styles.customButtonText}
          loading={false}
          // ... Other props
        />
      </View>
    </ViewWrapper>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default App;
