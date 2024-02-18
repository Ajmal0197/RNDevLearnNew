/* eslint-disable import/prefer-default-export */
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Permission request(android/ios) (https://rnfirebase.io/messaging/usage#ios---requesting-permissions)
export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFCMToken();
    } else {
      console.log('Permission Denied');
    }
  } else if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken();
    }
  }
}

// generate FCM token (https://rnfirebase.io/messaging/notifications#getting-a-device-token)
const getFCMToken = async () => {
  try {
    const fcmToken = storage.getString('FCM_Token');

    if (!fcmToken) {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      storage.set('FCM_Token', token);
      console.log('TOKEN>>>>IF', token);
    } else {
      console.log('TOKEN>>>>ELSE', fcmToken);
    }
  } catch ({ message }) {
    console.log('getFCMToken', message);
  }
};
