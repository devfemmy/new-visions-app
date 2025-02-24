/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Container, SafeAreaView, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import { AppContext } from '../../context/AppState'
import HomePageService from '../../services/userServices'
import CalendarView from './CalendarView'
import { globalStyles } from '../../helpers/globalStyles'
import { widthp } from '../../utils/responsiveDesign'
import { ActivityIndicator } from 'react-native'

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
                    console.log('account is logged in another device')
                    // onLogout()
                    setCalendarData([])
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
        <>
            {/* <Loader visible={loading} /> */}
            {loading && (
                <View style={styles.popUp2}>
                    <View style={styles.activityBox}>
                        <ActivityIndicator animating color="green" />
                    </View>
                </View>
            )}
            <ScrollView
                contentContainerStyle={styles.container}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
            >
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
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: widthp(15),
    },
    activityBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    popUp2: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '110%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
})

export default Calendar
