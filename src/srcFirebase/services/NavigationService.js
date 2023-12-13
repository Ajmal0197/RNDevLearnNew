// NavigationService.js
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const NavigationService = {
  navigate: (name, params) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  goBack: () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
  reset: (index, name) => {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index,
        routes: [{ name }],
      });
    }
  },
  getCurrentRoute: () => {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute()?.name;
    }
    return null;
  },
  setTopLevelNavigator: (navigatorRef) => {
    if (navigationRef.isReady()) {
      navigationRef.current = navigatorRef;
    }
  },
};

// Usage in a component or a utility function
// Example usage in a component or utility function
// import { NavigationService } from './NavigationService';

// Usage in a component or a utility function
// NavigationService.navigate('ScreenName', { /* params */ });
// NavigationService.goBack();
// NavigationService.reset(0, 'HomeScreen');
// const currentRoute = NavigationService.getCurrentRoute();
// NavigationService.setTopLevelNavigator(navigatorRef);
