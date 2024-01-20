import { UnistylesRegistry } from 'react-native-unistyles';

const base = {
  margins: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    superLarge: 20,
    tvLike: 24,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  spacing: {
    1: 8, // equivalent to theme.spacing(1)
    2: 16, // equivalent to theme.spacing(2)
    3: 24, // equivalent to theme.spacing(3)
    4: 32, // equivalent to theme.spacing(4)
    5: 40, // equivalent to theme.spacing(5)
    6: 48, // equivalent to theme.spacing(6)
    7: 56, // equivalent to theme.spacing(7)
    8: 64, // equivalent to theme.spacing(8)
  },
};

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
};

export const lightTheme = {
  colors: {
    typography: '#000000',
    background: '#ffffff',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#7676a7',
    darkGrey: '#333333',
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
};

export const darkTheme = {
  colors: {
    typography: '#ffffff',
    background: '#000000',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
    darkGrey: '#333333',
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
};

export const premiumTheme = {
  colors: {
    typography: '#FFD700',
    background: '#001861',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#2f2d2d',
    darkGrey: '#333333',
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
};

// define other themes

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
    premium: premiumTheme,
  })
  .addConfig({
    adaptiveThemes: true, // themes based on device color scheme settings
    // initialTheme: 'light' // default theme
  });
