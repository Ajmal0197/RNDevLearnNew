/**
 * Firebase Configuration
 */
import crashlytics from '@react-native-firebase/crashlytics';
import firebase from '@react-native-firebase/app';
import Config from 'react-native-config';
import { loadLanguageCode } from '../../../srcMultilingual/storage/asyncStorage';
import { AR } from '../../../srcMultilingual/constants';

const firebaseCrashlyticsConfiguration = async () => {
  const userLanguage = await loadLanguageCode();
  const defaultHandler = global.ErrorUtils.getGlobalHandler();
  const crashlytic = firebase.crashlytics();

  crashlytics().setUserId('APP_NAME');
  crashlytics().setAttribute('environment', Config.APP_CONFIG);
  crashlytics().setAttribute('language', userLanguage?.toUpperCase() ?? AR);
  // crashlytics().setCrashlyticsCollectionEnabled(Config.APP_CONFIG === 'production');

  global.ErrorUtils.setGlobalHandler((...args) => {
    const error = args[0] || 'Unknown';

    if (error instanceof Error) {
      crashlytic.setAttribute('stack', `${error?.stack}`);
      crashlytic.setAttribute('message', `${error?.message}`);
      crashlytic.recordError(0, `APP_NAME APP RN Fatal: ${error?.message}`);
    } else {
      // Have never gotten this log so far. Might not be necessary.
      crashlytic.recordError(0, `APP_NAME APP RN Fatal: ${error}`);
    }
    crashlytic.log(error.message);

    defaultHandler.apply(this, args);
  });
};

export default firebaseCrashlyticsConfiguration;
