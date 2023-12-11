/*
SVG CONFIGURATION:
1. Install 
a) yarn add react-native-svg
b) yarn add --dev react-native-svg-transformer && cd ios && pod install

2. Update `metro.config.js`
3. Clean cache and run app
*/

/*
LOTTIE CONFIGURATION:
1. Install 
a) yarn add lottie-react-native && cd ios && pod install

2. Update `metro.config.js`, if want to use .lottie extenions files(.lottie are more concise than .json files), for .json files no change required
3. Clean cache and run app
*/

import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WhatsappSVG from './assets/svgs/whatsappPremium.svg';
import BootSplash from 'react-native-bootsplash';
import LottieView from 'lottie-react-native';

const App = () => {
  const animationRefLottie = useRef(null);

  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WhatsappSVG width={50} height={50} />

        <LottieView
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'red',
            marginVertical: 20,
          }}
          source={require('./assets/lottie/DeveloperLottie.json')}
          autoPlay
          loop
        />

        <LottieView
          ref={animationRefLottie}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'red',
          }}
          source={require('./assets/lottie/BearLottie.lottie')}
          autoPlay
          loop
        />

        {/*APIS: https://github.com/lottie-react-native/lottie-react-native/blob/master/docs/api.md */}
        <View style={{ flexDirection: 'row' }}>
          <Button title="Play" onPress={() => animationRefLottie.current?.play()} />
          <Button title="Pause" onPress={() => animationRefLottie.current?.pause()} />
          <Button title="Resume" onPress={() => animationRefLottie.current?.resume()} />
          <Button title="Reset" onPress={() => animationRefLottie.current?.reset()} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
