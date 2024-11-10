import React from 'react';
import MainScreen from './MainScreen';
import { SharedStateProvider } from './SharedContext';

const App = () => (
  <SharedStateProvider>
    <MainScreen />
  </SharedStateProvider>
);

export default App;
