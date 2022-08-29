/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, View,} from 'react-native'
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../helpers/globalStyles';
import { heightp } from '../utils/responsiveDesign';
import { Text } from './common';
import IconText from './IconText';
import colors from '../helpers/colors';

const TeachersDetailCard = ({contents, title,
   uri, gender, city,lessonPrice,numberOfStudents, 
   bookCourse,subjectCalendar,bookPrivateLesson,
  pressed, subjectDetails}) => {
  const styles = StyleSheet.create({
    container: {
      minHeight: heightp(100),
      paddingHorizontal: heightp(20),
      borderRadius: 10,
      paddingVertical: heightp(5),
      backgroundColor: 'rgba(249, 249, 249, 1)',
      marginTop: heightp(10),
      marginVertical: subjectDetails ? 0 : heightp(10),
    },
    textAlign: {
      fontWeight: 'bold',
      // textTransform: 'uppercase'
    },
    lowerContainer: {
      backgroundColor: 'rgba(249, 249, 249, 1)',
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      borderTopWidth: 1,
      paddingHorizontal: heightp(20),
      paddingVertical: heightp(5),
      paddingTop: heightp(10)
    },
    bookBtn: {
      backgroundColor: 'rgba(67, 72, 84, 1)',
      marginVertical: heightp(10),
      justifyContent: 'center',
      alignItems: 'center',
      height: heightp(40),
      borderRadius: 8
    },
    bookBtn2: {
      backgroundColor: colors.primary,
      marginVertical: heightp(10),
      justifyContent: 'center',
      alignItems: 'center',
      height: heightp(40),
      borderRadius: 8
    },
    textWhite: {
      color: 'white',
      fontWeight: 'bold'
    }
  })
  return (
    <>
    <Pressable onPress={pressed} style={[styles.container, globalStyles.rowBetween]}>
      <View>
      <FastImage
        style={{width: heightp(100), height: heightp(90), borderRadius: 10}}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      </View>
      <View style={{width: '60%'}}>
        <Text style={styles.textAlign} text={contents} />
        {subjectDetails ? 
          <IconText text={numberOfStudents && `${numberOfStudents} students`} children={<Ionicons name="ios-people" size={20} color={colors.primary} />} />:
          <IconText text={gender && gender === 1 ? 'Male' : 'Female'} children={<Ionicons name="ios-person" size={20} color={colors.primary} />} /> 
      }
    {subjectDetails ? 
          <IconText text={lessonPrice && `${lessonPrice} SAR`} children={<Ionicons name="ios-pricetag" size={20} color={colors.primary} />} />:
          <IconText text={city && city} children={<Ionicons name={subjectDetails ? "ios-pricetag" : "ios-home"} size={20} color={colors.primary} />} />
      }
      </View>
    </Pressable>
    {subjectDetails ? 
  <View style={[styles.lowerContainer]}>
    <View style={globalStyles.rowBetween}>
      <Text numberOfLines={1} style={styles.textAlign} text={title && title} />
      <Pressable onPress={subjectCalendar} style={globalStyles.subBtn}>
        <Text style={globalStyles.btnColor} text="Subject Calendar" />
      </Pressable>
    </View>
    <Pressable onPress={bookPrivateLesson} style={styles.bookBtn}>
        <Text style={styles.textWhite} text="Book Private Lesson" />
    </Pressable>
    <Pressable onPress={bookCourse} style={styles.bookBtn2}>
        <Text style={styles.textWhite} text="Book Full Course" />
    </Pressable>
  </View> : null
  }
    </>
  )
}


export default TeachersDetailCard;