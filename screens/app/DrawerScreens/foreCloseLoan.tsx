import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import CommonButton from '../../components/commonButton';
import colors from '../../utilies/colors';
import images from '../../assests/images';
import DatePicker from 'react-native-date-picker';
import {Post_Api} from '../../apiHelper/apiHelper';
import {useDispatch} from 'react-redux';
import apiName from '../../apiHelper/apiName';
import { AlertBox } from '../../utilies/constant';
import i18n from '../../utilies/i18n';
import navigationService from '../../navigations/navigationService';

type Props = {
  navigation: any;
  route: any;
};

const ForeCloseLoan = (props: Props) => {
  const dispatch = useDispatch();
  const [datepickeropen, setDatepicker] = useState(false);
  const [date, setDate] = useState(new Date());
  console.log(props.route.params);

  const onSubmitRequest = async () => {
    const Object = {
      token: global.accessToken,
      loanid: props.route.params.loadnDetails.loanid,
      date: date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate(),
    };
    try {
      await Post_Api(apiName.foreCloseRequest, Object, dispatch)
        .then(json => {
          if (json) {
            AlertBox({
              Message : 'Request successfuly submitted.',
              Title : i18n.Alert,
              onOkPress: () => navigationService.goBack()
            })
          }
        })
        .catch(error => {});
    } catch (error) {}
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
          <Text style={commanStyles.HeaderText}>Forceclose Loan</Text>
          <View style={{marginTop: 40}}>
            <View style={style.Box}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.HeadLine}>{'LAN'}:</Text>
                  <Text style={style.answerLine}>
                    {props.route.params.loadnDetails.lan}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.HeadLine}>{'Current Outstanding'}:</Text>
                  <Text style={style.answerLine}>
                    {
                      props.route.params.loadnDetails
                        .outstanding_amount
                    }
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <Text style={style.boxText}>Forceclose Date</Text>
            </View>
            <View style={style.Box2}>
              <TouchableOpacity
                onPress={() => setDatepicker(!datepickeropen)}
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
                    {date.getDate() +
                      '/' +
                      (date.getMonth() + 1) +
                      '/' +
                      date.getFullYear()}
                  </Text>
                </View>
                <Image
                  source={images.calander}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
            <CommonButton
              BUttonStyle={{
                height: 40,
                width: 190,
                marginVertical: 30,
                backgroundColor: colors.colorRed,
              }}
              textStyle={''}
              title={'Submit Request'}
              onPress={() => onSubmitRequest()}
            />
            {/* <View>
              <Text
                style={[
                  style.boxText,
                  {color: colors.ButtonColor, alignSelf: 'center'},
                ]}>
                Thankyou for your message, our team will get back to you soon!
              </Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
      <DatePicker
        modal
        open={datepickeropen}
        date={date}
        onConfirm={date => {
          setDatepicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setDatepicker(false);
        }}
        mode="date"
      />
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
export default ForeCloseLoan;
