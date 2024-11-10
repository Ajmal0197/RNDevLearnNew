import React, { createContext, useContext } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

const SharedStateContext = createContext(undefined);

export const SharedStateProvider = ({ children }) => {
  // Create shared values for scroll positions
  const scrollY = useSharedValue(0); // Animate scrollY value based on scroll direction
  const scrollYGlobal = useSharedValue(0); // Get the current vertical scroll position

  // Function to scroll to the top
  const scrollToTop = React.useCallback(() => {
    scrollY.value = withTiming(0, { duration: 300 }); // Animate scrollY to 0 over 300ms
    scrollYGlobal.value = withTiming(0, { duration: 300 }); // Animate scrollYGlobal to 0 over 300ms
  }, [scrollY, scrollYGlobal]);

  // Memoize the context value to avoid unnecessary re-renders
  const value = React.useMemo(
    () => ({ scrollToTop, scrollY, scrollYGlobal }),
    [scrollY, scrollYGlobal, scrollToTop]
  );

  return (
    // Provide the shared state to children components
    <SharedStateContext.Provider value={value}>{children}</SharedStateContext.Provider>
  );
};
export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
