import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React from 'react';
import colors from '../utilies/colors';

type Props = {
  onPress?: any;
  onPressRepayment?: any;
  discription?: any;
  logo?: any;
  buttonName?: any;
  EmiData?: any;
};

const CommonAlertBox = (props: Props) => {
  return (
    <Modal animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          // marginTop: 22,
        }}>
        <View
          style={[
            {
              height: 360,
              width: 370,
              borderRadius: 10,
              shadowColor: colors.lightBlack,
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 4,
              backgroundColor: colors.snowBlue,
              alignItems: 'center',
              justifyContent: 'space-around',
            },
            props?.EmiData && {justifyContent: 'space-evenly'},
          ]}>
          {props.discription && (
            <>
              {props.logo && (
                <View>
                  <Image source={props.logo} style={{height: 90, width: 90}} />
                </View>
              )}
              {props.discription && (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.colorGray,
                      fontWeight: '600',
                    }}>
                    {props.discription}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={{
                  height: 36,
                  width: 100,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.colorRed,
                  borderRadius: 100,
                }}
                onPress={() => props.onPress && props.onPress()}>
                <Text style={{color: colors.colorWhite}}>
                  {props.buttonName}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {props?.EmiData && (
            <>
              <Text
                style={{
                  fontSize: 26,
                  letterSpacing: 0.5,
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: colors.colorBlack,
                  fontWeight: '500',
                }}>
                ₹{props?.EmiData?.emi}/month
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  paddingVertical: 10,
                  marginVertical: 10,
                  borderTopColor: colors.colorGray,
                  borderBottomColor: colors.colorGray,
                  alignItems: 'center',
                  width: 320,
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.colorBlack,
                      fontWeight: '500',
                    }}>
                    Loan Amount
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.lightBlack,
                      fontWeight: '400',
                    }}>
                    ₹{props.EmiData.loanamount}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.colorBlack,
                      fontWeight: '500',
                    }}>
                    Tenure
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.lightBlack,
                      fontWeight: '400',
                    }}>
                    {props.EmiData.tenure} Months
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.colorBlack,
                      fontWeight: '500',
                    }}>
                    Interest
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      letterSpacing: 0.5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: colors.lightBlack,
                      fontWeight: '400',
                    }}>
                    {props.EmiData.roi}%
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                  width: '88%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: colors.colorBlack,
                    fontWeight: '500',
                  }}>
                  Principal Loan Amount
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: colors.lightBlack,
                    fontWeight: '400',
                  }}>
                  ₹{props.EmiData.loanamount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                  width: '88%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: colors.colorBlack,
                    fontWeight: '500',
                  }}>
                  Total Interest Payable
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: colors.lightBlack,
                    fontWeight: '400',
                  }}>
                  ₹{props.EmiData.interest_payable}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                  width: '88%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: colors.colorBlack,
                    fontWeight: '500',
                  }}>
                  Total amount payable
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: colors.lightBlack,
                    fontWeight: '400',
                  }}>
                  ₹{props.EmiData.total_payable}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity
                  style={{
                    height: 36,
                    width: 100,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.DarkBlue,
                    borderRadius: 100,
                    marginVertical: 10,
                  }}
                  onPress={() => props.onPress && props.onPress()}>
                  <Text style={{color: colors.colorWhite}}>
                    {props.buttonName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 36,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.DarkBlue,
                    borderRadius: 100,
                    marginVertical: 10,
                    marginLeft: 20,
                  }}
                  onPress={() => props.onPressRepayment && props.onPressRepayment()}>
                  <Text style={{color: colors.colorWhite}}>
                    {'Repayment Schedule'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CommonAlertBox;
