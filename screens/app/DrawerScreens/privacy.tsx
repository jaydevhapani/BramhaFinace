import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import apiName from '../../apiHelper/apiName';
import {Post_Api} from '../../apiHelper/apiHelper';
import CommanwebView from '../../components/commanwebView';

type Props = {
  navigation: any;
};

const PrivacyPolicy = (props: Props) => {

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isMenu
        isDrawerFlag={useDrawerStatus()}
        navigation={props?.navigation}
      />
      <CommanwebView url={apiName.getPrivacyPolicy}/>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
