import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LifePlusScreen from '../screens/LifePlusScreen';
import { navigationRef } from '../utils/NavigationUtils';
import BootSplash from "react-native-bootsplash"

const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer 
    onReady={async () => await BootSplash.hide()}
    ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="LifePlusScreen"
          component={LifePlusScreen}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
