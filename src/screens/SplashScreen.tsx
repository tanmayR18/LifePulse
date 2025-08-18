import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { navigate } from '../utils/NavigationUtils';

const SplashScreen = () => {
  return (
    <View className=' flex-1 justify-center items-center'>
        <TouchableOpacity onPress={() => navigate("LifePlusScreen")}>
            <Text>Welcome to the LifePluse screen</Text>
        </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;


