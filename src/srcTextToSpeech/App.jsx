import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { initializeTtsListeners, playTTS } from './utils/ttsListners';

const App = () => {
  useEffect(() => {
    initializeTtsListeners();

    setTimeout(() => {
      playTTS('Hello World! This is text to speech implementation, Keep Coding!!!.');
    }, 1000);
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
