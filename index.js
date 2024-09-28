/* eslint-disable camelcase */
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import { name as appName } from './app.json';
import { navigateFromNotificationEvent } from './src/srcFirebase/firebase/notificationConfiguration';

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
// import App from './src/srcReduxToolkit/reduxRTKQuery/App';
// import App from './src/srcFirebase/App';
// import App from './src/srcFirebaseDeeplinkNotifRedirect/App';
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
// import App from './src/srcCustomDrawer/App';
// import App from './src/srcReanimatedModal/App';
// import App from './src/srcReanimatedModal/App';
// import App from './src/srcReanimatedProgressBarLine/App';
// import App from './src/srcCustomButton/App';
// import App from './src/srcWrapperViewContainer/App';
// import { A_Component, B_Navigation, C_Redux } from './src/srcTypescript';
// import App from './src/srcRNUnistyles/App';
// import App from './src/srcNativeBridging/App';
// import App from './src/srcRealmDB/App';
import App from './src/srcReactNativeReanimated';

// Register background handler ; ref: https://rnfirebase.io/messaging/usage#background--quit-state-messages
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('setBackgroundMessageHandler1', JSON.stringify(remoteMessage));
  navigateFromNotificationEvent(remoteMessage?.data);
});

BootSplash.hide();

AppRegistry.registerComponent(appName, () => App);
