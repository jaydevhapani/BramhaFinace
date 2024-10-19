import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import colors from '../../utilies/colors';
import images from '../../assests/images';
import CommonButton from '../../components/commonButton';
import { useDispatch } from 'react-redux';
import { Post_Api } from '../../apiHelper/apiHelper';
import apiName, { BASE_PAYMENT_KEY } from '../../apiHelper/apiName';
import { AlertBox } from '../../utilies/constant';
import i18n from '../../utilies/i18n';
import navigationService from '../../navigations/navigationService';
import { ScreenName } from '../../navigations/screenName';

type Props = {
  navigation: any;
  route: any;
};

const EmiHolidays = (props: Props) => {
  const dispatch = useDispatch();
  const [isTickMark, setTickMark] = useState(false);
  const [holyDay, setHoyDay] = useState({
    loanid: null,
    loan_ac_no: null,
    emi_amount: null,
    emi_date: null,
    payable_amount: null,
    terms: {} as any,
    help: null,
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
      await Post_Api(apiName.holyday, Object, dispatch)
        .then(json => {
          if (json) {
            if (json) {
              setHoyDay(json?.data);
              if (json?.data?.help) {
                AlertBox({
                  Message: json?.data?.help,
                  Title: 'Help',
                  onOkPress: () => { },
                });
              }
            }
          }
        })
        .catch(error => { });
    } catch (error) { }
  };

  //clickOnPayNow
  const clickOnPayNow = () => {
    console.log('holyDay :: ', holyDay);

    const url = `https://smpl.finsolve.in/web/pg/payment?loanid=${holyDay.loanid}&amount=${holyDay.payable_amount}&paymentfor=HolidayEMI&channel=MobileApp`;
    console.log('====================================');
    console.log('Url :: ', url);
    console.log('====================================');
    if (isTickMark) {
      navigationService.navigate(ScreenName.PaymentUI, {
        Url: url,
      });
    } else {
      AlertBox({
        Message: 'Please accept terms of emi holidays and pay.',
        Title: i18n.Alert,
        onOkPress: () => { },
      });
    }
  };
  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isDrawerFlag={''}
        isMenu={false}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={[commanStyles.Container, commanStyles.pH10]}>
          <View>
            <Text style={commanStyles.HeaderText}>EMI Holidays</Text>
            <Text
              style={{
                position: 'absolute',
                right: 10,
                fontSize: 16,
                bottom: 0,
                textDecorationLine: 'underline',
                color: colors.ButtonColor,
              }}
              onPress={() => {
                AlertBox({
                  Message: holyDay.help,
                  Title: 'Help',
                  onOkPress: () => { },
                });
              }}>
              Help
            </Text>
          </View>
          <View
            style={{
              width: 370,
              borderRadius: 10,
              // shadowColor: colors.lightBlack,
              // shadowOffset: {width: -2, height: 4},
              // shadowOpacity: 0.2,
              // shadowRadius: 3,
              // elevation: 4,
              alignSelf: 'center',
              backgroundColor: 'white',
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.HeadLine}>{'LAN'}:</Text>
              <Text style={style.answerLine}>
                {holyDay.loan_ac_no ? holyDay.loan_ac_no : ''}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.HeadLine}>{'EMI Amount'}:</Text>
              <Text style={style.answerLine}>
                {holyDay.emi_amount ? holyDay.emi_amount : ''}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.HeadLine}>{'EMI Date'}:</Text>
              <Text style={style.answerLine}>
                {holyDay.emi_date ? holyDay.emi_date : ''}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: colors.gray1,
                height: 1,
                marginVertical: 30,
              }}
            />
            <View style={style.Box}>
              <Text style={style.boxText}>Terms of Holidays EMI</Text>
              {Object.keys(holyDay.terms).map(key => (
                <Text style={[style.boxText, { color: colors.gray1 }]} key={key}>
                  {key}.  {holyDay.terms[key]}
                </Text>
              ))}
            </View>
            <View style={{ marginVertical: 30, flexDirection: 'row', marginLeft: 10 }}>
              <TouchableOpacity
                style={{
                  height: 18,
                  width: 18,
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.colorWhite,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 2,
                }}
                onPress={() => setTickMark(!isTickMark)}>
                {isTickMark && (
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 2,
                      backgroundColor: colors.LowBlue,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text style={{ color: 'black' }}>I agree terms of EMI Holidays and pay</Text>
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
                <View style={{ flexDirection: 'row' }}>
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
                    Interest Payable
                  </Text>
                </View>
                <Text
                  style={{
                    marginLeft: 4,
                    color: colors.colorBlack,
                    alignSelf: 'center',
                  }}>
                  {holyDay.payable_amount}
                </Text>
              </View>
            </View>
            <CommonButton
              BUttonStyle={{
                height: 40,
                marginVertical: 20,
                backgroundColor: colors.colorRed,
              }}
              onPress={() => clickOnPayNow()}
              textStyle={''}
              title={'Pay Now'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  Box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.colorWhite,
    shadowColor: colors.blackShade,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  boxText: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
    marginTop: 4,
  },
  Box2: {
    height: 100,
    borderRadius: 30,
    backgroundColor: colors.colorWhite,
    shadowColor: colors.lightBlack,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
});

export default EmiHolidays;
