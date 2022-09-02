import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import I18n from 'i18n-js';
import FastImage from 'react-native-fast-image';
import colors from '../../helpers/colors';
import { IMAGEURL } from '../../utils/functions';
import { heightp } from '../../utils/responsiveDesign';

export default function DetailsTeacherItem({image, teacherName, subjectName, calender}) {

    const dateArr = ["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعه"];
    const dateArrEn = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
    const renderItem = ({item})=>(
        <View style={{backgroundColor:colors.darkGray, flexDirection:'row', width:100, height:30, alignItems:'center',justifyContent:'center', borderRadius:5, marginHorizontal:5}}>
            <FontAwesome5 name='calendar-day' size={20} color={colors.dark} />
            <Text style={[styles.subItemText, {fontWeight:'100'}]}>{(I18n.locale == 'ar'? dateArr[item.day_id - 1] : dateArrEn[item.day_id - 1])}</Text>
        </View>
    );

    const uri = (image ? `${IMAGEURL}/${image}` : '../../assets/img/teacherDefaultpng.png');
  return (
    <View style={styles.container}>
      <FastImage
      style={{width: heightp(100), height: heightp(100), borderRadius: 10, marginRight: heightp(20)}}
      source={{
        uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={{justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
            <FontAwesome5 name='chalkboard-teacher' size={20} color={colors.black} />
            <Text style={styles.subItemText}>{teacherName}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <MaterialIcons name='subject' size={20} color={colors.black} />
            <Text style={styles.subItemText}>{subjectName}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
            <FlatList
            horizontal
            data={calender}
        extraData={calender}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={true}
            />
        </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    subItemText:{
      color:colors.dark,
      fontSize:16,
      fontWeight:'700',
      paddingHorizontal:10,
      fontFamily:'Cairo', alignSelf:'center'
  },
  container:{
    flexDirection:'row',
    height:120,
    paddingVertical:15,
    borderBottomWidth:1,
    borderBottomColor:colors.darkGray,
    marginHorizontal:20,
  }
})