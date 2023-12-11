import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboard() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
}

/*
useKeyboard
AppState will change between one of 'active', 'background', or (iOS) 'inactive' when the app is closed or put into the background.

import { useKeyboard } from '@react-native-community/hooks'

const currentAppState = useKeyboard()
*/
