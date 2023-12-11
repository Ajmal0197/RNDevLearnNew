import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export function useAppState() {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);

  function onChange(newState: AppStateStatus) {
    setAppState(newState);
  }

  useEffect(() => {
    AppState.addEventListener('change', onChange);

    return () => {
      AppState.removeEventListener('change', onChange);
    };
  }, []);

  return appState;
}

export {AppStateStatus};

/*
useAppState
AppState will change between one of 'active', 'background', or (iOS) 'inactive' when the app is closed or put into the background.

import { useAppState } from '@react-native-community/hooks'

const currentAppState = useAppState()
*/
