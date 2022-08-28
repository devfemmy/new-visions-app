/* eslint-disable react/no-children-prop */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightp } from '../../utils/responsiveDesign'
import { globalStyles } from '../../helpers/globalStyles'
import IconText from '../../components/IconText';
import { Text } from '../../components/common'
import colors from '../../helpers/colors'
import CalendarItem from './CalendarItem'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'

export default function CalendarView({text, data}) {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [statusInfo, setStatusInfo] = useState('');
  const [itemDetails, setItemDetails] = useState({});
  const checkStatus = async (item) => {
    console.log('CLICKED')
    setLoading(true);
    const payload = {
      id: item?.id.toString(),
      type: item?.type.toString()
    }
    console.log(payload, 'payload')
    try {
      const res = await HomePageService.checkLive(payload);
      setItemDetails(item);
      console.log(res, 'first response')
      setIsVisible(true)
      setLoading(false);
      if (res.code === -2) {
        setStatusInfo('stop')
      }else {
        setStatusInfo('start')
      }
      return res;
    } catch (err) {
      console.log(err, 'error');
      setLoading(false);
    } 
  }

  const styles= StyleSheet.create({
    container: {
      backgroundColor: 'rgba(247, 247, 247, 1)',
      minHeight: heightp(83),
      borderRadius: 10,
      paddingHorizontal: 10,
      justifyContent: 'center',
      marginVertical: heightp(10)
    },
    card: {
      width: heightp(55),
      height: heightp(55),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 5
    },
    text: {
      color: colors.white,
      fontWeight: 'bold'
    },
    btn: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    noData: {
      // width: heightp(230),
      justifyContent: 'center'
    },
    widthContainer: {
      width: '80%'
    },
    noClass: {
      textAlign: 'center',
      color: 'rgba(214, 214, 214, 1)',
      fontSize: heightp(22),
      marginLeft: heightp(20)
    },
    modal: {
      backgroundColor: statusInfo === 'start' ? colors.primary : 'rgba(0, 0, 0, 0.55)',
      borderRadius: 10,
      padding: 20
    },
    timeContainer: {
      marginVertical: heightp(10)
    },
    textColor: {
      color: statusInfo === 'start' ? colors.primary : 'rgba(0, 0, 0, 0.55)',
      fontWeight: 'bold'
    }
  })
  return (
    <View style={styles.container}>
      <Loader visible={loading} /> 
      <View style={globalStyles.rowBetween}>
        <View style={styles.card}>
            <Text style={styles.text} text={text} />
        </View>
        <View style={styles.widthContainer}>
        <FlatList
              horizontal
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.flatlistContent}
              ListEmptyComponent={() =>  <View style={styles.noData}>
                <Text style={styles.noClass} text="There are no classes" />
              </View>}
              data={data}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                return (
                  <CalendarItem pressed={() => checkStatus(item)} time={item.start} title={item.title} />
            )}}
            />
        </View>
      </View>
      <Modal onBackdropPress={() => setIsVisible(false)} 
      isVisible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.timeContainer}>
          <IconText modal text={itemDetails?.title} 
            children={<Ionicons name="ios-book-outline" size={24} color={colors.white} />} />
            <IconText modal text={itemDetails?.start} 
            children={<Ionicons name="ios-time-outline" size={24} color={colors.white} />} />
          </View>
          <Pressable style={styles.btn}>
            <Text style={styles.textColor} text={statusInfo === 'start' ? 'Start Now' : 'Not Available Now'} />
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}
