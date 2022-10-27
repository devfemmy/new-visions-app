/* eslint-disable arrow-body-style */
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '../../components/common'
import { globalStyles } from '../../helpers/globalStyles'
import { heightp } from '../../utils/responsiveDesign'

// eslint-disable-next-line react/prop-types
const ChildsCard = ({name, uri, pressed}) => {
  return (
    <TouchableOpacity onPress={pressed} style={[styles.container, globalStyles.rowBetween]}>
        <Image
      style={{
          width: heightp(100),
          height: heightp(80),
          borderRadius: 10,
          marginRight: heightp(20),
      }}
      defaultSource={require('../../assets/img/USRE.png')}
      source={{
          uri,
      }}
      // resizeMode={FastImage.resizeMode.cover}
  />
      <View style={{width: '75%'}}>
        <Text style={styles.headerText} text={name} />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(214, 214, 214, 0.5)',
    minHeight: heightp(95),
    borderRadius: 8,
    paddingHorizontal: heightp(15),
    marginVertical: heightp(15)
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: heightp(18)
  }
});

export default ChildsCard;