import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import I18n from 'i18n-js'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableWithoutFeedback } from 'react-native'
import colors from '../../helpers/colors'
import { StyleSheet } from 'react-native'
export default function PackagesListItem({price, number_of_students, title, detailsClicked, shareClicked}) {
  return (
    <View style={styles.outContainer}>
            <TouchableWithoutFeedback>
                <ImageBackground source={require('../../assets/img/multiPackBG.png')} style={{flex:1}} >
                    <View style={{width:'50%', height:'100%', alignItems:'center', justifyContent:'space-between', paddingVertical:'5%'}}>
                        <Text style={styles.subItemText}>{title}</Text>
                        <Text style={styles.subItemText}>{number_of_students}  {I18n.t("Students")}</Text>
                        <Text style={styles.subItemText}>{price}  {I18n.t("SAR")}</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableWithoutFeedback onPress={()=>{shareClicked();}}>
                                <View style={styles.itemBtn}>
                                <Text style={styles.itemBtnTxt}>{I18n.t('Share')}</Text>
                                <Entypo name='share' color={colors.white} size={16} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{detailsClicked();}}>
                                <View style={styles.itemBtn}>
                            <Text style={styles.itemBtnTxt}>{I18n.t('Details')}</Text>
                            <AntDesign name='arrowleft' color={colors.white} size={16} />
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
  )
}

const styles = StyleSheet.create({
    outContainer:{
        width:'95%',
        height:180,
        alignSelf:'center',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        overflow:'hidden',
        marginTop:20,
        borderWidth:5,
        borderColor:colors.gray
    },
    subItemText:{
        color:colors.dark,
        fontSize:20,
        fontWeight:'700',
        fontFamily:'Cairo'
    },
    itemBtn:{
        height:30,
        width:'40%',
        marginLeft:10,
        backgroundColor:colors.dark,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:10
    },
    itemBtnTxt:{
        color:colors.white,
        fontWeight:'700',
        fontFamily:'Cairo'
    }
})