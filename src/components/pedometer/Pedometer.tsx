import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { usePedometerStore } from '../../state/pedometerStore';
import StepCounter, {
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
} from '@dongminyu/react-native-step-counter';
import { playTTS } from '../../utils/ttsListeners';
// import CircularProgress from 'react-native-circular-progress-indicator';
import { Fonts } from '../../utils/Constants';
import CustomText from '../common/CustomText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Pedometer: FC<{
  message: string;
  onCross: () => void;
}> = ({ message, onCross }) => {
  const { stepCount, dailyGoal, addStep } = usePedometerStore();

  StepCounter.addListener('StepCounter.stepsSensorInfo');
  const startStepCounter = () => {
    startStepCounterUpdate(new Date(), data => {
      const parsedData = parseStepData(data);
      addStep(parsedData.steps, parsedData.distance);
    });
  };

  const stopStepCounter = () => {
    stopStepCounterUpdate();
  };

  useEffect(() => {
    if (stepCount >= dailyGoal) {
      playTTS(
        "You've met your daily goal. No need to start the counter again today.",
      );
    } else {
      startStepCounter();
    }

    return () => {
      stopStepCounter();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Your step counter stopped!!');
          stopStepCounter();
          onCross();
        }}
        style={styles.cross}
      >
        <Icon name="close-circle" color="red" size={RFValue(20)} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo_short.png')}
        style={styles.logo}
      />
      <View style={styles.indicator}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={stepCount / 100 >= 100 ? 100 : stepCount / 100}
          tintColor="#66BB6A"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#C8E6C9"
          lineCap="round"
          style={{ marginHorizontal: 'auto' }}
        >
          {() => (
            <Text className=" text-black text-xl ">
              {stepCount.toLocaleString('en-IN')} / 10,000
            </Text>
          )}
        </AnimatedCircularProgress>
        <CustomText
          fontSize={RFValue(8)}
          fontFamily={Fonts.SemiBold}
          style={styles.text}
        >
          Start Walking, counter will update automatically.
        </CustomText>
      </View>
    </View>
  );
};

export default Pedometer;

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 19,
    zIndex: 20,
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  logo: {
    width: 50,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
