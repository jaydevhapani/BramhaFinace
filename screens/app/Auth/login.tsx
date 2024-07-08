import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import images from '../../assests/images';
import CommonFooterLogo from '../../components/commonFooterLogo';
import CommonSwadhaText from '../../components/commonSwadhaText';
import colors from '../../utilies/colors';
import i18n from '../../utilies/i18n';
import CommonTextInput from '../../components/commonTextInput';
import {AlertBox, HEIGHT} from '../../utilies/constant';
import CommonButton from '../../components/commonButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch} from 'react-redux';
import {Post_Api} from '../../apiHelper/apiHelper';
import apiName from '../../apiHelper/apiName';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';
import {loginAuth} from '../../reduxConfig/slices/loginSlice';

type Props = {};

const Login = (props: Props) => {
  const dispatch = useDispatch();

  //STATE
  const [isOtpRecived, setIsOtpRecived] = useState(Boolean);
  const [state, setState] = useState({
    token: global.accessToken,
    mobileno: undefined,
    otp: undefined,
  });

  //onButtonPress
  const onButtonPress = () => {
    if (!isOtpRecived) {
      if (state.mobileno == undefined) {
        AlertBox({
          Title: i18n.Alert,
          Message: 'Please Enter Your Mobile Number.',
        });
      } else {
        fetchOtpApi();
      }
    }
    if (isOtpRecived) {
      if (state.otp === undefined) {
        AlertBox({
          Title: i18n.Alert,
          Message: 'Please Enter Your Otp.',
        });
      } else {
        fetchOtpApi();
      }
    }
  };

  const fetchOtpApi = async () => {
    try {
      console.log(state);
      if (!isOtpRecived) {
        await Post_Api(apiName.getOtp, state, dispatch)
          .then(json => {
            console.log("JSON : ", json);
            
            setIsOtpRecived(true);
          })
          .catch(error => {
            console.log(error);
          });
      }
      if (isOtpRecived) {
        await Post_Api(apiName.verifyOtp, state, dispatch)
          .then(async json => {
            if (json) {
              dispatch(
                loginAuth({...json?.data, profilePhoto: json?.profilePhoto}),
              );
              global.cid = json?.data?.cid;

              navigationService.resetAndRedirect(ScreenName.DashBoard);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={[commanStyles.Container, commanStyles.pH10]}>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <Image
          source={images.LoginTop}
          resizeMode="contain"
          style={{
            height: 200,
            alignSelf: 'center',
          }}
        />
        <View>
          <CommonSwadhaText color={'#df3b37'} />
          <Text style={style.headerText}>{i18n.needLocation}</Text>
          <View style={style.textInputBox}>
            {!isOtpRecived && (
              <CommonTextInput
                value={state.mobileno}
                title={i18n.loginBoxTitle}
                placeHolder={'Please Enter Your Mobile Number'}
                onChange={(t: any) =>
                  setState(prev => ({...prev, ['mobileno']: t}))
                }
                maxLength={10}
                keyboardType={'number-pad'}
              />
            )}
            {isOtpRecived && (
              <OTPInputView
                style={{height: 100, alignSelf: 'center'}}
                pinCount={4}
                autoFocusOnLoad={false}
                codeInputFieldStyle={style.underlineStyleBase}
                codeInputHighlightStyle={style.underlineStyleHighLighted}
                onCodeFilled={(code: any) => {
                  console.log(`Code is ${code}, you are good to go!`);
                  setState(prev => ({...prev, ['otp']: code}));
                }}
              />
            )}
          </View>
          <View style={{marginTop: 50}}>
            <CommonButton
              onPress={() => {
                onButtonPress();
              }}
              title={isOtpRecived ? i18n.Conform : i18n.SendOtp}
              BUttonStyle={''}
              textStyle={''}
            />
          </View>
        </View>
      </ScrollView>

      <CommonFooterLogo imageStyle={''} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerText: {
    color: '#df3b37',
    fontSize: 20,
    alignSelf: 'center',
    letterSpacing: 0.4,
  },
  textInputBox: {
    alignSelf: 'center',
    width: 300,
    marginTop: HEIGHT / 12,
  },
  underlineStyleBase: {
    width: 60,
    height: 60,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.ButtonColor,
    color: colors.colorBlack,
    fontSize: 18,
    fontWeight: '700',
  },

  underlineStyleHighLighted: {
    borderColor: colors.DarkBlue,
  },
});

export default Login;
