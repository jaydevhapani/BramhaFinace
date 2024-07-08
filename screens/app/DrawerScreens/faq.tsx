import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {Post_Api} from '../../apiHelper/apiHelper';
import apiName from '../../apiHelper/apiName';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import i18n from '../../utilies/i18n';
import colors from '../../utilies/colors';
import images from '../../assests/images';
import navigationService from '../../navigations/navigationService';
import { ScreenName } from '../../navigations/screenName';

type Props = {
  navigation: any;
};

const Faq = (props: Props) => {
  const dispatch = useDispatch();
  const [faqs, setFaq] = useState();
  const focus = useIsFocused();

  useEffect(() => {
    getAllFaq();
  }, [focus]);

  //getAllNotification
  const getAllFaq = async () => {
    const Object = {
      token: global.accessToken,
    };
    try {
      await Post_Api(apiName.getFaqs, Object, dispatch)
        .then(json => {
          if (json) {
            setFaq(json.data);
          }
        })
        .catch(error => {});
    } catch (error) {}
  };

  //chanhgeValueOfKey
  const chanhgeValueOfKey = (index: number) => {
    var newArray = [...faqs];
    newArray[index].isOpen =
      newArray[index].isOpen == undefined
        ? true
        : newArray[index].isOpen == false
        ? true
        : false;
    setFaq(newArray);
  };

  //renderItems
  const renderItems = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: colors.lightGray,
          borderBottomColor: colors.lightGray,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => chanhgeValueOfKey(index)}
        key={index}>
        <View>
          <Text style={styles.notificationHeaderText}>{item.question}</Text>
          {item?.isOpen && (
            <Text style={styles.notificationHeaderMessage}>{item.answer}</Text>
          )}
        </View>
        <View>
          <Image
            source={images.down}
            style={[
              {height: 30, width: 30},
              item?.isOpen && {transform: [{rotate: '180deg'}]},
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isMenu
        isDrawerFlag={useDrawerStatus()}
        navigation={props?.navigation}
      />
      <View style={[commanStyles.Container, commanStyles.pH10]}>
        <Text style={commanStyles.HeaderText}>
          {i18n.SwadhaText + '-' + 'FAQ'}
        </Text>
        <Text style={styles.headerText1}>{'We are here to Help!'}</Text>
        <View>
          {faqs && (
            <FlatList
              style={{marginTop: 20}}
              data={faqs}
              renderItem={({item, index}) => renderItems(item, index)}
              ItemSeparatorComponent={() => <View style={{marginTop: 20}} />}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            height: 36,
            paddingVertical: 4,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.colorRed,
            borderRadius: 100,
            alignSelf : 'center',
            marginVertical : 20,
          }}
          onPress={() => {
            navigationService.navigate(ScreenName.GetInTouch, {});
          }}>
          <Text style={{color: colors.colorWhite}}>{'Send Message'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  headerText1: {
    color: colors.colorBlack,
    fontSize: 16,
    alignSelf: 'center',
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
  },
  notificationHeaderText: {
    color: colors.colorBlack,
    fontSize: 16,
    letterSpacing: 0.4,
    fontWeight: '800',
    fontFamily: 'Montserrat-Medium',
  },
  notificationHeaderMessage: {
    color: colors.colorBlack,
    fontSize: 14,
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
