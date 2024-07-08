import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../assests/images';

type Props = {
  imageStyle : any
};

const CommonFooterLogo = (props: Props) => {
  return (
    <View>
      <Image
        source={images.SwadhaLogo}
        resizeMode="cover"
        style={[{
          height: 80,
          width: 80,
          marginBottom: 20,
          alignSelf: 'flex-start',
        }, props.imageStyle]}
      />
    </View>
  );
};

export default CommonFooterLogo;
