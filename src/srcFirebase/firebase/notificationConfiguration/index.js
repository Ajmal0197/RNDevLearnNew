import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { NavigationService } from '../../services/NavigationService';
// import Clipboard from '@react-native-clipboard/clipboard';
// import { LOGIN_WITH_CREDS_SCREEN } from '../routes/navigationConstants';

// method was called to get FCM token for notification
export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  try {
    token = await messaging().getToken();
    console.log('getFcmToken-->', token);

    Alert.alert('TOKEN', token, [
      { text: 'Cancel' },
      {
        text: 'Copy',
        onPress: async () => {
          // Clipboard.setString(token);
        },
      },
    ]);
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
    console.log('onMessage Received : ', remoteMessage);
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
        const notifDetail = detail?.notification;
        if (notifDetail) {
          navigateFromNotificationEvent(notifDetail?.data);
        }
        break;
      default:
        return null;
    }
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit/background state:', remoteMessage);
        navigateFromNotificationEvent(remoteMessage?.data);
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

  // Display a custom style notification
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

export const navigateFromNotificationEvent = (data = {}, title = null, body = null) => {
  console.log('navigateFromNotificationEvent', data);
  setTimeout(() => {
    if (NavigationService?.navigate) {
      // switch (true) {
      //   case true:
      //     return NavigationService.navigate(LOGIN_WITH_CREDS_SCREEN);
      //   default:
      //     break;
      // }
    }
  }, 1000);
};

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

const checkBatteryOptimisationEnabled = async () => {
  // 1. checks if battery optimization is enabled
  const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    // 2. ask your users to disable the feature
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => notifee.openBatteryOptimizationSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }
};

const checkPowerManagerInfo = async () => {
  // 1. get info on the device and the Power Manager settings
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    // 2. ask your users to adjust their settings
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => notifee.openPowerManagerSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }
};
