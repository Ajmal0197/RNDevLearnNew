import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Wrapper Container Component
 *
 * @component
 * @example
 * // Example of a ViewWrapper with conditionally hidden safe area edges
 * <ViewWrapper
 *   hideTopSafeArea={true} // Hide top safe area edge
 *   hideBottomSafeArea={false} // Do not hide bottom safe area edge
 *   style={styles.wrapper} // Additional styles for the wrapper container
 * >
 *   <View style={styles.container}>
 *     <Text>Your Content Goes Here</Text>
 *   </View>
 * </ViewWrapper>
 *
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The content to be wrapped by the safe area.
 * @param {Object} [props.style] - Additional styles for the wrapper container.
 * @param {boolean} [props.hideTopSafeArea] - Whether to hide the top safe area edge.
 * @param {boolean} [props.hideBottomSafeArea] - Whether to hide the bottom safe area edge.
 *
 * @returns {ReactNode} Returns the wrapper container component.
 */
const ViewWrapper = ({ children, style, hideTopSafeArea = false, hideBottomSafeArea = false }) => {
  const edgesToHide = ['top', 'bottom', 'right', 'left'];

  // Remove 'top' at index 0 if hideTopSafeArea is true
  if (hideTopSafeArea) {
    edgesToHide.splice(0, 1);
  }

  // Remove 'bottom' at index 1 if hideBottomSafeArea is true
  if (hideBottomSafeArea) {
    edgesToHide.splice(1, 1);
  }

  return (
    <SafeAreaView edges={edgesToHide} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ViewWrapper;
