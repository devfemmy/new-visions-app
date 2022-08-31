import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../helpers/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import I18n from 'i18n-js';

function ReturnStatus({status}){
if (status == '2') {
    return (<AntDesign name='checkcircle' color={colors.primary}  size={15} />);
}else if(status == '3'){
    return (<AntDesign name='closecircle' color={'#FF0000'}  size={15} />);
}
 return (<></>)   ;

}

export default function ParentListItem({name, status, approveClick, disapproveClick}) {
  return (
    <View style={styles.rowItem}>
      <View>
        <Image source={require('../../assets/img/USRE.png')} style={styles.img}/>
      </View>
      <View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <View>
                <Text style={styles.title}>{name}</Text>
            </View>
            <View>
                {status && <ReturnStatus status={status} />}
            </View>
        </View>
        {status == '1' &&
        <View style={{flexDirection:'row', marginHorizontal:20, marginTop:5}}>
            <View>
                <TouchableOpacity style={styles.btnStyle} onPress={approveClick} >
                    <Text style={styles.btnTxt}>{I18n.t("Accept") }</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={[styles.btnStyle, {backgroundColor:colors.dark, marginHorizontal:10}]} onPress={disapproveClick} >
                    <Text style={styles.btnTxt}>{I18n.t("Reject")}</Text>
                </TouchableOpacity>
            </View>
        </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    img:{
        width:70,
        height:70,
        borderRadius:15,
    },
    rowItem:{flexDirection:'row',
     backgroundColor:colors.gray,
      width:'90%',
       alignSelf:'center',
        
         borderRadius:15,
         alignItems:'center',
padding:10,
marginVertical:10
},
title:{
    fontSize:18,
    color:colors.black,
    fontWeight:'700',
    fontFamily:'Cairo',
    marginHorizontal:20,
},btnStyle:{
    backgroundColor:colors.primary,
    width:95,
    padding:3,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
},
btnTxt:{
    color:colors.white,
    fontWeight:'700',
    fontFamily:'Cairo',
}
});