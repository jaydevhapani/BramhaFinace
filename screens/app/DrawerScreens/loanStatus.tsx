import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import colors from '../../utilies/colors';
import { AlertBox, WIDTH } from '../../utilies/constant';
import navigationService from '../../navigations/navigationService';
import { ScreenName } from '../../navigations/screenName';
import { Post_Api } from '../../apiHelper/apiHelper';
import apiName, { BASE_PAYMENT_KEY } from '../../apiHelper/apiName';
import { useDispatch } from 'react-redux';
import i18n from '../../utilies/i18n';
import Moment from 'moment';
import messaging from '@react-native-firebase/messaging';

type Props = {
  navigation: any;
  route: any;
};

const LoanStatus = (props: Props) => {
  const dispatch = useDispatch();
  const [loadnDetails, setLoadnDetails] = useState({
    loanid: '',
    loan_amount: '',
    roi: '',
    outstanding_amount: 0,
    repayment_mode: '',
    overdue: 0,
    start_date: '',
    end_date: '',
    statement: '',
    tenure: '',
    tenure_paid: '',
    repayment_schedule: '',
    sanction_letter: '',
    noc_letter: '',
    insurance_policy: '',
    statement_download: '',
    repayment_schedule_download: '',
    sanction_letter_download: '',
    noc_letter_download: '',
    apr: '',
  });
  const footerArray = !props.route.params.isActive
    ? [
      {
        name: 'Statement',
      },
      {
        name: 'Repayment Schedule',
      },
      {
        name: 'Sanction Letter',
      },
      {
        name: 'Noc Letter',
      },
      {
        name: 'Insurance Policy',
      },
    ]
    : [
      {
        name: 'Statement',
      },
      {
        name: 'Repayment Schedule',
      },
      {
        name: 'Sanction Letter',
      },
      {
        name: 'Advance EMI',
      },
      {
        name: 'Foreclose Loan',
      },
      {
        name: 'EMI Holidays',
      },
      {
        name: 'Insurance Policy',
      },
    ];

  useEffect(() => {
    if (props.route.params.loanid != undefined) {
      fetchLoadnDetails();
    }
  }, [props]);
  //fetchLoadnDetails
  const fetchLoadnDetails = async () => {
    const Object = {
      token: global.accessToken,
      loanid: props.route.params.loanid,
    };
    try {
      await Post_Api(apiName.activeLoanDetails, Object, dispatch)
        .then(json => {
          if (json) {
            if (json) {
              console.log('jsonData :: ', json?.data);
              setLoadnDetails(json?.data);
              registerFcmToken();
            }
          }
        })
        .catch(error => { });
    } catch (error) { }
  };

  const registerFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('token :: ', token);
    if (token) {
      const fcmObject = {
        fcm: token,
        cid: global.cid,
        token: global.accessToken,
        loanid: props.route.params.loanid,
      };
      console.log('fcmObject : ', fcmObject);
      await fetch(apiName.registerFcm, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${global.accessToken}`,
        },
        body: JSON.stringify(fcmObject),
      })
        .then(response => response.json())
        .then(json => { })
        .catch(error => { });
    }
  };

  const date = new Date();

  //clickOnPayNow
  const clickOnPayNow = () => {
    const url = `https://smpl.finsolve.in/web/pg/payment?loanid=${loadnDetails.loanid}&amount=${loadnDetails.overdue}&paymentfor=Overdue&channel=MobileApp`;
    console.log('====================================');
    console.log('Url :: ', url);
    console.log('====================================');
    navigationService.navigate(ScreenName.PaymentUI, {
      Url: url,
    });
  };

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isMenu={false}
        isDrawerFlag={''}
        navigation={props.navigation}
      />
      <ScrollView style={commanStyles.Container}>
        <View style={[commanStyles.Container, commanStyles.pH10]}>
          <Text style={style.statusText}>
            {'Account Status as on ' + Moment(date).format('DD MMM YYYY')}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[style.Box1, style.contentWidth]}>
              <Text style={style.BoxHeader}>{'Total Loan Amount'}</Text>
              <Text style={style.BoxAnswer}>{loadnDetails.loan_amount}</Text>
            </View>
            <View style={[style.Box1, style.contentWidth]}>
              <Text style={style.BoxHeader}>{'Current Outstanding'}</Text>
              <Text style={style.BoxAnswer}>
                {loadnDetails.outstanding_amount}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={[style.Box1, style.contentWidth]}>
              <Text style={style.BoxHeader}>{'Rate of Interest'}</Text>
              <Text style={style.BoxAnswer}>{loadnDetails.roi + '%'}</Text>
            </View>
            <View style={[style.Box1, style.contentWidth]}>
              <Text style={style.BoxHeader}>{'Repayment Mode'}</Text>
              <Text style={style.BoxAnswer}>{loadnDetails.repayment_mode}</Text>
            </View>
          </View>
          <View
            style={[
              style.Box1,
              {
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={style.BoxHeader}>{'Overdue Amount'}</Text>
              <Text style={style.BoxAnswer}>{loadnDetails.overdue}</Text>
            </View>
            {loadnDetails.overdue != 0 && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 36,
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.colorRed,
                    borderRadius: 100,
                  }}
                  onPress={() => clickOnPayNow()}>
                  <Text style={{ color: colors.colorWhite }}>Pay Now!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View
            style={[
              style.Box1,
              {
                marginTop: 20,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingVertical: 12,
                paddingHorizontal: 10,
              },
            ]}>
            <Text style={style.BoxText}>
              {'Tenure: ' +
                loadnDetails.tenure_paid +
                '/' +
                loadnDetails.tenure +
                ' EMI Paid'}
            </Text>
            <View
              style={{
                height: 14,
                width: '100%',
                backgroundColor: colors.grey4,
                borderRadius: 10,
              }}>
              <View
                style={{
                  height: 14,
                  width: `${(loadnDetails.tenure_paid * 100) / loadnDetails.tenure
                    }%`,
                  backgroundColor: '#df3b37',
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          {/* {//!Tenure EMI paid calculation is on pending.........} */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={[style.Box1, style.contentWidth]}>
              <Text style={style.BoxHeader}>{'Start Date'}</Text>
              <Text
                style={[
                  style.BoxAnswer,
                  {
                    fontSize: 13,
                  },
                ]}>
                {loadnDetails.start_date}
              </Text>
            </View>
            <View style={[style.Box1, style.contentWidth]}>
              <Text style={style.BoxHeader}>{'End Date'}</Text>
              <Text
                style={[
                  style.BoxAnswer,
                  {
                    fontSize: 13,
                  },
                ]}>
                {loadnDetails.end_date}
              </Text>
            </View>
          </View>
          {loadnDetails.apr != '' && (
            <View style={[style.Box1, { width: '100%', marginTop: 10 }]}>
              <Text style={style.BoxHeader}>{'Annual Percentage Rate'}</Text>
              <Text
                style={[
                  style.BoxAnswer,
                  {
                    fontSize: 16,
                  },
                ]}>
                {loadnDetails.apr} %
              </Text>
            </View>
          )}
          <View style={{ marginTop: 30 }}>
            <FlatList
              data={footerArray}
              numColumns={3}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: 100,
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.ButtonColor,
                      borderRadius: 100,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      clickOnButton({
                        item: item,
                        loadnDetails: loadnDetails,
                        lan: props.route.params.lan,
                      });
                    }}>
                    <Text
                      style={{ color: colors.colorWhite, textAlign: 'center' }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface ButtonProps {
  item?: any;
  loadnDetails: {
    loanid: '';
    loan_amount: '';
    roi: '';
    outstanding_amount: 0;
    repayment_mode: '';
    overdue: 0;
    start_date: '';
    end_date: '';
    statement: '';
    tenure: '';
    tenure_paid: '';
    repayment_schedule: '';
    sanction_letter: '';
    noc_letter: '';
    insurance_policy: '';
    statement_download: '';
    repayment_schedule_download: '';
    sanction_letter_download: '';
    noc_letter_download: '';
    apr: '';
  };
  lan?: any;
}
const clickOnButton = (props: ButtonProps) => {
  if (props?.item?.name == 'Statement' && props.loadnDetails.statement) {
    navigationService.navigate(ScreenName.PdfView, {
      pdf: props.loadnDetails.statement,
      pdfDownload: props.loadnDetails.statement_download,
    });
  } else if (
    props?.item?.name == 'Repayment Schedule' &&
    props.loadnDetails.repayment_schedule
  ) {
    navigationService.navigate(ScreenName.PdfView, {
      pdf: props.loadnDetails.repayment_schedule,
      pdfDownload: props.loadnDetails.repayment_schedule_download,
    });
  } else if (
    props?.item?.name == 'Sanction Letter' &&
    props.loadnDetails.sanction_letter
  ) {
    navigationService.navigate(ScreenName.PdfView, {
      pdf: props.loadnDetails.sanction_letter,
      pdfDownload: props.loadnDetails.sanction_letter_download,
    });
  } else if (
    props?.item?.name == 'Noc Letter' &&
    props.loadnDetails.noc_letter
  ) {
    navigationService.navigate(ScreenName.PdfView, {
      pdf: props.loadnDetails.noc_letter,
      pdfDownload: props.loadnDetails.noc_letter_download,
    });
  } else if (
    props?.item?.name == 'Insurance Policy' &&
    props.loadnDetails.insurance_policy
  ) {
    navigationService.navigate(ScreenName.PdfView, {
      pdf: props.loadnDetails.insurance_policy,
    });
  } else if (
    props?.item?.name == 'Advance EMI' ||
    props?.item?.name == 'EMI Holidays'
  ) {
    navigationService.navigate(props?.item?.name, {
      loanid: props.loadnDetails.loanid,
    });
  } else if (props?.item?.name == 'Foreclose Loan') {
    navigationService.navigate(props?.item?.name, {
      loadnDetails: { ...props.loadnDetails, lan: props.lan },
    });
  } else {
    alert('May be no data found on your click event button..');
  }
};

const style = StyleSheet.create({
  statusText: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 20,
    marginTop: 20,
  },
  BoxHeader: {
    color: colors.colorGray,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
  BoxText: {
    color: colors.colorBlack,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  BoxAnswer: {
    color: colors.gray3,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
  },
  Box1: {
    height: 80,
    borderRadius: 10,
    backgroundColor: colors.colorWhiteShade,
    shadowColor: colors.lightBlack,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWidth: {
    width: WIDTH / 2.2,
  },
});

export default LoanStatus;
