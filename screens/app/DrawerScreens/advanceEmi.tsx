import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import colors from '../../utilies/colors';
import CommonButton from '../../components/commonButton';
import {Post_Api} from '../../apiHelper/apiHelper';
import apiName, { BASE_PAYMENT_KEY } from '../../apiHelper/apiName';
import {useDispatch} from 'react-redux';
import { ScreenName } from '../../navigations/screenName';
import navigationService from '../../navigations/navigationService';

type Props = {
  navigation: any;
  route: any;
};

const AdvanceEmi = (props: Props) => {
  const dispatch = useDispatch();

  const [advanceEmi, setAdvanceEmi] = useState({
    loanid: null,
    loan_ac_no: null,
    emi_amount: null,
    emi_date: null,
    payable_amount: null,
  });

  useEffect(() => {
    if (props.route.params.loanid != undefined) {
      fetchAdvanceEmi();
    }
  }, [props]);

  //fetchAdvanceEmi
  const fetchAdvanceEmi = async () => {
    const Object = {
      token: global.accessToken,
      loanid: props.route.params.loanid,
    };
    try {
      await Post_Api(apiName.advanceEmi, Object, dispatch)
        .then(json => {
          if (json) {
            if (json) {
              setAdvanceEmi(json?.data);
            }
          }
        })
        .catch(error => {});
    } catch (error) {}
  };

  //clickOnPayNow
  const clickOnPayNow = () => {
    const url = `https://smpl.finsolve.in/web/pg/payment?loanid=${advanceEmi.loanid}&amount=${advanceEmi.emi_amount}&paymentfor=AdvanceEMI&channel=MobileApp`;
    console.log('====================================');
    console.log("Url :: ", url);
    console.log('====================================');
    navigationService.navigate(ScreenName.PaymentUI, {
      Url: url,
    });
  };

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isDrawerFlag={''}
        isMenu={false}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={[{flex: 1}]}>
        <View style={[commanStyles.Container, commanStyles.pH10]}>
          <Text style={commanStyles.HeaderText}>Advance EMI</Text>
          <View style={{marginTop: 40}}>
            <View style={style.Box}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.HeadLine}>{'LAN'}:</Text>
                  <Text style={style.answerLine}>
                    {advanceEmi.loan_ac_no ? advanceEmi.loan_ac_no : ''}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.HeadLine}>{'EMIAmount'}:</Text>
                  <Text style={style.answerLine}>
                    {advanceEmi.emi_amount ? advanceEmi.emi_amount : ''}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.HeadLine}>{'EMIDate'}:</Text>
                  <Text style={style.answerLine}>
                    {advanceEmi?.emi_date ? advanceEmi?.emi_date : ''}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.HeadLine}>{'PayableAmount'}:</Text>
                  <Text style={style.answerLine}>
                    {advanceEmi?.payable_amount
                      ? advanceEmi?.payable_amount
                      : ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <Text style={style.boxText}>Amount to Pay</Text>
            </View>
            <View style={style.Box2}>
              <View
                style={[
                  style.Box2,
                  {
                    height: 60,
                    width: 300,
                    borderRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 14,
                  },
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 15,
                      backgroundColor: colors.snowBlue,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 4,
                      color: colors.colorBlack,
                      alignSelf: 'center',
                    }}>
                    Enter Amount
                  </Text>
                </View>
                <TextInput
                  value={advanceEmi?.payable_amount}
                  style={{
                    borderBottomColor: colors.lightBlack,
                    borderBottomWidth: 0.5,
                    width: 100,
                    paddingBottom: 2,
                    color : colors.colorGray,
                    fontSize : 16,
                    fontWeight  : '600'
                  }}
                  placeholder="amount"
                  keyboardType="number-pad"
                  editable={false}
                />
              </View>
            </View>
            <CommonButton
              BUttonStyle={{
                height: 40,
                marginVertical: 30,
                backgroundColor: colors.colorRed,
              }}
              textStyle={''}
              title={'Pay Now!'}
              onPress={() => clickOnPayNow()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  Box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.grey4,
    shadowColor: colors.blackShade,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: 'row',
  },
  Box2: {
    height: 100,
    borderRadius: 30,
    backgroundColor: colors.colorWhite,
    shadowColor: colors.lightBlack,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  HeadLine: {
    color: colors.lightBlack,
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
    marginRight: 6,
  },
  answerLine: {
    color: colors.lightBlack,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  boxText: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
});
export default AdvanceEmi;
