// eslint-disable-next-line no-unused-vars
import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

function getWindowOrientation() {
  const {width, height} = Dimensions.get('window');
  return height >= width ? 'P' : 'L';
}

export function useDeviceOrientation() {
  const [deviceOrientation, setDeviceOrientation] =
    useState(getWindowOrientation);

  useEffect(() => {
    function updateState() {
      setDeviceOrientation(getWindowOrientation());
    }
    Dimensions.addEventListener('change', updateState);
    return () => Dimensions.removeEventListener('change', updateState);
  }, []);

  return deviceOrientation;
}

/*
useDeviceOrientation
import { useDeviceOrientation } from '@react-native-community/hooks'

const orientation = useDeviceOrientation()

console.log('is orientation portrait: ', orientation)
console.log('is orientation landscape: ', orientation)
*/
