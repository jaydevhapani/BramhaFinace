import React from 'react';
import {Text, View} from 'react-native';
import commanStyles from '../../utilies/commanStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import CommanwebView from '../../components/commanwebView';

interface Props {
  navigation: any;
  route?: {params: any};
}

export const PaymentUI = (props: Props) => {
  const Url = props.route?.params?.Url;

  //handleWebViewMessage
  const HandleWebViewMessage = (event : any) => {
    console.log('====================================');
    console.log("Payemnt event : ", event?.nativeEvent?.data);
    console.log('====================================');
  }
  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isDrawerFlag={''}
        isMenu={false}
        navigation={props.navigation}
      />
      <CommanwebView url={Url} handleWebViewMessage={(event : any) => HandleWebViewMessage(event)}/>
    </SafeAreaView>
  );
};
