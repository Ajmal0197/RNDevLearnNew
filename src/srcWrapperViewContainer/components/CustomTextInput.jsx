import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Send_Svg from '../../srcRNGiftedChat/assets/svgs/send-svg.svg';
import Double_Down from '../../srcRNGiftedChat/assets/svgs/double-down.svg';

const CustomTextInput = ({
  type = 'text', // Default to text input
  placeholder,
  textInputStyles,
  wrapperStyles,
  errorText,
  iconSize = 25,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Send_Svg height={iconSize} width={iconSize} />;
      case 'phone':
        return <Double_Down height={iconSize} width={iconSize} />;
      case 'password':
        return (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Send_Svg height={iconSize} width={iconSize} />
            ) : (
              <Double_Down height={iconSize} width={iconSize} />
            )}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, wrapperStyles]}>
      <View style={[styles.tiContainer, errorText && styles.errorContainer]}>
        {getIcon()}
        <TextInput
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          placeholderTextColor="grey"
          secureTextEntry={type === 'password' && !isPasswordVisible}
          style={[styles.input, textInputStyles]}
          placeholder={placeholder}
        />
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tiContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },

  errorContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default CustomTextInput;
