import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Colors } from '../utils/Constants';
import Background from '../components/baymax/Background.tsx';
import Loading from '../components/baymax/Loading.jsx';
import BigHero6 from '../components/baymax/BigHero6.tsx';
import { playTTS } from '../utils/ttsListeners.ts';
import SoundPlayer from 'react-native-sound-player';
import { playSound } from '../utils/VoiceUtils.tsx';
import { prompt } from '../utils/data.tsx';
import Instructions from '../components/baymax/Instructions.tsx';
import Pedometer from '../components/pedometer/Pedometer.tsx';

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

  const handleError = (err: string) => {
    playTTS('There was an error! please try again');
    startBlur();
    setMessage('');
    setShowLoader(true);
    SoundPlayer.stop();
    setShowInstructions(false);
    console.log(err);
  };

  const handleResponse = async (
    type: string,
    promptText: string,
    sound: string,
  ) => {
    setShowLoader(true);
    try {
      if (type === 'meditation') {
        playTTS('focus on your breath!');
        playSound(sound);
        setMessage('meditation');
        return;
      }

      if (type === 'happiness') {
        setTimeout(() => {
          playSound(sound);
        }, 5000);
      } else {
        playSound(sound);
      }

      setMessage(type);
      unBlur();
    } catch (error: any) {
      handleError(error);
    } finally {
      setShowLoader(false);
    }
  };

  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedometer(true);
      setShowLoader(false);
      return;
    }

    switch (type) {
      case 'meditation':
        handleResponse(type, prompt.joke, 'laugh');
        break;
      case 'motivation':
        handleResponse(type, prompt.motivation, 'motivation');
        break;
      case 'meditation':
        handleResponse(type, prompt.health, 'meditation');
        break;
      case 'meditation':
        handleResponse(type, prompt.health, 'meditation');
        break;
      default:
        handleError('There was no type like that');
    }
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
      {message && (
        <Instructions
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}

      {showPedometer && (
        <Pedometer
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            setShowPedometer(false);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}

      {showLoader && (
        <View className=" absolute z-10">
          <Loading />
        </View>
      )}

      {!showInstructions && <BigHero6 onPress={onOptionPressHandler} />}
      <Background blurOpacity={blurOpacity} />
    </View>
  );
};

export default LifePlusScreen;
