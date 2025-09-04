import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Colors } from '../utils/Constants';
import Background from '../components/baymax/Background.tsx';
import Loading from '../components/baymax/Loading.jsx';
import BigHero6 from '../components/baymax/BigHero6.tsx';

const LifePlusScreen = () => {
  const blurOpacity = useRef(new Animated.Value(0)).current;

  const [showInstructions, setShowInstructions] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [showPedometer, setShowPedometer] = useState(false);

  const startBlur = useCallback(() => {
    Animated.timing(blurOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [blurOpacity]);

  const unBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const onOptionPressHandler = (type: string) => {
    console.log('Option pressed:', type);
  };

  useEffect(() => {
    const timer = setTimeout(startBlur, 500);
    return () => clearTimeout(timer);
  }, [startBlur]);

  return (
    <View
      style={{ backgroundColor: Colors.secondry }}
      className=" flex-1 justify-center items-center"
    > 
      {showLoader && (
        <View className=" absolute z-10">
          <Loading />
        </View>
      )}

      {
        !showInstructions && 
        <BigHero6 onPress={onOptionPressHandler} />
      }
      <Background blurOpacity={blurOpacity} />
    </View>
  );
};

export default LifePlusScreen;
