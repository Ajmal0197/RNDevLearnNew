import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBackHandler(handler: () => boolean) {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handler);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handler);
    }, [handler]),
  );
}

/*
useBackHandler
import { useBackHandler } from '@react-native-community/hooks'

useBackHandler(() => {
  if (shouldBeHandledHere) {
    // handle it
    return true
  }
  // let the default thing happen
  return false
})
*/
