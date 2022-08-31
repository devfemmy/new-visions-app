import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import colors from '../../helpers/colors';
import DetailsTeacherItem from './DetailsTeacherItem';

export default function DetailsTeachers({data}) {
    const renderItem = ({item})=>(
        <DetailsTeacherItem image={item.teacher.image}
        teacherName={item.teacher.first_name}
        subjectName={item.subject.title}
        calender={item.calendar} />
    )
  return (
    <View style={styles.BGView}>
      <FlatList
        data={data}
        extraData={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={true}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    BGView:{
        backgroundColor:colors.gray,
        borderRadius:15,
        width:'95%',
        alignSelf:'center'
    }
});