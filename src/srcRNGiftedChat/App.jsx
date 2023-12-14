import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage, Avatar } from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Send_Svg from './assets/svgs/send-svg.svg';
import Double_Down from './assets/svgs/double-down.svg';
import { fontFamily } from '../srcThemeingAndNetInfo/utils/fonts';
import LottieView from 'lottie-react-native';

const CustomInputToolbar = (props) => {
  const [text, setText] = useState('');

  const onSend = () => {
    if (text.trim() !== '') {
      props.onSend([{ text }]);
      setText('');
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5',
        paddingHorizontal: 8,
        paddingVertical: 5,
      }}
    >
      <TextInput
        placeholder="Type your message..."
        style={{
          flex: 1,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity onPress={onSend} style={{ marginLeft: 8 }}>
        <Send_Svg height={32} width={32} />
      </TouchableOpacity>
    </View>
  );
};

const renderChatEmpty = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ scaleY: -1 }], // Invert vertically
    }}
  >
    <LottieView
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'red',
      }}
      source={require('../srcSvgAndLottie/assets/lottie/BearLottie.lottie')}
      autoPlay
      loop
    />
  </View>
);

const dummyMessages = [
  {
    _id: '3bc50723-2410-460a-b20e-ef0e594b0b00',
    text: 'Hello!',
    createdAt: new Date(),
    user: {
      _id: 2, // Sender's ID
      name: 'Sender Name', // Sender's Name
      avatar:
        'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Sender's Avatar URL
    },
  },
  {
    _id: '4ccc34c5-e957-4258-93fa-7f2c452b2a82',
    text: 'Hi there!',
    createdAt: new Date(),
    user: {
      _id: 1, // my ID
      name: 'My Name', // My Name
      avatar:
        'https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Receiver's Avatar URL
    },
  },
];

export default function App({ route }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    BootSplash.hide();

    // sample dummy data // on screen it shown in reversed manner
    setMessages(dummyMessages);
  }, []);

  console.log('messages', JSON.stringify(messages, null, 2));

  const onSend = useCallback((newMessages = []) => {
    console.log('newMessages', JSON.stringify(newMessages, null, 2));

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, []);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#6646ee',
          borderRadius: 5,
        },
        left: {
          backgroundColor: 'cyan',
          borderRadius: 5,
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
          fontFamily: fontFamily.lightItalic,
        },
      }}
    />
  );

  const renderAvatar = (props) => (
    <Avatar
      {...props}
      containerStyle={{ right: { borderWidth: 3, borderColor: 'green', borderRadius: 50 } }}
    />
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646ee" />
    </View>
  );

  // const renderSend = (props) => (
  //   <Send {...props}>
  //     <View style={styles.sendingContainer}>
  //       <Send_Svg height={32} width={32} />
  //     </View>
  //   </Send>
  // );

  const scrollToBottomComponent = () => (
    <View style={styles.bottomComponentContainer}>
      <Double_Down height={32} width={32} />
    </View>
  );

  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      wrapperStyle={styles.systemMessageWrapper}
      textStyle={styles.systemMessageText}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            // current user info logged in
            _id: 1, // ID of the current user(me) (you can make it dynamic based on the logged-in user)
            name: 'My Name', // My Name
            avatar:
              'https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Receiver's Avatar URL
          }}
          placeholder="Type your message ..."
          alwaysShowSend
          showUserAvatar
          scrollToBottom
          renderBubble={renderBubble}
          renderLoading={renderLoading}
          // renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderSystemMessage={renderSystemMessage}
          renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
          renderAvatar={renderAvatar}
          renderAvatarOnTop
          onPressAvatar={(v) => alert(JSON.stringify(v))}
          onLongPressAvatar={(v) => alert(JSON.stringify(v))}
          onPress={(context, message) => alert(JSON.stringify(message))}
          onLongPress={(context, message) => alert(JSON.stringify(message))}
          renderChatEmpty={renderChatEmpty}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
