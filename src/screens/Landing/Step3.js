import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen';

export default function Step3() {
  return (
    <Screen>
      <ImageBackground source={require('../../assets/img/step3.png')} style={styles.backgroundImage}></ImageBackground>
    </Screen>
  )
}
const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        resizeMode:'stretch'
    },
});