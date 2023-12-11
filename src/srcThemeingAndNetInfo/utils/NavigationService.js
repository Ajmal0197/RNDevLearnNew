/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import * as React from 'react';

// NavigationContainer is refered here - Check RootStack
export const navigationRef = React.createRef();

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
function dispatch(...args) {
  navigationRef.current?.dispatch(...args);
}

function goBack() {
  navigationRef.current?.goBack();
}

function reset(index, name) {
  navigationRef.current?.reset(index, name);
}

function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute()?.name;
}

export default {
  setTopLevelNavigator,
  navigate,
  reset,
  goBack,
  dispatch,
  getCurrentRoute,
};
