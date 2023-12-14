import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBar from './components/ProgressBar';
import SetterButton from './components/SetterButton';

export default function App() {
  const [progress, setProgress] = React.useState(0);

  return (
    <View style={styles.mainview}>
      <ProgressBar progress={progress} style={{ paddingHorizontal: 10 }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <SetterButton progressValue={0} onPress={() => setProgress(0)} />
        <SetterButton progressValue={25} onPress={() => setProgress(25)} />
        <SetterButton progressValue={75} onPress={() => setProgress(75)} />
        <SetterButton progressValue={100} onPress={() => setProgress(100)} />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  mainview: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 100,
  },
});
