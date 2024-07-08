import {StyleSheet} from 'react-native';
import {HEIGHT, WIDTH} from './constant';
import colors from './colors';

export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.colorWhite,
  },
  M10: {
    marginTop: 10,
  },
  p30: {
    paddingBottom: 30,
  },
  pH10: {
    paddingHorizontal: 10,
  },
  HeaderText : {
    color: colors.ButtonColor,
    fontSize: 20,
    alignSelf: 'center',
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Medium',
    marginTop : 20
  }
});
