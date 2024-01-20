import './utils/unistyles';
import { Button, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

const App = () => {
  //   useInitialTheme('premium'); // user-selected theme during runtime

  console.log('UnistylesRuntime', JSON.stringify(UnistylesRuntime, null, 2));

  const { styles, theme, breakpoint } = useStyles(stylesheet, {
    size: 'medium',
    contentSizeCategory: UnistylesRuntime.contentSizeCategory,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewText1}>
          <Text
            style={{
              color: theme.colors.error,
            }}
          >
            My device is using the {UnistylesRuntime.contentSizeCategory} size.
          </Text>
        </View>

        <Button
          title="Disable adaptive themes"
          onPress={() => UnistylesRuntime.setAdaptiveThemes(false)}
        />
        <Text style={{ color: theme.colors.typography, fontSize: theme.fontSizes.xl }}>
          Adaptive themes are {UnistylesRuntime.hasAdaptiveThemes ? 'enabled' : 'disabled'}
        </Text>

        <Button title="Change theme Dark" onPress={() => UnistylesRuntime.setTheme('dark')} />
        <Button title="Change theme Light" onPress={() => UnistylesRuntime.setTheme('light')} />
        <Button title="Change theme Premium" onPress={() => UnistylesRuntime.setTheme('premium')} />

        <Text style={{ color: theme.colors.typography, fontSize: theme.fontSizes.md }}>
          My device is using the {UnistylesRuntime.colorScheme} scheme.
        </Text>

        <View style={styles.box(200, true)} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    variants: {
      color: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        default: {
          backgroundColor: theme.colors.background,
        },
      },
    },
  },
  viewText1: {
    backgroundColor: 'green',
    // for a unified experience across Android and iOS you need to map these values yourself
    variants: {
      contentSizeCategory: {
        xSmall: {
          padding: theme.spacing['1'],
        },
        Small: {
          padding: theme.spacing['2'],
        },
        Medium: {
          padding: theme.spacing['3'],
        },
        Large: {
          padding: theme.spacing['4'],
        },
        xLarge: {
          padding: theme.spacing['5'],
        },
        xxLarge: {
          padding: theme.spacing['6'],
        },
        xxxLarge: {
          padding: theme.spacing['7'],
        },
        unspecified: {
          padding: theme.spacing['8'],
        },
      },
    },
  },
  box: (width, isOdd) => ({
    backgroundColor: 'red',
    alignSelf: 'center',
    borderBottomWidth: isOdd ? 1 : undefined,
    variants: {
      size: {
        small: {
          width,
          height: 100,
        },
        medium: {
          width,
          height: 200,
        },
        large: {
          width,
          height: 300,
        },
      },

      otherGroupName: {
        // other variants
      },
    },
  }),
}));
