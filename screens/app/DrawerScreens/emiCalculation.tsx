import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import Slider from '@react-native-community/slider';
import colors from '../../utilies/colors';
import {AlertBox, WIDTH} from '../../utilies/constant';
import CommonButton from '../../components/commonButton';
import images from '../../assests/images';
import DatePicker from 'react-native-date-picker';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {Post_Api} from '../../apiHelper/apiHelper';
import apiName from '../../apiHelper/apiName';
import {useDispatch} from 'react-redux';
import i18n from '../../utilies/i18n';
import CommonAlertBox from '../../components/commonAlertBox';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';

type Props = {
  navigation: any;
};

const EmiCalculation = (props: Props) => {
  const [sliderValues, setSliderValues] = useState({
    Amount: 0,
    Tenure: 0,
    InterestRate: 0,
  });
  const [datepickeropen, setDatepicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [emiCalData, setEmiCalData] = useState(undefined);
  const [isemiCalData, setIsEmiCalData] = useState(Boolean);

  const dispatch = useDispatch();
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Reducing',
        value: 'Reducing',
      },
      {
        id: '2',
        label: 'Flat',
        value: 'Flat',
      },
    ],
    [],
  );
  //emiCalApi
  const emiCalApi = async () => {
    let Config = {
      token: global.accessToken,
      loanamount: sliderValues.Amount.toFixed() + '00000',
      tenure: sliderValues.Tenure.toFixed(),
      roi: sliderValues.InterestRate.toFixed(),
      startdate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      method: radioButtons.find(button => button.id == selectedId)?.value,
    };
    console.log(Config);

    if (sliderValues.Amount == 0) {
      AlertBox({
        Title: i18n.Alert,
        Message: 'Amount 0 is not acceptable',
      });
    } else if (sliderValues.InterestRate == 0) {
      AlertBox({
        Title: i18n.Alert,
        Message: 'Interest rest 0 is not acceptable',
      });
    } else if (sliderValues.Tenure == 0) {
      AlertBox({
        Title: i18n.Alert,
        Message: 'Tenure 0 is not acceptable',
      });
    } else if (!selectedId) {
      AlertBox({
        Title: i18n.Alert,
        Message: 'Please select Reducing or Flat.',
      });
    } else {
      try {
        await Post_Api(apiName.EmiCal, Config, dispatch)
          .then(json => {
            if (json) {
              if (json) {
                setEmiCalData(json.data);
                setIsEmiCalData(!isemiCalData);
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
        isDrawerFlag={useDrawerStatus()}
        isMenu={true}
        navigation={props.navigation}
      />
      <View style={[commanStyles.Container, commanStyles.pH10]}>
        <View>
          <Text style={commanStyles.HeaderText}>{'EMI Calculator'}</Text>
        </View>
        <ScrollView>
          <View style={[style.box, commanStyles.M10]}>
            <View style={style.AmountView}>
              <Text style={style.AmountText}>{'Loan Amount'}</Text>
              <Text style={style.AmountText}>
                {sliderValues.Amount.toFixed()} Lacs
              </Text>
            </View>
            <Slider
              style={{width: 330}}
              thumbTintColor='#df3b37'
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor={colors.green1}
              maximumTrackTintColor="#000000"
              onValueChange={(t: any) => {
                setSliderValues(prev => ({...prev, Amount: t}));
              }}
            />
          </View>
          <View style={[style.box, commanStyles.M10]}>
            <View style={style.AmountView}>
              <Text style={style.AmountText}>{'Tenure'}</Text>
              <Text style={style.AmountText}>
                {sliderValues.Tenure.toFixed()} Months
              </Text>
            </View>

            <Slider
              style={{width: 330}}
              minimumValue={1}
              maximumValue={84}
              thumbTintColor='#df3b37'
              minimumTrackTintColor={colors.green1}
              maximumTrackTintColor="#000000"
              onValueChange={(t: any) => {
                setSliderValues(prev => ({...prev, Tenure: t}));
              }}
            />
          </View>
          <View style={[style.box, commanStyles.M10]}>
            <View style={style.AmountView}>
              <Text style={style.AmountText}>{'Interest Rate'}</Text>
              <Text style={style.AmountText}>
                {sliderValues.InterestRate.toFixed()} %
              </Text>
            </View>
            <Slider
              style={{width: 330}}
              minimumValue={1}
              maximumValue={50}
              thumbTintColor='#df3b37'
              minimumTrackTintColor={colors.green1}
              maximumTrackTintColor="#000000"
              onValueChange={(t: any) => {
                setSliderValues(prev => ({...prev, InterestRate: t}));
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: colors.lightBlack,
              fontWeight: '600',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            {'Select Start date'}
          </Text>
          <TouchableOpacity
            onPress={() => setDatepicker(!datepickeropen)}
            style={[style.Box2]}>
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
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            layout="row"
            containerStyle={{alignSelf: 'center'}}
          />
          <View style={{marginTop: 40}}>
            <CommonButton
              onPress={() => emiCalApi()}
              title={'Calculate'}
              BUttonStyle={{height: 50}}
              textStyle={''}
            />
          </View>
        </ScrollView>
      </View>
      {isemiCalData && (
        <CommonAlertBox
          EmiData={emiCalData}
          onPress={() => {
            setIsEmiCalData(!isemiCalData);
          }}
          buttonName={'Cancel'}
          onPressRepayment={() => {
            setIsEmiCalData(!isemiCalData);
            navigationService.navigate(ScreenName.RepaymentShedual, {
              data: emiCalData,
            });
          }}
        />
      )}
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
  box: {
    height: 100,
    backgroundColor: colors.colorWhite,
    borderRadius: 10,
    shadowColor: colors.lightBlack,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AmountText: {
    fontSize: 16,
    color: colors.gray3,
    fontWeight: '600',
  },
  AmountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  Box2: {
    backgroundColor: colors.colorWhite,
    shadowColor: colors.lightBlack,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
    borderWidth: 0.5,
    height: 60,
    width: 300,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default EmiCalculation;
