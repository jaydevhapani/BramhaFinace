import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import commanStyles from '../../utilies/commanStyles';
import CommonHeader from '../../components/commonHeader';
import colors from '../../utilies/colors';

type Props = {
  navigation: any;
  route: {params: any};
};

const RepaymentSchedule = (props: Props) => {
  console.log('====================================');
  console.log(props.route.params.data.repayment_schedule);
  console.log('====================================');
  return (
    <SafeAreaView style={commanStyles.Container}>
      <CommonHeader
        isDrawerFlag={''}
        isMenu={false}
        navigation={props.navigation}
      />
      <ScrollView style={{flex: 1}}>
        <View
          style={[commanStyles.Container, commanStyles.pH10, {paddingTop: 40}]}>
          {props.route.params.data.repayment_schedule && (
            <FlatList
              data={props.route.params.data.repayment_schedule}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 40,
                      width: '100%',
                      backgroundColor: 'black',
                    }}>
                    <View style={styles.box1}>
                      <Text style={styles.text}>SN</Text>
                    </View>
                    <View style={styles.box2}>
                      <Text style={styles.text}>Payment Date</Text>
                    </View>
                    <View style={styles.box2}>
                      <Text style={styles.text}>Monthly EMI</Text>
                    </View>
                    <View style={styles.box2}>
                      <Text style={styles.text}>Principal Paid</Text>
                    </View>
                    <View style={styles.box2}>
                      <Text style={styles.text}>Interest Paid</Text>
                    </View>
                    <View style={styles.box2}>
                      <Text style={styles.text}>Balance</Text>
                    </View>
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 40,
                      width: '100%',
                    }}>
                    <View style={styles.box3}>
                      <Text style={styles.text1}>{item.sn}</Text>
                    </View>
                    <View style={styles.box4}>
                      <Text style={styles.text1}>{item.date}</Text>
                    </View>
                    <View style={styles.box4}>
                      <Text style={styles.text1}>{item.emi}</Text>
                    </View>
                    <View style={styles.box4}>
                      <Text style={styles.text1}>{item.principal}</Text>
                    </View>
                    <View style={styles.box4}>
                      <Text style={styles.text1}>{item.interest}</Text>
                    </View>
                    <View style={styles.box4}>
                      <Text style={styles.text1}>{item.balance}</Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepaymentSchedule;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  box2: {
    flex: 2,
    height: 40,
    justifyContent: 'center',
  },
  box3: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.lightBlack,
  },
  box4: {
    flex: 2,
    height: 40,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.lightBlack,
  },
  text: {
    color: colors.colorWhite,
    alignSelf: 'center',
  },
  text1: {
    color: colors.lightBlack,
    alignSelf: 'center',
  },
});
