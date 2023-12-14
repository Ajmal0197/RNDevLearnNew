/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';

BootSplash.hide();

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
// import App from './src/srcFirebase/App';
// import App from './src/srcMultipleEnvConfig/App';
// import App from './src/srcRNKeychainBiometric/App';
// import App from './src/srcReels/App';
// import App from './src/srcReanimatedBottomSheet/App';
// import App from './src/srcReanimatedAccordion/App';
// import App from './src/srcAnimatedBottomTabBar/App';
// import App from './src/srcCustomAnimatedSwitch/App';
// import App from './src/srcCustomAnimatedCheckbox/App';
// import App from './src/srcImageCarousel/App';
// import App from './src/srcRangeSlider/App';
// import App from './src/srcOnboardingScreen/App';
// import App from './src/srcCustomToast/App';
// import App from './src/srcStackCarousel/App';
// import App from './src/srcFloatingActionButton/App';
import App from './src/srcCustomDrawer/App';

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
