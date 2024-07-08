import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

export default function useImagePicker() {
  const [selectedImage, setSelectedImage] = useState('');
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {});
  };

  return {
    openPicker,
  };
}
