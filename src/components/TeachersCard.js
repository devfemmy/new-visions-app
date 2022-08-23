/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'

const TeachersCard = ({text, uri, lastName}) => (
    <View>
      <View style={styles.container}>
      <FastImage
        style={{width: heightp(121), height: heightp(100), borderRadius: 10}}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.textColor} text={text} />
        <Text style={styles.textColor} text={lastName} />
      </View>
    </View>
  )

const styles = StyleSheet.create({
  container: {
    minHeight: heightp(90),
    backgroundColor: 'rgba(67, 72, 84, 0.2)',
    borderRadius: 8,
    width: widthp(121),
    marginRight: heightp(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: heightp(10)
  },
  textColor: {
    color: 'white',
    fontWeight: 'bold'
  },
  lowerContainer: {
    backgroundColor: 'rgba(67, 72, 84, 1)',
    height: heightp(61),
    marginRight: heightp(20),
    width: widthp(121),
    alignItems: 'center',
    paddingHorizontal: heightp(10),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  }
});

export default TeachersCard;