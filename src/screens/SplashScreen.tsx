import { Image, StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useEffect } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Colors, Fonts, lightColors } from '../utils/Constants';
import { screenHeight, screenWidth } from '../utils/Scaling';
import CustomText from '../components/common/CustomText';
import { initializeTtsListeners, playTTS } from '../utils/ttsListeners';
import Tts from 'react-native-tts';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { playSound } from '../utils/VoiceUtils';

const bottomColors = [...lightColors].reverse();

const SplashScreen: FC = () => {
  const lifePulseAnimation = useSharedValue(screenHeight * 0.8);
  const messageContainerAnimation = useSharedValue(screenHeight * 0.8);

  const launchAnimation = useCallback(async () => {
    messageContainerAnimation.value = screenHeight * 0.001;
    playSound('ting2');
    setTimeout(() => {
      lifePulseAnimation.value = -screenHeight * 0.02;
      playTTS('Welcome to baymax');
    }, 600);

    setTimeout(() => {
        resetAndNavigate('LifePlusScreen')
    }, 4000);
  }, [messageContainerAnimation, lifePulseAnimation]);

  useEffect(() => {
    initializeTtsListeners();
    launchAnimation();
  }, [launchAnimation]);

  const animateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(lifePulseAnimation.value, {
            duration: 1500,
          }),
        },
      ],
    };
  });

  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value, {
            duration: 1200,
          }),
        },
      ],
    };
  });

  return (
    <View
      style={styles.container}
      className=" flex-1 justify-center items-center"
    >
      <Animated.View style={[styles.imageContainer, animateImageStyle]}>
        <Image
          style={styles.img}
          resizeMode="contain"
          source={require('../assets/images/launch.png')}
        />
      </Animated.View>

      <Animated.View
        style={messageContainerStyle}
        className=" absolute h-[35%] bottom-0 w-full"
      >
        <LinearGradient className=" pt-8 w-full h-full" colors={bottomColors}>
          <View className=" bg-white flex-1 rounded-[20px] p-5 items-center">
            <CustomText fontSize={34} fontFamily={Fonts.Theme}>
              Baymax
            </CustomText>
            <LottieView
              source={require('../assets/animations/syncing.json')}
              style={{ width: 280, height: 100 }}
              autoPlay
              loop
            />
            <CustomText>
              Synchronizing best configurations for you...
            </CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.primary },
  imageContainer: { height: screenHeight * 0.5, width: screenWidth - 20 },
  img: { width: '100%', height: '100%' },
});
