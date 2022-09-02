import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import I18n from 'i18n-js'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableWithoutFeedback } from 'react-native'
import colors from '../../helpers/colors'
import { StyleSheet } from 'react-native'
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions';
import FastImage from 'react-native-fast-image'
import { heightp } from '../../utils/responsiveDesign'
import { globalStyles } from '../../helpers/globalStyles'
export default function MultiPackagesListItem({price, number_of_students, title, detailsClicked, shareClicked, uri}) {
    const imageUrl = `${IMAGEURL}${uri}`
    console.log('uri 222', imageUrl)
  return (
    <View style={styles.outContainer}>
            <View style={globalStyles.rowBetween}>
                <FastImage
                    style={{width: heightp(150), height: heightp(150), borderRadius: 10,}}
                    source={{
                        uri: imageUrl,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                    <View style={{width:'65%',padding: heightp(10)}}>
                        <Text style={styles.subItemText}>{title}</Text>
                        <Text style={styles.subItemText}>{number_of_students}  {I18n.t("Students")}</Text>
                        <Text style={styles.subItemText}>{price}  {I18n.t("SAR")}</Text>
                        <View style={{flexDirection:'row', width: '90%', justifyContent: 'space-between'}}>
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
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    outContainer:{
        width:'95%',
        minHeight:180,
        alignSelf:'center',
        borderRadius: 15,
        marginTop:20,
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: heightp(10),
        marginVertical: heightp(20)
    },
    subItemText:{
        color:colors.dark,
        fontSize:heightp(16),
        fontWeight:'700',
        fontFamily:'Cairo',
        // lineHeight: heightp(24)
    },
    itemBtn:{
        height:30,
        // marginLeft:10,
        backgroundColor:colors.dark,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:10,
        width: heightp(80)
    },
    itemBtn2:{
        height:30,
        width:'40%',
        // marginLeft:10,
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