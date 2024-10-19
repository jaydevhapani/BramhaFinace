import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import { useDrawerStatus } from '@react-navigation/drawer';
import i18n from '../../utilies/i18n';
import colors from '../../utilies/colors';
import images from '../../assests/images';
import navigationService from '../../navigations/navigationService';
import { ScreenName } from '../../navigations/screenName';
import { Post_Api } from '../../apiHelper/apiHelper';
import apiName from '../../apiHelper/apiName';
import { useDispatch } from 'react-redux';
import { userProfileData } from '../../reduxConfig/slices/commanSlice';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  navigation: any;
};

const MyLoan = (props: Props) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();

  useEffect(() => {
    fetchActiveLoan();
  }, [focus]);

  //State
  const [loanData, setLoanData] = useState({
    active: [],
    closed: [],
  });

  //fetchActiveLoan
  const fetchActiveLoan = async () => {
    const Object = {
      token: global.accessToken,
      cid: global.cid,
    };
    try {
      await Post_Api(apiName.myLoans, Object, dispatch)
        .then(json => {
          if (json) {
            handleArray(json?.data?.active, 'active');
            handleArray(json?.data?.closed, 'closed');
          }
        })
        .catch(error => { });
    } catch (error) { }
  };

  const handleArray = (data: any, key: string) => {
    setLoanData(prevdata => ({ ...prevdata, [key]: data }));
  };

  return (
    <SafeAreaView style={[commanStyles.Container]}>
      <CommonHeader
        isMenu
        isDrawerFlag={useDrawerStatus()}
        navigation={props?.navigation}
      />
      <Text style={commanStyles.HeaderText}>{i18n.MyLoan}</Text>
      {/* Active Loans */}
      <View style={{ height: 30 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={commanStyles.pH10}>
        {loanData.active && loanData.active.length != 0 && (
          <>
            <Text style={style.boxText}>{i18n.ActiveLoan}</Text>
            <FlatList
              data={loanData.active}
              renderItem={({ item, index }) => (
                <RenderItem
                  key={index}
                  index={index}
                  item={item}
                  isActive={true}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
          </>
        )}
        {/* Closed Loans */}
        <View style={{ height: 30 }} />
        {loanData.closed && loanData.closed.length != 0 && (
          <>
            <Text style={style.boxText}>{i18n.ClosedLoan}</Text>
            <FlatList
              data={loanData.closed}
              renderItem={({ item, index }) => (
                <RenderItem
                  key={index}
                  index={index}
                  item={item}
                  isActive={false}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

type Items = {
  item: any;
  index: number;
  isActive: boolean;
};

const RenderItem = React.memo((data: Items) => {
  console.log('====================================');
  console.log(data.item);
  console.log('====================================');
  return (
    <TouchableOpacity
      key={data.index}
      style={[
        style.ItemBox,
        { backgroundColor: data.isActive ? '#90EE90' : '#FAA0A0' },
      ]}
      onPress={() => {
        console.log(data.item);

        navigationService.navigate(ScreenName.LoanStatus, {
          loanid: data.item['loanid'],
          lan: data.item['loan_ac_no'],
          isActive: data.isActive,
        });
      }}>
      <View style={{ flex: 6 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'LAN'}:</Text>
          <Text style={style.answerLine}>{data.item['loan_ac_no']}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'Loan Amount'}:</Text>
          <Text style={style.answerLine}>{data.item['loan_amount']}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'EMI Amount'}:</Text>
          <Text style={style.answerLine}>{data.item['emi_amount']}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'EMI Date'}:</Text>
          <Text style={style.answerLine}>{data.item['emi_date']}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'Overdue'}:</Text>
          <Text style={style.answerLine}>{data.item['overdue']}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'Start Date'}:</Text>
          <Text style={style.answerLine}>{data.item['emi_start']}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.HeadLine}>{'End Date'}:</Text>
          <Text style={style.answerLine}>{data.item['emi_end']}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.arrow}
          style={{
            height: 26,
            width: 26,
            transform: [{ rotate: '180deg' }],
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

const style = StyleSheet.create({
  ItemBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.grey4,
    shadowColor: colors.lightBlack,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: 'row',
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
export default MyLoan;
