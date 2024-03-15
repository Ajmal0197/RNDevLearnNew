import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import Config from 'react-native-config';
import { PermissionsAndroid, Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Notification Permission popup
// https://rnfirebase.io/messaging/usage#ios---requesting-permissions
// https://rnfirebase.io/messaging/usage#android---requesting-permissions
export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  } else if (Platform.OS === 'ios') {
    await messaging().requestPermission();
  }
}

// Showing foreground notification
// https://notifee.app/react-native/docs/displaying-a-notification
export async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification: ', JSON.stringify(data));

  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export function registerListenerWithFCM() {
  // THis will be called when app is in background/killed and user clicks on notification
  // we can handle navigation here using NavigationService
  // https://rnfirebase.io/reference/messaging#getInitialNotification
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit/background state:', remoteMessage);
        // navigateFromNotificationEvent(remoteMessage?.data);
      }
    });

  // This event will be called when app is in foreground
  // FOREGROUND HANDLER; ref: https://rnfirebase.io/messaging/usage#foreground-state-messages
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log('onMessage Received : ', remoteMessage);
    if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data
      );
    }
  });

  // https://notifee.app/react-native/docs/events#foreground-events
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        // const notifDetail = detail?.notification;
        // if (notifDetail) {
        //   navigateFromNotificationEvent(notifDetail?.data);
        // }
        break;
      default:
        return null;
    }
  });

  return unsubscribe;
}

const subscribeToTopic = async () => {
  await messaging().subscribeToTopic(Config.topicFCM);
};

const unsubscribeFromTopic = async () => {
  await messaging().unsubscribeFromTopic(Config.topicFCM);
};

export const getFCMToken = async () => {
  const fcmToken = storage.getString('KEY_APP_TOKEN');

  try {
    if (!fcmToken) {
      // await messaging().registerDeviceForRemoteMessages(); //not required as already mentioned in Firebase.json
      const token = await messaging().getToken();
      storage.set('KEY_APP_TOKEN', `${token}`);

      subscribeToTopic();
      requestUserPermission();
      console.log('TOKEN>>>>IF', token);
      return token;
    }
    console.log('TOKEN>>>>ELSE', fcmToken);
    return fcmToken;
  } catch ({ message }) {
    console.log('getFCMToken', message);
    return fcmToken;
  }
};
