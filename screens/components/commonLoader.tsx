import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utilies/constant';
import {useSelector} from 'react-redux';
import colors from '../utilies/colors';

export default function CommonLoader() {
  const {isLoader} = useSelector(({commanSlice}) => commanSlice);

  return (
    isLoader && (
      <View
        style={{
          height: HEIGHT,
          width: WIDTH,
          position: 'absolute',
          zIndex: 99999,
          backgroundColor: 'transparante',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: colors.ButtonColor,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={colors.colorWhite} />
        </View>
      </View>
    )
  );
}
