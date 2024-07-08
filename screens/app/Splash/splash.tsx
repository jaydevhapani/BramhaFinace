import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import navigationService from '../../navigations/navigationService';
import {ScreenName} from '../../navigations/screenName';
import {useSelector} from 'react-redux';
import message from '@react-native-firebase/messaging';

type Props = {
  [x: string]: any;
};

const Splash = (props: Props) => {
  const {userData} = useSelector(({loginSlice}) => loginSlice);
  console.log('userData', userData);

  useEffect(() => {
    navigationService.setTopLevelNavigator(props?.navigation);
    setTimeout(() => {
      if (userData) {
        global.cid = userData?.cid; //set Cid for Loan Apis
        navigationService.resetAndRedirect(ScreenName.DashBoard);
      } else {
        navigationService.resetAndRedirect(ScreenName.Onboarding);
      }
      getInitialPushNotification();
    }, 1500);
  }, [props]);

  const getInitialPushNotification = async () => {
    const initialMessage = await message().getInitialNotification();
    console.log('initialMessgae : ', initialMessage);
    if (initialMessage) {
      if (initialMessage.notification) {
        if (userData) {
          navigationService.navigate(ScreenName.Notification, {});
        }
      }
    }
  };
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
