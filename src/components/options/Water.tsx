import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { circleRadius } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useWaterStore } from '../../state/storage';
import { playTTS } from '../../utils/ttsListeners';
import { playSound } from '../../utils/VoiceUtils';

const Water = () => {
  const { waterDrinkStamps, addWaterIntake } = useWaterStore();

  const totalSegments = 8;
  const completedSegments = waterDrinkStamps.length;

  const handlePress = async () => {
    if (completedSegments < totalSegments) {
      playSound('ting');
      const timestamp = new Date().toISOString();
      addWaterIntake(timestamp);
    } else {
      playTTS('You have completed your daily water intake goal');
    }
  };

  const containerStyle = [
    styles.container,
    completedSegments === totalSegments && styles.containerCompleted,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <Icon name="water" color={'#1ca3ec'} size={RFValue(32)} />
      {Array.from({ length: totalSegments }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                completedSegments === totalSegments
                  ? '#00D100'
                  : index < completedSegments
                    ? '#1ca3ec'
                    : '#eee',
              transform: [
                { rotate: `${(index * 360) / totalSegments}deg` },
                { translateX: circleRadius / 2 - 5 },
              ],
            },
          ]}
        />
      ))}
    </TouchableOpacity>
  );
};

export default Water;

const styles = StyleSheet.create({
  container: {
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOffset: { width: 1, height: 1 },
    elevation: 10,
    shadowRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  containerCompleted: {
    shadowColor: 'yellow',
    elevation: 10,
  },
  segmentContainer: {
    position: 'absolute',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 8,
    height: 4,
    borderRadius: 2,
  },
});
