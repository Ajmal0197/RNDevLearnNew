import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from './components/CustomButton';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* Other components */}
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
);

export default App;

const styles = StyleSheet.create({});
