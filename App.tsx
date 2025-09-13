import React, { useEffect } from 'react';
import './global.css';
import Navigation from './src/navigation/Navigation';
import {
  batteryOptimizationCheck,
  powerManagerCheck,
  requestPermission,
} from './src/notification/notificationPermission';
import './src/notification/notificationListener';
import { registeringAllTriggers } from './src/notification/registerTiggers';
import { setCategories } from './src/notification/notificationInitial';
import { Platform } from 'react-native';

const App = () => {
  const permissionChecks = async () => {
    requestPermission();
    registeringAllTriggers();
    setCategories();
    if (Platform.OS === 'android') {
    //   batteryOptimizationCheck();
    //   powerManagerCheck();
    }
  };

  useEffect(() => {
    permissionChecks();
  }, []);

  return <Navigation />;
};

export default App;
