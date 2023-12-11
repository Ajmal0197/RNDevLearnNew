import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { StyleSheet, Text } from 'react-native';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { fontSize } from '../utils/fonts';
import { Colors } from '../utils/colors';
import { paddingTop, shadowBox } from '../utils/helper';
import { strings } from '../../srcMultilingual/i18n';

const NetInfoComp = () => {
  const [hasInternet, setHasInternet] = useState(true);
  useFocusEffect(
    useCallback(() => {
      const netInfoSubscription = NetInfo.addEventListener((state) => {
        setHasInternet(state.isConnected);
      });
      return () => {
        netInfoSubscription();
      };
    }, [])
  );
  return !hasInternet ? (
    <Animated.View entering={SlideInUp.delay(400)} style={styles.container}>
      <Text style={styles.text1}>{strings('common.noInternet')}</Text>
      <Text numberOfLines={1} style={styles.text2}>
        {strings('common.plzCheckInternet')}
      </Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 15,
    position: 'absolute',
    zIndex: 1,
    top: paddingTop(),
    marginHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderStartWidth: 5,
    borderColor: Colors.commonRed,
    ...shadowBox(),
  },
  text1: { textAlign: 'left', fontSize: fontSize.large, fontWeight: 'bold', marginBottom: 5 },
  text2: { textAlign: 'left', fontWeight: '500' },
});

export default NetInfoComp;
