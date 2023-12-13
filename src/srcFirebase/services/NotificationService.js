import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

// method was called to get FCM tiken for notification
export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  try {
    token = await messaging().getToken();
    console.log('getFcmToken-->', token);
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }
  return token;
};

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then((result) => {
      console.log('POST_NOTIFICATIONS status:', result);
    })
    .catch((error) => {
      console.log('POST_NOTIFICATIONS error ', error);
    });
};

// method was called to listener events from firebase for notification trigger
export function registerListenerWithFCM() {
  // FOREGROUND HANDLER ; ref: https://rnfirebase.io/messaging/usage#foreground-state-messages
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    alert(JSON.stringify(remoteMessage));
    //
    console.log('onMessage Received : ', JSON.stringify(remoteMessage));
    if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data
      );
    }
  });
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit/background state:', remoteMessage);
      }
    });

  return unsubscribe;
}

// method was called to display notification
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

export async function localDisplayNotificationSample() {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  notifee.displayNotification({
    title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    subtitle: '&#129395;',
    body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
    android: {
      channelId,
      color: '#4caf50',
      actions: [
        {
          title: '<b>Dance</b> &#128111;',
          pressAction: { id: 'dance' },
        },
        {
          title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          pressAction: { id: 'cry' },
        },
      ],
    },
  });
}

const checkPermissions = async () => {
  if (Platform.OS === 'ios') {
    const settings = await notifee.requestPermission();
    return Boolean(
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    );
  }
  const settings =
    Platform.OS === 'android' && Platform.Version >= 33
      ? await notifee.requestPermission()
      : await notifee.getNotificationSettings();
  const channel = await notifee.getChannel('MyChannelID');
  return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED && !channel?.blocked;
};

const notifPermissionCancelAlert = () => {
  Alert.alert('Enable Notifications', 'To receive notifications opt in from your Settings.', [
    { text: 'Cancel' },
    {
      text: 'Settings',
      onPress: async () => {
        if (Platform.OS === 'ios') {
          await Linking.openSettings();
        } else {
          await notifee.openNotificationSettings();
        }
      },
    },
  ]);
};
