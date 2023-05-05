/* eslint-disable camelcase */
/* eslint-disable react/no-children-prop */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import I18n from 'i18n-js'
import { heightp } from '../../utils/responsiveDesign'
import { globalStyles } from '../../helpers/globalStyles'
import IconText from '../../components/IconText'
import { Text } from '../../components/common'
import colors from '../../helpers/colors'
import CalendarItem from './CalendarItem'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CalendarView({ text, data }) {
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [statusInfo, setStatusInfo] = useState('')
    const [itemDetails, setItemDetails] = useState({})
    const navigation = useNavigation()

    const checkStatus = async (item) => {
        setLoading(true)
        const payload = {
            id: item?.id.toString(),
            type: item?.type.toString(),
        }
        try {
            const res = await HomePageService.checkLive(payload)
            setItemDetails(item)
            setLoading(false)
            if (res.code === -2) {
                setIsVisible(true)
                setStatusInfo('stop')
            } else {
                setIsVisible(true)
                setStatusInfo('start')
            }
            return res
        } catch (err) {
            console.log(err, 'error')
            setLoading(false)
        }
    }
    const joinLive = async () => {
        console.log('join live')
        setIsVisible(false)
        setLoading(true)
        const payload = {
            id: itemDetails?.id.toString(),
            type: itemDetails?.type.toString(),
        }
        try {
            const res = await HomePageService.joinLive(payload)
            if (res.code === 200) {
                console.log('join ed live already', res)
                const live_url = res?.data?.live_url
                const lesson_id = res?.data?.lesson
                // await AsyncStorage.setItem('lessonId', lesson_id)
                navigation.navigate('WebView', {
                    live_url,
                    lesson_id,
                    liveNow: 'liveNow',
                    item: itemDetails,
                })
            } else {
                console.log('could not joined live already', res)
                setLoading(false)
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    const closeModal = () => {
        setIsVisible(!isVisible)
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(247, 247, 247, 1)',
            minHeight: heightp(83),
            borderRadius: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
            marginVertical: heightp(10),
        },
        card: {
            width: heightp(55),
            height: heightp(55),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            borderRadius: 5,
        },
        text: {
            color: colors.white,
            fontWeight: 'bold',
        },
        btn: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        noData: {
            // width: heightp(230),
            justifyContent: 'center',
        },
        widthContainer: {
            width: '80%',
        },
        noClass: {
            textAlign: 'center',
            color: 'rgba(214, 214, 214, 1)',
            fontSize: heightp(22),
            marginLeft: heightp(20),
        },
        modal: {
            backgroundColor:
                statusInfo === 'start' ? colors.primary : 'rgba(0, 0, 0, 0.55)',
            borderRadius: 10,
            padding: 20,
        },
        timeContainer: {
            marginVertical: heightp(10),
        },
        textColor: {
            color:
                statusInfo === 'start' ? colors.primary : 'rgba(0, 0, 0, 0.55)',
            fontWeight: 'bold',
        },
        flatlistContent: {
            // flexGrow: 1,
            // width: '80%',
        },
    })
    return (
        <View style={styles.container}>
            {/* <Loader visible={loading} /> */}
            <View style={globalStyles.rowBetween}>
                <View style={styles.card}>
                    <Text style={styles.text} text={text} />
                </View>
                {/* <View style={styles.widthContainer}> */}
                <FlatList
                    horizontal
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => (
                        <View style={styles.noData}>
                            <Text
                                style={styles.noClass}
                                text={I18n.t('NoClasses')}
                            />
                        </View>
                    )}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        return (
                            <CalendarItem
                                pressed={() => {
                                    checkStatus(item)
                                    // setItemDetails(item)
                                    console.log(
                                        'xxxxxxxxxxxxxxxxxxxxxxxxxxxx pressed double In'
                                    )
                                }}
                                time={item.start}
                                title={item.title}
                            />
                        )
                    }}
                />
                {/* </View> */}
            </View>
            <Modal
                onBackdropPress={() => setIsVisible(false)}
                isVisible={isVisible}
            >
                <View style={styles.modal}>
                    <View style={styles.timeContainer}>
                        <IconText
                            modal
                            text={itemDetails?.title}
                            children={
                                <Ionicons
                                    name="ios-book-outline"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                        <IconText
                            modal
                            text={itemDetails?.start}
                            children={
                                <Ionicons
                                    name="ios-time-outline"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                    </View>
                    <Pressable
                        onPress={statusInfo === 'start' ? joinLive : closeModal}
                        style={styles.btn}
                    >
                        <Text
                            style={styles.textColor}
                            text={
                                statusInfo === 'start'
                                    ? I18n.t('Start')
                                    : 'Not Available Now'
                            }
                        />
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}
