import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import CommanwebView from '../../components/commanwebView';
import { useDrawerStatus } from '@react-navigation/drawer';
import apiName from '../../apiHelper/apiName';
type Props = {
    navigation: any;
  };
export default function Citizen(props : Props) {
  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isMenu
        isDrawerFlag={useDrawerStatus()}
        navigation={props?.navigation}
      />
      <CommanwebView url={apiName.Citizen}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})