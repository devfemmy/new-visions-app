import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import SonListItem from './SonListItem'
import Screen from '../../components/Screen'
import colors from '../../helpers/colors'
import I18n from 'i18n-js'
import { useEffect } from 'react'
import { useState } from 'react'
import { AppContext } from '../../context/AppState'
import { useContext } from 'react'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableWithoutFeedback } from 'react-native'
import SonAttendanceItem from './SonAttendanceItem'

export default function Attendance({route}) {

    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
    useContext(AppContext);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsAr = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيه", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const [monthName, setMonthName] = useState("");
    const [monthNo, setMonthNo] = useState(new Date().getMonth() + 1);
    const [attendance, setAttendance] = useState([]);

    function getAttendance(id, month) {
        showLoadingSpinner(true);
        axios
      .post('https://mo.visionsplus.net/api/getChildAttendance', {
        "child_id": "6",
        "month": monthNo
      })
      .then(response => {
        if (
          response != undefined &&
          response.data != undefined &&
          response.data.code != undefined
        ) {
          if (response.data.code == 200) {
            const data = response.data.data;
            console.log("attendance: "+data);
            setAttendance(data);
            showLoadingSpinner(false);
            console.log(attendance);
          }else if(response.data.code == 403){
            onLogout();
            showLoadingSpinner(false);
          } else {
            showLoadingSpinner(false);
            alert(response.data.message);
          }
        }
      })
      .catch(error => {
        showLoadingSpinner(false);
        alert(error);
      });
    }

    function attendanceVideoClicked(id) {
        console.log("Clicked");
    }

    const renderItem = ({item, index})=>(
        <SonAttendanceItem title={item.title}
        index={index}
        description={item.description}
        id={item.id}
        date={item.date} 
        time={item.time}
        videoClick={() =>{attendanceVideoClicked(item.id)}}
        />
    );

    function prevMonth() {
        setMonthNo(monthNo - 1);
        setMonthNameFun(monthNo);
        console.log(monthNo);
    }

    function nextMonth() {
        setMonthNo(monthNo + 1);
        setMonthNameFun(monthNo);
        console.log(monthNo);
    }

    function setMonthNameFun(no){
        
        let monthName = "";
        if (I18n.locale === 'ar') {
            monthName = monthsAr[no - 1];
        }else{
            monthName = months[no - 1];
        }   
        setMonthName(monthName + " " + new Date().getFullYear());
    }

    const EmptyItem = ({item, index})=>(
        <View style={{backgroundColor:colors.dark, height:40, width:'85%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.subItemText}>{I18n.t("noSubField")}</Text>
              </View>
      );

    useEffect(()=>{
        setMonthNameFun(monthNo);
        //setMonthNo(monthNo);
        getAttendance(route.params.id, monthNo);
    },[monthNo])

  return (
    <Screen>
        <View style={{backgroundColor:colors.white, flex:1}}>
            <SonListItem name={route.params.name}
            />

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width:'90%',
                    alignSelf:'center',
                    marginBottom:20
                }}
            />

            <View style={{flexDirection:'row', height: 40, width:'90%', backgroundColor:colors.primary, borderRadius:45, alignSelf:'center', justifyContent:'center',alignItems:'center' }}>
                <TouchableWithoutFeedback onPress={()=>{prevMonth();}}>
            <AntDesign name="caretright" size={20} color={colors.white} />
            </TouchableWithoutFeedback>
            <Text style={styles.subItemText}>{monthName}</Text>
            <TouchableWithoutFeedback onPress={()=>{nextMonth();}}>
            <AntDesign name="caretleft" size={20} color={colors.white} />
            </TouchableWithoutFeedback>
            </View>
                
            <FlatList
        data={attendance}
        extraData={attendance}
        renderItem={renderItem}
        ListEmptyComponent={EmptyItem}
        keyExtractor={item => item.id}
        />
            
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    subItem:{
        backgroundColor:colors.primary,
        height:60,
        width:'80%',
marginTop:20,
alignSelf:'center',
justifyContent:'space-between',
alignItems:'center',
borderRadius:15,
flexDirection:'row',
paddingHorizontal:20
    },
    subItemText:{
        color:colors.white,
        fontSize:20,
        fontWeight:'700',
        fontFamily:'Cairo'
    }
});