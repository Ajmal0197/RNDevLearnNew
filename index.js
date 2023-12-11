/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging'

// import App from './src/srcReduxToolkit/App';
// import App from './src/srcAppPerformance/reactMemo';
// import App from './src/srcAppPerformance/useCallback';
// import App from './src/srcAppPerformance/useMemo';
// import App from './src/srcDynamicTextInput';
// import App from './src/srcSharedElementReanimated/App';
// import App from './src/srcMultilingual/App';
import App from './src/srcThemeingAndNetInfo/App';
// import App from './src/srcSvg/App';
// import App from './src/srcSvgAndLottie/App';
// import App from './src/srcRNGiftedChat/App';
// import App from './src/srcLinkingDeeplinking/App';
// import App from './src/srcReduxToolkit/App';
// import App from './src/srcFirebase/App';

AppRegistry.registerComponent(appName, () => App);
