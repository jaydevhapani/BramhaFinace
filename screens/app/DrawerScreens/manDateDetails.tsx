import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import apiName from '../../apiHelper/apiName';
import {useDispatch} from 'react-redux';
import {Post_Api} from '../../apiHelper/apiHelper';
import {AlertBox} from '../../utilies/constant';
import i18n from '../../utilies/i18n';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../utilies/colors';

type Props = {
  navigation: any;
};

const ManDateDetails = (props: Props) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  useEffect(() => {
    getManDateDetails();
  }, [isFocus]);

  const [mandateObject, setManDateObject] = useState({
    UMRN: '',
    account_number: '',
    account_type: '',
    bank_name: '',
    customer_name: '',
    end_date: '',
    ifsc_code: '',
    siamount: '',
    start_date: '',
  });

  const getManDateDetails = async () => {
    const Object = {
      token: global.accessToken,
      cid: global.cid,
    };
    try {
      await Post_Api(apiName.getMandateDetail, Object, dispatch)
        .then(json => {
          if (json) {
            if (json) {
              setManDateObject(json.data);
            }
          }
        })
        .catch(error => {});
    } catch (error) {}
  };
  console.log('mandateObject : ', mandateObject);

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isDrawerFlag={useDrawerStatus()}
        isMenu={true}
        navigation={props.navigation}
      />
      <View style={[commanStyles.Container, commanStyles.pH10]}>
        {mandateObject.account_number && (
          <>
            <Text style={commanStyles.HeaderText}>
            BRAHMA FINANC- Mandate Details
            </Text>
            <View style={{marginLeft: 10, marginTop: 20}}>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Customer name</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.customer_name}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Umrn</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.UMRN}
                </Text>
              </View>
              <View style={[styles.flexBox]}>
                <Text style={styles.title}>Bank name</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.bank_name}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Account number</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.account_number}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Account type</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.account_type}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>IFSC code</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.ifsc_code}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Siamount</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.siamount}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>Start date</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.start_date}
                </Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.title}>End date</Text>
                <Text style={styles.title1}>
                  {':    ' + mandateObject.end_date}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.colorGray,
    fontWeight: '500',
    alignSelf: 'center',
    width: '42%',
  },
  title1: {
    fontSize: 14,
    color: colors.lightBlack,
    fontWeight: '600',
    alignSelf: 'center',
    top: 1,
  },
  mainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexBox: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ManDateDetails;
