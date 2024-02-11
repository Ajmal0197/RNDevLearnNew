import {
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,
  findNodeHandle, // Get a view's unique identifier
  requireNativeComponent, // Import native UI components
} from 'react-native';
import React, { useEffect, useRef } from 'react';

// Importing native UI component defined in native code
const MyViewManager = requireNativeComponent('MyViewManager'); // MyViewManager and "1" are defined in android

// Function to create a fragment in Android native code
const createFragment = (viewId) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // Command name '1' represents 'create' command
    '1',
    [viewId]
  );

// Android files modified for ViewManager (creating native UI and displaying in RN):
// 1. MyFragment.java
// 2. MyFragmentManager.java
// 3. TestControllerPackage.java
// 4. MainApplication.java (getPackages())

const AndroidNativeUIComp = () => {
  const ref = useRef(null);

  useEffect(() => {
    // Run only on Android platform
    if (Platform.OS === 'android') {
      // Get the view's unique identifier
      const viewId = findNodeHandle(ref.current);
      // Call native code to create a fragment
      createFragment(viewId);
    }
  }, []);

  return (
    // Render native UI component defined in native code
    <MyViewManager
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        // Convert layout size from dpi to px and set as height
        height: PixelRatio.getPixelSizeForLayoutSize(200), // Sending to Android
        // width: PixelRatio.getPixelSizeForLayoutSize(200), // Sending to Android
      }}
      ref={ref} // Reference to access the native component
    />
  );
};

export default AndroidNativeUIComp;

const styles = StyleSheet.create({});
