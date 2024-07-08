import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../assests/images'

type Props = {}

const CommonLogo = (props: Props) => {
  return (
    <Image source={images.SwadhaLogo} style={{
      alignSelf: 'center',
      marginTop: 30,
      height: 80,
      width: 120,
    }} />
  )
}

export default CommonLogo
