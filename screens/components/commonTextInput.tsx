import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../utilies/colors';
import {Callback} from '@react-native-async-storage/async-storage/lib/typescript/types';

type Props = {
  title: any;
  onChange: any;
  placeHolder: any;
  inputViewStye?: any;
  textInputStyle?: any;
  maxLength?: any;
  keyboardType?: any;
  value?: any;
  rightSide?: boolean;
  rightSideOnPress?: Callback;
  Editable?: boolean;
};

const CommonTextInput = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <Text style={style.title}>{props.title}</Text>
      <View
        style={[
          style.viewBox,
          props.inputViewStye,
          props.rightSide && {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <TextInput
          value={props.value}
          style={[
            style.inputBox,
            props.textInputStyle,
            props.rightSide && {width: '82%'},
          ]}
          placeholder={isFocused ? '': props.placeHolder}
          maxLength={props.maxLength}
          keyboardType={props.keyboardType}
          onChange={t => props.onChange && props.onChange(t?.nativeEvent?.text)}
          editable={props.Editable == false ? props?.Editable : true}
          placeholderTextColor={'#00000025'}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.rightSide && (
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => props.rightSideOnPress && props.rightSideOnPress()}>
            <Text style={style.rightText}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  viewBox: {
    height: 60,
    width: '100%',
    borderWidth: 0.8,
    borderColor: colors.lightBlack,
    borderRadius: 20,
    marginTop: 2,
  },
  inputBox: {
    height: 60,
    width: '100%',
    paddingHorizontal: 14,
    borderRadius: 20,
    color: colors.colorBlack,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    color: colors.lightBlack,
    fontWeight: '400',
    marginTop: 6,
    marginBottom: 6,
  },
  rightText: {
    fontSize: 14,
    color: colors.DarkBlue,
    fontWeight: '700',
  },
});

export default CommonTextInput;
