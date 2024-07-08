import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import commanStyles from '../../utilies/commanStyles';
  import CommonHeader from '../../components/commonHeader';
  import {useDrawerStatus} from '@react-navigation/drawer';
  import colors from '../../utilies/colors';
  import images from '../../assests/images';
  import navigationService from '../../navigations/navigationService';
  import {ScreenName} from '../../navigations/screenName';
  import CommonTextInput from '../../components/commonTextInput';
  import CommonButton from '../../components/commonButton';
  
  type Props = {
    navigation: any;
  };
  
  const dummyArray = [
    {
      LAN: '48734687932493278',
      LoanAmount: '20000',
      EMIAmount: '29873',
      EMIDate: '07th of every month',
      Overdue: '10000',
    },
  ];
  
  const PartPayment = (props: Props) => {
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
              <FlatList
                data={dummyArray}
                style={{paddingBottom : 10}}
                renderItem={({item, index}) => {
                  return (
                    <View style={style.Box}>
                      <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={style.HeadLine}>
                            {Object.keys(item)[0]}:
                          </Text>
                          <Text style={style.answerLine}>{item.LAN}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={style.HeadLine}>
                            {Object.keys(item)[2]}:
                          </Text>
                          <Text style={style.answerLine}>{item.EMIAmount}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={style.HeadLine}>
                            {Object.keys(item)[3]}:
                          </Text>
                          <Text style={style.answerLine}>{item.EMIDate}</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
              />
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
                    style={{
                      borderBottomColor: colors.lightBlack,
                      borderBottomWidth: 0.5,
                      width: 100,
                      paddingBottom: 2,
                    }}
                    placeholder="amount"
                    keyboardType="number-pad"
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
                onPress={() => {}}
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
  export default PartPayment;
  