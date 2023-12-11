import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { loadLanguageCode, saveLanguage } from './storage/asyncStorage';
import { DefaultLanguage, changeAppLang, isRTL, setI18nConfig, strings } from './i18n';
import moment from 'moment';

const App = () => {
  const [getCurrentLang, setGetCurrentLang] = useState(null);

  /**
   * Moment Config
   */
  const momentConfig = useCallback(() => {
    if (isRTL()) {
      moment.locale('ar_SA');
    } else {
      moment.locale('en');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks

      //multilingual init
      const userLanguage = await loadLanguageCode();
      const lang = userLanguage ?? DefaultLanguage;
      setI18nConfig(lang);
      await saveLanguage(lang);
      setGetCurrentLang(lang);
      momentConfig();
      //multilingual init
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  const changeAppLanguageFunc = () => {
    changeAppLang();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Button
          title={'App Language : ' + getCurrentLang}
          color="#841584"
          onPress={changeAppLanguageFunc}
        />
        <Text style={{ textAlign: 'left', marginTop: 22 }}>
          {strings('userProfile.welcomeText', { name: 'AJMAL' })}
        </Text>
        <Text style={{ textAlign: 'left' }}>{strings('validation.passwordMinLength')}</Text>
        <Text style={{ textAlign: 'left' }}>{strings('validation.validEmail')}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
