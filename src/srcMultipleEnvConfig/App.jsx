// REF: https://medium.com/@sathishkcontact/managing-multiple-environments-in-react-native-android-ios-scripts-for-different-builds-ea4c5bff6782
// https://nawfalhaddi.github.io/react-native-template-by-nh/docs/basic-setup/setup-env/

/*
ANDROID:
1. To run android app run this command in terminal.
`yarn aos:dev`
 
2. To create standalone apk and open the folder.
`yarn aos:dev-apk`

3. Follow respected scripts for the other environments.
To create bundle to upload playstore and open the folder.
`yarn aos:bundle`
----------------------------
iOS:
1. To run ios app run this command in terminal.
`yarn ios:dev`

2. To create ipa file to upload appstore.
`yarn ios:prod-release`
*/

import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from 'react-native';
import config from 'react-native-config';
import BootSplash from 'react-native-bootsplash';

function App() {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundColor = isDarkMode ? 'black' : 'white';

    const isFrom = config.APP_CONFIG ?? '';

    useEffect(() => {
        BootSplash.hide();
      }, []);

    return (
        <SafeAreaView style={[iStyles.screenContainer, { backgroundColor }]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundColor}
            />
            <View style={iStyles.container}>
                <View style={iStyles.greetingContainer}>
                    <Text style={[iStyles.greetingText, iStyles.font]}>
                        Hi Hasan,
                    </Text>
                    <Text style={[iStyles.greetingText, iStyles.font]}>
                        {`I am from ${isFrom} & \n BaseURL = ${config.API_URL}`}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}


const iStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    greetingContainer: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    font: {
        fontWeight: '700',
    },
    greetingText: {
        color: '#000',
        marginTop: 5,
    },
});

export default App;