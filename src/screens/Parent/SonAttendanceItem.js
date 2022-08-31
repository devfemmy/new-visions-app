import { View, Text } from 'react-native'
import React from 'react'
import colors from '../../helpers/colors'
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableWithoutFeedback } from 'react-native';
import I18n from 'i18n-js';

export default function SonAttendanceItem({id, time, date, title, description, videoClick, index}) {
    
  return (
    <View style={styles.outContainer}>
      {index == 0 &&
      <View style={{height:90, alignItems:'center', justifyContent:'center'}} >
      
        <View style={{width:20, height:20, borderRadius:10, backgroundColor:colors.primary, marginTop:10}}></View>
        <View style={{width:1,height:60, borderColor:colors.dark, borderWidth:.5, }} ></View>
      </View>}
      {index != 0 &&
      <View style={{height:90, alignItems:'center', justifyContent:'center'}} >
      <View style={{width:1,height:10, borderColor:colors.dark, borderWidth:.5, }} ></View>
        <View style={{width:20, height:20, borderRadius:10, backgroundColor:colors.primary}}></View>
        <View style={{width:1,height:60, borderColor:colors.dark, borderWidth:.5, }} ></View>
      </View>}
      <View style={{justifyContent:'space-between', padding:5,width:'50%', alignItems:'flex-start'}} >
        <Text style={[styles.attendanceTxt,{color:colors.primary}]}>{date}</Text>
        <Text style={styles.attendanceTxt}>{title}</Text>
        <Text style={styles.attendanceTxt} numberOfLines={1} >{description}</Text>
      </View>
      <View style={{justifyContent:'space-between', padding:5,width:'40%', alignItems:'flex-start'}} >
        <Text></Text>
        <Text style={[styles.attendanceTxt, {alignSelf:'center'}]}>{time}</Text>
        <TouchableWithoutFeedback onPress={()=>{videoClick();}}>
            <View style={{flexDirection:'row', width:100,height:30, backgroundColor:colors.primary, alignItems:'center', justifyContent:'center', borderRadius:10}}>
            <AntDesign name="caretright" size={20} color={colors.white} />
            <Text style={[styles.attendanceTxt,{color:colors.white}]}>{I18n.t("Play")}</Text>
            </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    attendanceTxt:{
        fontSize:16,
        fontWeight:'700', 
        fontFamily:'Cairo',
        paddingTop:5
    },
     outContainer:{
        flexDirection:'row',
        height:90, width:'90%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
         backgroundColor:colors.gray, paddingHorizontal:15, alignSelf:'center',
        marginBottom:5}

});