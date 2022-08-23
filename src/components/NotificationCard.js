/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, View,} from 'react-native'
import { heightp } from '../utils/responsiveDesign'
import { Text } from './common';

const NotificationCard = ({contents}) => {
  const styles = StyleSheet.create({
    container: {
      minHeight: heightp(20),
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(112, 112, 112, 0.3)',
      paddingVertical: heightp(5),
    },
    textAlign: {
      
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.textAlign} text={contents} />
    </View>
  )
}


export default NotificationCard;