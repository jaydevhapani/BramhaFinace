import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import colors from '../../utilies/colors';
import CommonTextInput from '../../components/commonTextInput';
import i18n from '../../utilies/i18n';
import CommonButton from '../../components/commonButton';
import CommonAlertBox from '../../components/commonAlertBox';
import {AlertBox, HEIGHT} from '../../utilies/constant';
import {Dropdown} from 'react-native-element-dropdown';
import {Post_Api} from '../../apiHelper/apiHelper';
import {useDispatch} from 'react-redux';
import apiName from '../../apiHelper/apiName';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';

type Props = {
  navigation: any;
};
const data = [
  {label: 'Immediate', value: 'Immediate'},
  {label: 'Within 15 days', value: 'Within 15 days'},
  {label: 'Within a month', value: 'Within a month'},
  {
    label: 'Query for future requirement',
    value: 'Query for future requirement',
  },
];
const ApplyNewLoan = (props: Props) => {
  const dispatch = useDispatch();

  const [applyData, setApplyData] = useState({
    token: global.accessToken,
    cid: global.cid,
    amount: '',
    purpose: '',
    urgency: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleText = (value: any, key: string) => {
    setApplyData(prevalue => ({...prevalue, [key]: value}));
  };

  const clearAllData = () => {
    setApplyData({
      token: global.accessToken,
      cid: global.cid,
      amount: '',
      purpose: '',
      urgency: '',
      email: '',
      mobile: '',
      message: '',
    });
  };

  const submitMessage = async () => {
    if (applyData.email.length == 0) {
      AlertBox({
        Message: 'Please enter your email',
        Title: i18n.Alert,
      });
    } else if (applyData.mobile.length == 0 || applyData.mobile.length > 10) {
      AlertBox({
        Message: 'Please enter your valid mobile',
        Title: i18n.Alert,
      });
    } else if (applyData.amount.length == 0) {
      AlertBox({
        Message: 'Please enter your valid loan amount',
        Title: i18n.Alert,
      });
    } else if (applyData.purpose.length == 0) {
      AlertBox({
        Message: 'Please enter your purpose.',
        Title: i18n.Alert,
      });
    } else if (applyData.urgency.length == 0) {
      AlertBox({
        Message: 'Please enter your urgency.',
        Title: i18n.Alert,
      });
    } else if (applyData.message.length == 0) {
      AlertBox({
        Message: 'Please enter your message.',
        Title: i18n.Alert,
      });
    } else {
      try {
        await Post_Api(apiName.applyNewLoan, applyData, dispatch)
          .then(json => {
            if (json) {
              if (json) {
                AlertBox({
                  Message: 'Request successfully submitted.',
                  Title: i18n.Alert,
                  onOkPress: () => {
                    clearAllData();
                    navigationService.resetAndRedirect(ScreenName.DashBoard);
                  },
                });
              }
            }
          })
          .catch(error => {});
      } catch (error) {}
    }
  };

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isMenu={true}
        isDrawerFlag={useDrawerStatus()}
        navigation={props.navigation}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={[commanStyles.Container, commanStyles.pH10]}>
            <Text style={commanStyles.HeaderText}>Apply New Loan</Text>
            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <CommonTextInput
                value={applyData.email}
                title={'Email'}
                placeHolder={'Enter your email'}
                onChange={(t: any) => handleText(t, 'email')}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <CommonTextInput
                value={applyData.mobile}
                title={'Mobile'}
                placeHolder={'Enter your mobile number'}
                onChange={(t: any) => handleText(t, 'mobile')}
                maxLength={10}
                keyboardType={'number-pad'}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <CommonTextInput
                value={applyData.amount}
                title={'Amount Required'}
                placeHolder={'10000'}
                onChange={(t: any) => handleText(t, 'amount')}
                keyboardType={'number-pad'}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <CommonTextInput
                value={applyData.purpose}
                title={'Purpose of Loan'}
                placeHolder={''}
                onChange={(t: any) => handleText(t, 'purpose')}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <Text style={styles.title}>{'Urgency'}</Text>
              <Dropdown
                data={data}
                value={applyData.urgency}
                labelField={'label'}
                valueField={'value'}
                onChange={item => {
                  handleText(item.label, 'urgency');
                }}
                itemTextStyle={{color: colors.colorBlack}}
                selectedTextStyle={{color: colors.colorBlack}}
                style={{
                  height: 60,
                  width: '100%',
                  borderWidth: 0.8,
                  borderColor: colors.lightBlack,
                  borderRadius: 20,
                  marginTop: 2,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <CommonTextInput
                value={applyData.message}
                title={'Message'}
                placeHolder={'Hello, write your query here..'}
                onChange={(t: any) => handleText(t, 'message')}
              />
            </View>

            <View
              style={{
                marginVertical: 30,
              }}>
              <CommonButton
                BUttonStyle={{
                  height: 45,
                  width: 180,
                  backgroundColor: colors.colorRed,
                }}
                onPress={() => submitMessage()}
                textStyle={''}
                title={'Send Message'}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Profile: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: colors.gray1,
    marginTop: 20,
  },
  absoluteButton: {
    position: 'absolute',
    backgroundColor: 'pink',
    height: 35,
    width: 35,
    borderRadius: 20,
    alignSelf: 'center',
    bottom: -10,
    right: 150,
  },
  title: {
    fontSize: 16,
    color: colors.lightBlack,
    fontWeight: '400',
    marginTop: 6,
    marginBottom: 6,
  },
});

export default ApplyNewLoan;
