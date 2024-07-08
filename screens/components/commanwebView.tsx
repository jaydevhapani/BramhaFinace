import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

type Props = {
  url: string;
  handleWebViewMessage?: any;
};

export default function CommanwebView(props: Props) {
  return (
    <WebView
      source={{uri: props.url}}
      style={{flex: 1}}
      onMessage={event => {
        console.log('event :: ', event.nativeEvent.data);
        props.handleWebViewMessage && props.handleWebViewMessage(event);
      }}
    />
  );
}

const styles = StyleSheet.create({});
