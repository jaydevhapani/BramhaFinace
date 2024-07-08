import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../utilies/colors';
import images from '../assests/images';
import { useSelector } from 'react-redux';
type Props = {
  viewStyle?: any;
  imageStyle?: any;
};
export default function CommanProfileBox(props: Props) {
  const {userData} = useSelector(({loginSlice}) => loginSlice);
  return (
    <View style={[styles.Profile, props.viewStyle]}>
      <Image
        source={{uri : userData?.profilePhoto}}
        resizeMode="contain"
        style={[styles.image, props.imageStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Profile: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: colors.colorWhite,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
