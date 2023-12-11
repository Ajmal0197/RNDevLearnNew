// USING USEMEMO HOOK FOR GENERATING STYLES

import React, { useMemo } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const NewHomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const stylesNew = useMemo(() => styles(colors), [colors]);

  return (
    <View style={{ ...stylesNew.container, backgroundColor: colors.themeColor }}>
      <Text style={stylesNew.textTop}>
        This is demo of default dark/light theme using navigation.
      </Text>
      <TextInput style={stylesNew.textInput} placeholder="Type here" />
      <TouchableOpacity style={stylesNew.touchable}>
        <Text onPress={() => navigation.goBack()} style={stylesNew.touchableText}>
          THIS IS NEWHOMESCREEN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    textTop: { color: colors.white },
    textInput: {
      borderColor: colors.gray,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: '100%',
      marginTop: 20,
      color: colors.white,
    },
    touchable: {
      backgroundColor: colors.sky,
      padding: 10,
      borderRadius: 6,
      width: '100%',
      height: 57,
      justifyContent: 'center',
      marginTop: 20,
    },
    touchableText: {
      textAlign: 'center',
      color: colors.commonWhite,
      fontSize: 20,
      fontWeight: '500',
    },
  });

export default NewHomeScreen;
