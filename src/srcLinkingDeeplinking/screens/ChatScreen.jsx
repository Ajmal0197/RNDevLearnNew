import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamily, fontSize } from '../../srcThemeingAndNetInfo/utils/fonts';

const ChatScreen = ({ route, navigation }) => {
  console.log('routeroute', route); // {"key": "Chat-m0i4LuhpJBiNNDUipBwd7", "name": "Chat", "params": {"id": "chat-211", "name": "Ajmal"}, "path": "chat/211/Ajmal"}
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <Text>Chatscreen</Text>
      <Text style={{ fontFamily: fontFamily.boldItalic, fontSize: fontSize.large }}>
        {route?.params?.id}-{route?.params?.name}
      </Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
