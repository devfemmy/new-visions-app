/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, View,} from 'react-native'
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../helpers/globalStyles';
import { heightp } from '../utils/responsiveDesign';
import { Text } from './common';
import TimeIcon from '../assets/img/time.svg'
import IconText from './IconText';
import colors from '../helpers/colors';

const SubjectCard = ({contents, uri, duration, numberOfStudents, pressed}) => {
  const styles = StyleSheet.create({
    container: {
      minHeight: heightp(100),
      paddingHorizontal: heightp(20),
      borderRadius: 10,
      paddingVertical: heightp(5),
      backgroundColor: 'rgba(249, 249, 249, 1)',
      marginVertical: heightp(10),
      // shadowColor: 'rgba(0,0,0,0.8)',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.3,
      // shadowRadius: 12,
      // elevation: 5,
    },
    textAlign: {
      
    }
  })
  return (
    <Pressable onPress={pressed} style={[styles.container, globalStyles.rowBetween]}>
      <View>
      <FastImage
        style={{width: heightp(67), height: heightp(55), borderRadius: 10}}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      </View>
      <View style={{width: '65%'}}>
        <Text style={styles.textAlign} text={contents} />
        <IconText text={duration && `${duration} hours`} children={<TimeIcon width={20} height={20} />} />
        <IconText text={numberOfStudents && `${numberOfStudents} students`} children={<Ionicons name="ios-people" size={20} color={colors.primary} />} />
      </View>
    </Pressable>
  )
}


export default SubjectCard;