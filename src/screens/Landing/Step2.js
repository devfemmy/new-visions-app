import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import colors from '../../helpers/colors';

export default function Step2() {
  return (
    <Screen>
      <ImageBackground source={require('../../assets/img/Step2.png')} style={styles.backgroundImage}>
        <Text style={styles.titleText}>ماذا تقدم نيوفيجن للطالب ؟</Text>
        <Text style={styles.titleText}>تقدم حصص متابعة و مناهج  كاملة ودورات تقوية , عن بعد , في بيئة افتراضية ملائمة,  مع معلمين مميزين , في أوقات مرنة وبأسعار تنافسية في متناول الجميع </Text>
      </ImageBackground>
    </Screen>
  )
}
const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        resizeMode:'stretch',
        justifyContent:'flex-end',
        paddingBottom:50,
        paddingHorizontal:20
    },
    titleText:{
      color:colors.white,
      fontSize:20,
      fontWeight:'700',
      fontFamily:'Cairo'
  },
});