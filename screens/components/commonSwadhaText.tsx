import { View, Text } from 'react-native';
import React from 'react';
import i18n from '../utilies/i18n';
import colors from '../utilies/colors';

type Props = {
  color: any;
};

const CommonSwadhaText = (props: Props) => {
  return (
    <Text
      style={{
        color: props?.color ? props.color : colors.colorWhite,
        fontSize: 30,
        alignSelf: 'center',
        letterSpacing: 0.4,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 10
      }}>
      {'Brahma Finance'}
    </Text>
  );
};

export default CommonSwadhaText;
