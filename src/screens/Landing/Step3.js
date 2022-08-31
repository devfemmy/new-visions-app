import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen';
import colors from '../../helpers/colors';

export default function Step3() {
  return (
    <Screen>
      <ImageBackground source={require('../../assets/img/step3.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={styles.titleText}>معلمينا</Text>
        <Text style={styles.titleText}>يمكنك اختيار ما يناسبك من بين نخبة من المعلمين والمعلمات المميزين من حيث المستوى لاكاديمي وطرق التدريس في جميع المواد الدراسية ولمختلف المراحل التعليمية </Text>
      </View>
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
        paddingHorizontal:10
    },overlay: {
      backgroundColor:'rgba(0,0,0,0.4)',  
      borderRadius:15,
      padding:10
  },
    titleText:{
      color:colors.white,
      fontSize:22,
      fontWeight:'bold',
      fontFamily:'Cairo',
  },
});