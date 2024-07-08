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
import CommanProfileBox from '../../components/commanProfileBox';
import {useDispatch} from 'react-redux';
import {Post_Api} from '../../apiHelper/apiHelper';
import apiName from '../../apiHelper/apiName';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';

type Props = {
  navigation: any;
};

const GetInTouch = (props: Props) => {
  const dispatch = useDispatch();

  const [getTouch, setGetTouch] = useState({
    token: global.accessToken,
    email: '',
    mobile: '',
    message: '',
  });

  const handleText = (value: any, key: string) => {
    setGetTouch(prevalue => ({...prevalue, [key]: value}));
  };

  const onSendMessage = async () => {
    if (getTouch.email.length == 0) {
      AlertBox({
        Message: 'Please enter your email address.',
        Title: i18n.Alert,
      });
    } else if (getTouch.mobile.length == 0) {
      AlertBox({
        Message: 'Please enter your mobile.',
        Title: i18n.Alert,
      });
    } else if (getTouch.mobile.length > 10) {
      AlertBox({
        Message: 'Please enter your valid mobile.',
        Title: i18n.Alert,
      });
    } else if (getTouch.message.length == 0) {
      AlertBox({
        Message: 'Please enter your message.',
        Title: i18n.Alert,
      });
    } else {
      try {
        await Post_Api(apiName.getInTouch, getTouch, dispatch)
          .then(json => {
            if (json) {
              if (json) {
                AlertBox({
                  Message: 'Request successfully submitted.',
                  Title: i18n.Alert,
                  onOkPress: () => {
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
            <Text style={commanStyles.HeaderText}>Get in Touch</Text>
            <View>
              <CommanProfileBox />
              {/* <TouchableOpacity
                style={styles.absoluteButton}></TouchableOpacity> */}
            </View>
            <View
              style={{
                alignSelf: 'center',
                width: 350,
                marginTop: 40,
              }}>
              <CommonTextInput
                value={getTouch.email}
                title={'Email Address'}
                placeHolder={'Enter Your Email'}
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
                value={getTouch.mobile}
                title={'Phone Number'}
                placeHolder={'Phone Number'}
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
                value={getTouch.message}
                title={'Message'}
                placeHolder={'Enter Your Message'}
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
                onPress={() => onSendMessage()}
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
});

export default GetInTouch;
