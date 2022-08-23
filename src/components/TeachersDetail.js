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

const TeachersDetailCard = ({contents, uri, gender, city, pressed}) => {
  const styles = StyleSheet.create({
    container: {
      minHeight: heightp(100),
      paddingHorizontal: heightp(20),
      borderRadius: 10,
      paddingVertical: heightp(5),
      backgroundColor: 'rgba(249, 249, 249, 1)',
      marginVertical: heightp(10),
    },
    textAlign: {
      
    }
  })
  return (
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
        <IconText text={gender && gender === 1 ? 'Male' : 'Female'} children={<Ionicons name="ios-person" size={20} color={colors.primary} />} />
        <IconText text={city && city} children={<Ionicons name="ios-home" size={20} color={colors.primary} />} />
      </View>
    </Pressable>
  )
}


export default TeachersDetailCard;