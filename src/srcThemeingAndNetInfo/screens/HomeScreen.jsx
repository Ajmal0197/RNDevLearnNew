// PASSING INLINE THEME COLOR PASS AS PROP TO EACH COMPONENT

import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fontFamily, fontSize } from '../utils/fonts';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.themeColor }}>
      <Text style={styles.quicksandRegular}>This text uses a quick sand font</Text>
      <Text style={styles.quicksandLight}>This text uses a quick sand light font</Text>
      <Text style={styles.ralewayThin}>This text uses a thin italic raleway font</Text>
      <Text style={styles.ralewayItalic}>This text uses a thin italic raleway font</Text>

      <Text style={styles.textTop(colors)}>
        This is demo of default dark/light theme using navigation.
      </Text>
      <TextInput style={styles.textInput(colors)} placeholder="Type here" />
      <TouchableOpacity style={styles.touchable(colors)}>
        <Text
          onPress={() => navigation.navigate('NewHomeScreen')}
          style={styles.touchableText(colors)}
        >
          THIS IS HOMESCREEN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textTop: (colors) => ({ color: colors.white, marginTop: 33 }),
  textInput: (colors) => ({
    borderColor: colors.gray,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    marginTop: 20,
    color: colors.white,
  }),
  touchable: (colors) => ({
    backgroundColor: colors.sky,
    padding: 10,
    borderRadius: 6,
    width: '100%',
    height: 57,
    justifyContent: 'center',
    marginTop: 20,
  }),
  touchableText: (colors) => ({
    textAlign: 'center',
    color: colors.commonWhite,
    fontSize: 20,
    fontWeight: '500',
  }),

  quicksandRegular: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
  },
  quicksandLight: {
    fontFamily: fontFamily.semiBoldItalic,
    fontSize: fontSize.extraSmall,
  },
  ralewayItalic: {
    fontFamily: fontFamily.boldItalic,
    fontSize: fontSize.large,
  },
  ralewayThin: {
    fontFamily: fontFamily.lightItalic,
    fontSize: fontSize.extraLarge,
  },
});

export default HomeScreen;
