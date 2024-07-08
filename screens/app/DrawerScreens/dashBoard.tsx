import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import i18n from '../../utilies/i18n';
import colors from '../../utilies/colors';
import images from '../../assests/images';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';
import {Get_Api, Post_Api} from '../../apiHelper/apiHelper';
import apiName from '../../apiHelper/apiName';
import {useDispatch} from 'react-redux';
import {setAllSocialLinks, userProfileData} from '../../reduxConfig/slices/commanSlice';
import { useIsFocused } from '@react-navigation/native';

const dummyArray = [
  {
    LAN: '48734687932493278',
    LoanAmount: '20000',
    EMIAmount: '29873',
    EMIDate: '07th of every month',
    Overdue: '10000',
  },
  {
    LAN: '48734687932493278',
    LoanAmount: '20000',
    EMIAmount: '29873',
    EMIDate: '07th of every month',
    Overdue: '10000',
  },
];

type Props = {
  navigation: any;
};

const DashBoard = (props: Props) => {
  const dispatch = useDispatch();
  const focus  = useIsFocused();
  useEffect(() => {
    fetchProfileScreen();
    fetchActiveLoan();
    getSocialLinks();
  }, [focus]);

  //getSocialLinks
  const getSocialLinks = async() => {
    try {
      await Get_Api(apiName.getSocialLinks, Object)
        .then(json => {
            dispatch(setAllSocialLinks(json))
        })
        .catch(error => {});
    } catch (error) {}
  }

  //State
  const [activeData, setActiveData] = useState([]);

  //fetchActiveLoan
  const fetchActiveLoan = async () => {
    const Object = {
      token: global.accessToken,
      cid: global.cid,
    };
    try {
      await Post_Api(apiName.activeLoan, Object, dispatch)
        .then(json => {
          if (json) {
            setActiveData(json.data);
          }
        })
        .catch(error => {});
    } catch (error) {}
  };

  //fetchProfileScreen
  const fetchProfileScreen = async () => {
    const Object = {
      token: global.accessToken,
      cid: global.cid,
    };
    try {
      await Post_Api(apiName.getProfile, Object, dispatch)
        .then(json => {
          if (json) {
            dispatch(userProfileData(json?.data));
          }
        })
        .catch(error => {});
    } catch (error) {}
  };

  return (
    <SafeAreaView style={[commanStyles.Container]}>
      <CommonHeader
        isMenu
        isDrawerFlag={useDrawerStatus()}
        navigation={props?.navigation}
      />
      <View
        style={[
          commanStyles.Container,
          commanStyles.pH10,
          {paddingBottom: 10},
        ]}>
        <Text style={commanStyles.HeaderText}>{i18n.Dashboard}</Text>
        {/* Active Loans */}
        <View style={{height: 30}} />
        {activeData && activeData.length != 0 && (
          <FlatList
            data={activeData}
            renderItem={({item, index}) => (
              <RenderItem item={item} index={index} />
            )}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            ListHeaderComponent={() => (
              <Text style={style.boxText}>{i18n.ActiveLoan}</Text>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const RenderItem = React.memo(({item}: any, index: any) => {
  return (
    <TouchableOpacity
      key={index}
      style={[style.ItemBox, {backgroundColor : '#df3b37'}]}
      onPress={() => {
        navigationService.navigate(ScreenName.LoanStatus, {
          loanid: item['loanid'],
          lan : item['loan_ac_no'],
          isActive : true,
        });
      }}>
      <View style={{flex: 6}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'LAN'}:</Text>
          <Text style={style.answerLine}>{item['loan_ac_no']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'Loan Amount'}:</Text>
          <Text style={style.answerLine}>{item['loan_amount']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'EMI Amount'}:</Text>
          <Text style={style.answerLine}>{item['emi_amount']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'EMI Date'}:</Text>
          <Text style={style.answerLine}>{item['emi_date']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'Overdue'}:</Text>
          <Text style={style.answerLine}>{item['overdue']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'Start Date'}:</Text>
          <Text style={style.answerLine}>{item['emi_start']}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.HeadLine}>{'End Date'}:</Text>
          <Text style={style.answerLine}>{item['emi_end']}</Text>
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
            transform: [{rotate: '180deg'}],
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
    shadowOffset: {width: -2, height: 4},
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
export default DashBoard;
