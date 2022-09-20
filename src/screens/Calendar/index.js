/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Container, SafeAreaView, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import { AppContext } from '../../context/AppState'
import HomePageService from '../../services/userServices'
import CalendarView from './CalendarView'

const Calendar = () => {
    const { onLogout, lang } = useContext(AppContext)
    let daysOfWeek
    if (lang === 'ar') {
        daysOfWeek = [
            'السبت',
            'الاحد',
            'الاثنين',
            'الثلاثاء',
            'الاربعاء',
            'الخميس',
            'الجمعة',
        ]
    } else {
        daysOfWeek = ['SAT', 'SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI']
    }
    const [calendarData, setCalendarData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // get Notification

        async function getCalendar() {
            setLoading(true)
            try {
                const res = await HomePageService.getCalendar()
                if (res.code === 403) {
                    setLoading(false)
                    alert('This Account is Logged in from another Device.')
                    onLogout()
                } else {
                    const data = res?.data
                    setLoading(false)
                    setCalendarData(data)
                    return res
                }
            } catch (err) {
                setLoading(false)
                console.log('err', err)
            }
        }
        getCalendar()
    }, [])
    return (
        <Container>
            <Loader visible={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {daysOfWeek?.map((item, index) => {
                    const specialIndex = `${index + 1}`
                    let calendarArray
                    if (calendarData === [] || calendarData === null) {
                        calendarArray = []
                    } else {
                        calendarArray = calendarData[specialIndex]
                    }
                    return (
                        <CalendarView
                            data={calendarData[specialIndex]}
                            key={index}
                            text={item}
                        />
                    )
                })}
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {},
})

export default Calendar
