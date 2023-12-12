/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging'

// import App from './src/srcReduxToolkit/App';
// import App from './src/srcAppPerformance/reactMemo';
// import App from './src/srcAppPerformance/useCallback';
// import App from './src/srcAppPerformance/useMemo';
// import App from './src/srcDynamicTextInput';
// import App from './src/srcSharedElementReanimated/App';
// import App from './src/srcMultilingual/App';
// import App from './src/srcThemeingAndNetInfo/App';
// import App from './src/srcSvg/App';
// import App from './src/srcSvgAndLottie/App';
// import App from './src/srcRNGiftedChat/App';
// import App from './src/srcLinkingDeeplinking/App';
// import App from './src/srcReduxToolkit/App';
import App from './src/srcFirebase/App';

// 1---
// notifee.onBackgroundEvent(async ({ type, detail }) => {
//     const { notification, pressAction } = detail;

//     // Check if the user pressed the "Mark as read" action
//     if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//       // Remove the notification
//       await notifee.cancelNotification(notification.id);
//     }
//   });
// OR
// 2 ----
// import messaging from '@react-native-firebase/messaging'
// import { onDisplayNotification } from './src/services/NotificationService'
// // Register background handler ; ref: https://rnfirebase.io/messaging/usage#background--quit-state-messages
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   alert(JSON.stringify(remoteMessage))
// })

AppRegistry.registerComponent(appName, () => App);
