import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'

export default function Step2() {
  return (
    <Screen>
      <ImageBackground source={require('../../assets/img/Step2.png')} style={styles.backgroundImage}></ImageBackground>
    </Screen>
  )
}
const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        resizeMode:'stretch'
    },
});