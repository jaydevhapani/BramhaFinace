import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import CommonHeader from '../../components/commonHeader';
import colors from '../../utilies/colors';
import images from '../../assests/images';

type Props = {
  route: any;
  navigation: any;
};

const PdfViewer = (props: Props) => {
  console.log(props.route.params.pdf);
  console.log(props.route.params.pdfDownload)

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CommonHeader
          isMenu={false}
          isDrawerFlag={''}
          navigation={props.navigation}
        />
        <Pdf
          trustAllCerts={false}
          source={{uri: props.route.params.pdf}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
      {props.route.params.pdfDownload && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            right: 20,
            height: 60,
            backgroundColor: colors.ButtonColor,
            borderRadius: 100,
            bottom: Dimensions.get('screen').height / 16,
          }}
          onPress={() => {
            Linking.openURL(props.route.params.pdfDownload)
          }}>
          <Image
            source={images.download}
            style={{height: 30, width: 36, tintColor: colors.colorWhite}}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
