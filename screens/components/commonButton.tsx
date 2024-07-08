import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../utilies/colors';

type Props = {
  title: any;
  onPress: any;
  textStyle: any;
  BUttonStyle: any;
};

const CommonButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress && props.onPress()}
      style={[styles.ButtonBox, props.BUttonStyle]}>
      <Text style={[styles.TextStyle, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  ButtonBox: {
    height: 70,
    width: 160,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: colors.ButtonColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontSize : 18,
    color : colors.colorWhite,
    fontWeight : '600',
    letterSpacing : 0.5
  },
});
