import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ViewWrapper from './components/ViewWrapper';

const App = () => (
  <SafeAreaProvider>
    <ViewWrapper hideBottomSafeArea>
      <View style={styles.container}>
        <Text>Your TOP Content Goes Here</Text>
        <Text>Your BOTTOM Content Goes Here</Text>
      </View>
    </ViewWrapper>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;
