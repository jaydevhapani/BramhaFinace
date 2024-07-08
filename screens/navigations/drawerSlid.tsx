// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {DrawerContentScrollView} from '@react-navigation/drawer';
import CommonFooterLogo from '../components/commonFooterLogo';
import images from '../assests/images';
import colors from '../utilies/colors';
import {loginAuth} from '../reduxConfig/slices/loginSlice';
import {ScreenName} from './screenName';
import navigationService from './navigationService';
import {useDispatch, useSelector} from 'react-redux';
import store from '../reduxConfig/store';

const CustomSidebarMenu = (props: any) => {
  // console.log(props?.descriptors);
  const dispatch = useDispatch();
  const {socialLinks} = useSelector(({commanSlice}) => commanSlice);
  console.log('====================================');
  console.log(socialLinks);
  console.log('====================================');
  const getImageOfObject = (index: any) => {
    const key = Object.keys(props?.descriptors)[index];
    return props?.descriptors[key].options.drawerLabel;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.upperBox}>
        <CommonFooterLogo imageStyle={styles.imageStyle} />
        <TouchableOpacity
          onPress={() => {
            dispatch(loginAuth(undefined));
            navigationService.resetAndRedirect(ScreenName.Login);
          }}>
          <Image
            source={images.LogOut}
            style={{
              height: 30,
              width: 30,
              transform: [{rotate: '90deg'}],
            }}
          />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props} style={{padding: 10}}>
        {props?.state?.routes?.map((_item: any, _index: number) => {
          if (_index <= 6) {
            return (
              <View key={_index}>
                <TouchableOpacity
                  style={[
                    styles.Items,
                    props?.navigation?.getState()?.index == _index && {
                      borderTopWidth: 0.5,
                      borderTopColor: colors.colorBlack,
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.colorBlack,
                      paddingTop: 8,
                      paddingBottom: 8,
                    },
                  ]}
                  onPress={() => {
                    props?.navigation?.navigate(_item.name);
                  }}>
                  {props?.navigation?.getState()?.index !== _index && (
                    <Image
                      source={getImageOfObject(_index)}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#df3b37',
                      }}
                    />
                  )}

                  <Text style={styles.ItemText}>{_item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: colors.lightGray,
            marginVertical: 20,
          }}
        />
        {props?.state?.routes?.map((_item: any, _index: number) => {
          if (_index >= 7) {
            return (
              <View key={_index}>
                <TouchableOpacity
                  style={[
                    styles.Items,
                    props?.navigation?.getState()?.index == _index && {
                      borderTopWidth: 0.5,
                      borderTopColor: colors.colorBlack,
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.colorBlack,
                      paddingTop: 8,
                      paddingBottom: 8,
                    },
                    _index == 7 && {marginTop: 0},
                    _index == props?.state?.routes?.length - 1 && {
                      marginBottom: 40,
                    },
                  ]}
                  onPress={() => {
                    props?.navigation?.navigate(_item.name);
                  }}>
                  {props?.navigation?.getState()?.index !== _index && (
                    <Image
                      source={getImageOfObject(_index)}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#df3b37',
                      }}
                    />
                  )}
                  <Text style={styles.ItemText}>{_item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </DrawerContentScrollView>
      <View
        style={{
          height: 40,
          width: '60%',
          marginVertical: 10,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => Linking.openURL(socialLinks.facebook)}>
          <Image source={images.facebook} style={styles.Icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(socialLinks.linkedin)}>
          <Image source={images.linkedin} style={styles.Icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(socialLinks.whatsapp)}>
          <Image source={images.whatsapp} style={styles.Icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(socialLinks.google)}>
          <Image source={images.google} style={styles.Icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(socialLinks.instagram)}>
          <Image source={images.instagram} style={styles.Icons} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  upperBox: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  imageStyle: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 0,
  },
  Items: {
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  ItemText: {
    fontSize: 18,
    color: colors.ButtonColor,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 10,
  },
  Icons: {
    height: 30,
    width: 30,
  },
});

export default CustomSidebarMenu;
