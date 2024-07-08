import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import {useDrawerStatus} from '@react-navigation/drawer';
import colors from '../../utilies/colors';
import CommonTextInput from '../../components/commonTextInput';
import i18n from '../../utilies/i18n';
import CommonButton from '../../components/commonButton';
import CommonAlertBox from '../../components/commonAlertBox';
import {HEIGHT} from '../../utilies/constant';
import CommanProfileBox from '../../components/commanProfileBox';
import {useSelector} from 'react-redux';
import images from '../../assests/images';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: any;
};

const MyProfile = (props: Props) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const {userProfileData} = useSelector(({commanSlice}) => commanSlice);

  const [profileData, setProfileData] = useState({
    name: userProfileData?.first_name + ' ' + userProfileData?.last_name,
    email: userProfileData?.email,
    phoneNumber: userProfileData?.contactno1,
  });

  //handleOnChangeText
  const handleOnChangeText = (value: any, key: string) => {
    setProfileData(prevalue => ({...prevalue, [key]: value}));
  };

  useFocusEffect(
    React.useCallback(() => {
      setProfileData({
        name: userProfileData?.first_name + ' ' + userProfileData?.last_name,
        email: userProfileData?.email,
        phoneNumber: userProfileData?.contactno1,
      });

      return Keyboard.dismiss();
    }, []),
  );

  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isMenu={true}
        isDrawerFlag={useDrawerStatus()}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={[{flex: 1}]}>
        {isPopUp && (
          <CommonAlertBox
            onPress={() => setIsPopUp(false)}
            discription={
              'Kindly find your nearest branch\nand update your email, and\nconnect with the KYC.'
            }
            logo={images.tickMark}
            buttonName={'Cancel'}
          />
        )}
        <View style={[commanStyles.Container, commanStyles.pH10]}>
          <Text style={commanStyles.HeaderText}>My Profile</Text>
          <View>
            <CommanProfileBox />
            {/* <TouchableOpacity style={styles.absoluteButton}></TouchableOpacity> */}
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: 350,
              marginTop: 40,
            }}>
            <CommonTextInput
              value={profileData.name}
              title={'Name'}
              placeHolder={'Enter Your Name'}
              onChange={(t: any) => handleOnChangeText(t, 'name')}
              maxLength={10}
              Editable={false}
              inputViewStye={{backgroundColor: '#88888850'}}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: 350,
              marginTop: 20,
            }}>
            <CommonTextInput
              value={profileData.email}
              title={'Email Address'}
              rightSide={true}
              rightSideOnPress={() => setIsPopUp(!isPopUp)}
              placeHolder={'Enter Your Email Address'}
              onChange={(t: any) => handleOnChangeText(t, 'email')}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: 350,
              marginTop: 20,
            }}>
            <CommonTextInput
              value={profileData.phoneNumber}
              title={'Phone Number'}
              placeHolder={'Phone Number'}
              rightSide={true}
              rightSideOnPress={() => setIsPopUp(!isPopUp)}
              onChange={(t: any) => handleOnChangeText(t, 'phoneNumber')}
              maxLength={10}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default MyProfile;
