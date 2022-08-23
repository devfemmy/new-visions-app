import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen';
import I18n from 'i18n-js';
import colors from '../../helpers/colors';

export default function Step1() {
    
  return (
    <Screen style={{backgroundColor:colors.white}}>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/img/logo-light.png')}></Image>
    </View>
    <View style={styles.textCont}>
        <Text style={styles.welcomeText}>{I18n.t('Welcome')}</Text>
    </View>
    </Screen>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:.8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white
    },
    textCont:{
        justifyContent:'center',
        alignItems:'center',
    },
    welcomeText:{
        fontFamily:'Cairo-Bold',
        fontSize:20,

    },
    logo:{
        height:55,
        width:'40%',
        resizeMode:'stretch'
    },
});