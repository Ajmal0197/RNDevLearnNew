/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import App from './src/srcFirebase/App';

// 1---
// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   const { notification, pressAction } = detail;
//   console.log('setBackgroundMessageHandler0', JSON.stringify(detail));
//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//     // Remove the notification
//     await notifee.cancelNotification(notification.id);
//   }
// });
// OR
// 2 ----
// Register background handler ; ref: https://rnfirebase.io/messaging/usage#background--quit-state-messages
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('setBackgroundMessageHandler1', JSON.stringify(remoteMessage));
});

AppRegistry.registerComponent(appName, () => App);
