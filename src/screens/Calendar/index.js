/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Container, SafeAreaView, Text } from '../../components/common'
import { Loader } from '../../components/Loader';
import { AppContext } from '../../context/AppState';
import HomePageService from '../../services/userServices';
import CalendarView from './CalendarView';

const Calendar = () => {
  const daysOfWeek = ["SAT", "SUN", "MON", "TUES", "WED", "THUR", "FRI"];
  const [calendarData, setCalendarData] = useState([])
  const [loading, setLoading] = useState(false);
  const { onLogout} = useContext(AppContext);

  useEffect(() => {
    // get Notification
    
    async function getCalendar() {
      setLoading(true)
      try {
        const res = await HomePageService.getCalendar()
        if (res.code === 403) {
          setLoading(false)
          onLogout();
        }else {
          const data = res?.data;
          setLoading(false)
          setCalendarData(data);     
          return res;
        }
      } catch (err) {
        setLoading(false)
        console.log('err', err)
      } 
    }
    getCalendar();
  }, [])
  return (
      <Container>
        <Loader visible={loading} /> 
      <View>
        {daysOfWeek?.map((item, index) => {
          const specialIndex = `${index + 1}`;
          let  calendarArray;
          if (calendarData === [] || calendarData == null) {
            calendarArray = []
          }else {
            calendarArray = calendarData[specialIndex];
          }
          return (
            <CalendarView data={calendarArray} key={index} text={item} />
          )
        })}
      </View>
    </Container>
  )
};
const styles = StyleSheet.create({
  container: {
    
  }
})

export default Calendar;