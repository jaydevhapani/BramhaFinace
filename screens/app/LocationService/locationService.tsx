import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonSwadhaText from '../../components/commonSwadhaText';
import colors from '../../utilies/colors';
import i18n from '../../utilies/i18n';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';

type Props = {};

const LocationService = (props: Props) => {
  useEffect(() => {
    askLocationPermission();
  }, [props]);

  //askLocationPermission
  const askLocationPermission = () => {
    navigationService.navigate(ScreenName.Login, '');
  };
  return (
    <View style={[commanStyles.Container, {paddingTop: 20}]}>
      <CommonSwadhaText color={colors.DarkBlue} />
      <Text
        style={{
          color: colors.LowBlue,
          fontSize: 20,
          alignSelf: 'center',
          letterSpacing: 0.4,
        }}>
        {i18n.needLocation}
      </Text>
      <View
        style={[
          commanStyles.Container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}></View>
    </View>
  );
};

export default LocationService;
