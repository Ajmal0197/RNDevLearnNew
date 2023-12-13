// REF:https://enappd.com/blog/firebase-analytics-in-react-native-app/101/
/**
 * Firebase Tracking Methods
 */

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import Config from 'react-native-config';
import { Platform } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { loadLanguageCode } from '../../../srcMultilingual/storage/asyncStorage';
import { AR } from '../../../srcMultilingual/constants';

/**
 * Track Screen Name
 */
const isEnabledAnalyticsLog = false;

/**
 * Track Event Name
 */
const trackEventAnalytics = async (trackingEventName, param = {}) => {
  const userLanguage = await loadLanguageCode();
  /**
   * UserInformation
   * Values of this object must be string otherwise it will throw error
   * integer value will give error.
   */
  const userInformation = {
    user: 'APP_NAME',
    environment: Config.APP_CONFIG,
    language: userLanguage?.toUpperCase() ?? AR,
    app_version: getVersion(),
    build_number: getBuildNumber(),
    default_lang: userLanguage?.toUpperCase() ?? AR,
    platform: Platform.OS === 'ios' ? 'ios' : 'android',
    ...param,
  };
  // DEV Console Log
  if (isEnabledAnalyticsLog) {
    // eslint-disable-next-line no-console
    console.log('trackEventName', trackingEventName, userInformation);
  }

  if (Config.APP_CONFIG === 'production') {
    /**
     * Adding analytics Event
     */
    analytics().logEvent(trackingEventName, userInformation);
  }

  /**
   * crashlytics log
   */
  crashlytics().log(trackingEventName);
  crashlytics().setAttributes(userInformation);
};

export { trackEventAnalytics };
