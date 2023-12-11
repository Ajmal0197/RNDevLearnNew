import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamily, fontSize } from '../../srcThemeingAndNetInfo/utils/fonts';

const ProfileScreen = ({ route, navigation }) => (
  <View style={{ flex: 1, backgroundColor: 'green' }}>
    <Text>
      ProfileScreen Param is{' '}
      <Text style={{ fontFamily: fontFamily.boldItalic, fontSize: fontSize.large }}>
        {+route?.params?.id}
      </Text>
    </Text>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({});
