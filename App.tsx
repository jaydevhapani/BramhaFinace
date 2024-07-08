import {
  Alert,
  AppState,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import ScreenNavigation from './screens/navigations/screenNavigation';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store from './screens/reduxConfig/store';
import netInfo from '@react-native-community/netinfo';
import CommonLoader from './screens/components/commonLoader';
import Geolocation from '@react-native-community/geolocation';
import i18n from './screens/utilies/i18n';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import navigationService from './screens/navigations/navigationService';
import {ScreenName} from './screens/navigations/screenName';
import apiName from './screens/apiHelper/apiName';

//GLOBAL PROPS
type Props = {};

//GLOBAL VARIALBLES OPRATION
declare global {
  var isInterNetConection: boolean;
  var accessToken: string;
  var cid: String;
}

//REDUX PART
let persister = persistStore(store);

//CHECK INTERNET OPRATION
const interNetConnectivity = async () => {
  netInfo.addEventListener(state => {
    if (state.isInternetReachable || state.isConnected) {
      global.isInterNetConection = true;
      global.accessToken = '5dc259a22d32db0a716a44dab909e80a';
    } else {
      global.isInterNetConection = false;
      Alert.alert('Opps! No Internet Connection.');
    }
  });
};

//CallApiEvryTimeOn#0Min
const getUserLocation = async () => {
  Geolocation.getCurrentPosition(info => {
    console.log('location : ', info);

    startInveralOfAPi(info);
  });
};
let Interval: NodeJS.Timeout;
//startInveralOfAPi
const startInveralOfAPi = (info: any) => {
  Interval = setInterval(() => {
    console.log('====================================');
    console.log('info :: ', info);
    console.log('====================================');
    if (global.cid && global.accessToken) {
      callAPiOfUpdateLocation(info);
    }
  }, 1800000); // 30 minutes in milliseconds
  // 1800000
};

//callAPiOfUpdateLocation
const callAPiOfUpdateLocation = async (info: any) => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  );
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  );

  let Object = {
    token: global.accessToken,
    cid: global.cid,
    latitude: info.coords.latitude,
    longitude: info.coords.longitude,
  };
  await fetch(apiName.updateLocation, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${global.accessToken}`,
    },
    body: JSON.stringify(Object),
  })
    .then(response => response.json())
    .then(json => {
      console.log('JsonData', json);
    })
    .catch(error => {
      console.log('error ::: ', error);
      return error;
    });
};

//callFirebaseNotificationPermission
const callFirebaseNotificationPermission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
  }
};

// Note that an async function or a function that returns a Promise
// is required for both subscribers.
async function onMessageReceived(message: any) {
  // Do something
  let notificatoinData = message?.notification;
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  console.log('channelId : ', channelId);

  await notifee.displayNotification({
    id: 'default',
    title: notificatoinData?.title,
    body: notificatoinData?.body,
    data: notificatoinData?.data,
    android: {
      channelId: channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

//notificationClickEvent
const notificationClickEvent = () => {
  const unsubscribeFrouground = notifee.onForegroundEvent(
    async ({type, detail}) => {
      console.log('====================================');
      console.log(type);
      console.log('====================================');
      if (type === EventType.PRESS) {
        if (store.getState().loginSlice.userData) {
          navigationService.navigate(ScreenName.Notification, {});
        }
      }
    },
  );
  return unsubscribeFrouground;
};

//messageHandler
const messageHandler = async () => {
  messaging().onNotificationOpenedApp(async message => {
    console.log('on application click event :: ', message);
    if (message?.notification) {
      if (store.getState().loginSlice.userData) {
        navigationService.navigate(ScreenName.Notification, {});
      }
    }
  });
  const unsubscribe = messaging().onMessage(onMessageReceived);
  return unsubscribe;
};

// Register background handler
messaging().setBackgroundMessageHandler(async message => {
});

//APPLICATION START
const App = (props: Props) => {
  useEffect(() => {
    getUserLocation();
    callFirebaseNotificationPermission();
    interNetConnectivity();
    messageHandler();
    notificationClickEvent();
    return () => clearInterval(Interval);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <NavigationContainer>
          <ScreenNavigation />
          <CommonLoader />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
