/* eslint-disable react/no-children-prop */
import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconText from '../../components/IconText'
import { heightp } from '../../utils/responsiveDesign'
import { Text } from '../../components/common'
import colors from '../../helpers/colors'

const CalendarItem = ({ title, packageName, time, pressed }) => {
    const styles = StyleSheet.create({
        container: {
            width: heightp(120),
            height: heightp(58),
            borderWidth: 1,
            borderColor: 'rgba(67, 72, 84, 0.5)',
            borderRadius: 5,
            marginHorizontal: 10,
            paddingHorizontal: 3,
        },
        title: {
            fontWeight: 'bold',
            fontSize: heightp(14),
        },
        package: {},
    })
    return (
        <Pressable onPress={pressed} style={styles.container}>
            <Text numberOfLines={1} style={styles.title} text={title} />
            {/* <Text numberOfLines={1}  style={styles.package} text={'package'} /> */}
            <IconText
                calender
                text={time}
                children={
                    <Ionicons
                        name="ios-time-outline"
                        size={15}
                        color={colors.black}
                    />
                }
            />
        </Pressable>
    )
}

export default CalendarItem
