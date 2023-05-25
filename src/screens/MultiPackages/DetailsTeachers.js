import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../helpers/colors'

import DetailsTeacherItem from './DetailsTeacherItem'

export default function DetailsTeachers({ data }) {
    const renderItem = ({ item }) => (
        <DetailsTeacherItem
            itemData={item.teacher}
            image={item.teacher.image}
            teacherName={item.teacher.first_name}
            subjectName={item.subject.title}
            calender={item.calendar}
        />
    )
    return (
        <View style={styles.BGView}>
            <FlatList
                nestedScrollEnabled
                horizontal={false}
                data={data}
                extraData={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    BGView: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 15,
        width: '95%',
        alignSelf: 'center',
    },
})
