import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { BlurView } from '@react-native-community/blur';

const Background: FC<{ blurOpacity: any }> = ({ blurOpacity }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/images/baymax.png')}
        style={styles.img}
        resizeMode="cover"
      />

    <Animated.View style={[styles.absolute, { opacity: blurOpacity }]}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
    </Animated.View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  imageContainer: {
    width: screenWidth,
    height: screenHeight * 1.2,
    position: 'absolute',
    // zIndex: -1,
  },
  img: {
    width: '100%',
    height: '100%',
    bottom: -screenHeight * 0.2,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
