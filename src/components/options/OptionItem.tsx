import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { circleRadius } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const OptionItem: FC<{
  item: any;
  onPress: (type: string) => void;
}> = ({ item, onPress }) => {
  let iconColor;
  let iconName;

  switch (item) {
    case 'meditation':
      iconColor = '#2DEC72';
      iconName = 'nature-people';
      break;
    case 'pedometer':
      iconColor = '#2D7BA4';
      iconName = 'directions-run';
      break;
    case 'health':
      iconColor = 'green';
      iconName = 'health-and-safety';
      break;
    case 'happiness':
      iconColor = '#FB26FF';
      iconName = 'emoji-emotions';
      break;
    default:
      iconColor = '#FFBC66';
      iconName = 'local-fire-department';
      break;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Icon name={iconName} color={iconColor} size={RFValue(32)} />
    </TouchableOpacity>
  );
};

export default OptionItem;

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
});
