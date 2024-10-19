import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import commanStyles from '../../utilies/commanStyles';
import colors from '../../utilies/colors';
import CommonLogo from '../../components/commonLogo';
import CommonSwadhaText from '../../components/commonSwadhaText';
import images from '../../assests/images';
import i18n from '../../utilies/i18n';
import NavigationService from '../../navigations/navigationService';
import { ScreenName } from '../../navigations/screenName';
import { ScrollView } from 'react-native-gesture-handler';
import { HEIGHT } from '../../utilies/constant';

type Props = {};

const Onboarding = (props: Props) => {
  const [onBordingText, setOnBordingText] = useState(
    'Single platform for all needs',
  );
  const [onBordingTage, setOnBordingTage] = useState({
    onBordingTage1: false,
    onBordingTage2: false,
    onBordingTage3: false,
  });

  //onNextPress
  const onNextAndPrevPress = (key: String) => {
    if (key == 'isNext') {
      if (onBordingTage.onBordingTage3) {
        NavigationService.resetAndRedirect(ScreenName.Login);
      }
      if (!onBordingTage.onBordingTage1) {
        setOnBordingTage({
          onBordingTage1: true,
          onBordingTage2: false,
          onBordingTage3: false,
        });
        setOnBordingText(i18n.onBording1);
      }
      if (onBordingTage.onBordingTage1 && !onBordingTage.onBordingTage2) {
        setOnBordingTage({
          onBordingTage1: false,
          onBordingTage2: true,
          onBordingTage3: false,
        });
        setOnBordingText(i18n.onBording2);
      }
      if (onBordingTage.onBordingTage2 && !onBordingTage.onBordingTage3) {
        setOnBordingTage({
          onBordingTage1: false,
          onBordingTage2: false,
          onBordingTage3: true,
        });
        setOnBordingText(i18n.onBording3);
      }
    } else {
      if (onBordingTage.onBordingTage1) {
        setOnBordingTage({
          onBordingTage1: false,
          onBordingTage2: false,
          onBordingTage3: false,
        });
        setOnBordingText('Single platform for all needs');
      }
      if (onBordingTage.onBordingTage2) {
        setOnBordingTage({
          onBordingTage1: true,
          onBordingTage2: false,
          onBordingTage3: false,
        });
        setOnBordingText(i18n.onBording1);
      }
      if (onBordingTage.onBordingTage3) {
        setOnBordingTage({
          onBordingTage1: false,
          onBordingTage2: true,
          onBordingTage3: false,
        });
        setOnBordingText(i18n.onBording2);
      }
    }
  };

  return (
    <View style={[commanStyles.Container, { backgroundColor: 'white' }]}>
      <ScrollView>
        <View style={{ height: HEIGHT / 2, justifyContent: 'flex-end' }}>
          <CommonLogo />
          <View style={commanStyles.M10}>
            <CommonSwadhaText color={colors.colorRed} />
          </View>
        </View>
        {/* <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={images.OnbordingHalf1}
              style={{
                height: 130,
                width: 220,
              }}
            />
            <Image
              source={images.OnbordingRound}
              resizeMode="contain"
              style={{height: 130, right: 30}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={images.OnbordingHalf2}
              style={{
                height: 130,
                width: 220,
              }}
            />
            <Image
              source={images.OnbordingRound}
              resizeMode="contain"
              style={{height: 130, right: 30}}
            />
          </View>
        </View> */}
        <View style={[styles.boxes]}>
          <Text style={styles.onBordingText}>{onBordingText}</Text>
          <Image
            source={images.Troffy}
            resizeMode="contain"
            style={styles.TroffyImage}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent:
                onBordingTage.onBordingTage1 ||
                  onBordingTage.onBordingTage2 ||
                  onBordingTage.onBordingTage3
                  ? 'space-between'
                  : 'center',
              marginHorizontal: 20,
            }}>
            {(onBordingTage.onBordingTage1 ||
              onBordingTage.onBordingTage2 ||
              onBordingTage.onBordingTage3) && (
                <Text
                  style={styles.OnNext}
                  onPress={() => onNextAndPrevPress('')}>
                  {i18n.Preview}
                </Text>
              )}
            <Text
              style={styles.OnNext}
              onPress={() => onNextAndPrevPress('isNext')}>
              {i18n.Next}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  boxes: {
    // flex: 0.5,
  },
  onBordingText: {
    color: colors.colorRed,
    fontSize: 20,
    alignSelf: 'center',
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Medium',
    marginTop: 50,
  },
  TroffyImage: {
    height: 120,
    alignSelf: 'center',
    marginTop: 10,
  },
  OnNext: {
    color: colors.colorRed,
    fontSize: 24,
    marginTop: 20,
    alignSelf: 'center',
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'underline',
  },
});
