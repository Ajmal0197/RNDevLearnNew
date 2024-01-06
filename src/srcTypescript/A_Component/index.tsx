import { StyleSheet, View,  } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ClassComponent from './ClassComponent'
import FunctionComponent from './FunctionComponent'


const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <ClassComponent name='Ajmal'  age={10} email='ah@gmail.com'/>
        <View style={{height:100}}/>
        <FunctionComponent/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
