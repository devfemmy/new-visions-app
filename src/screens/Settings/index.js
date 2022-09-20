import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    StyleSheet,
    View,
    Text as RNText,
    Linking,
} from 'react-native'
import { AppContext } from '../../context/AppState'
import HomePageService from '../../services/userServices'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ArrowIcon from '../../assets/img/arrow.svg'
import ArabIcon from '../../assets/img/arab.svg'

const Settings = () => {
    const navigation = useNavigation()
    const { lang } = useContext(AppContext)

    const [notificationData, setNotificatioData] = useState([])
    const [loading, setLoading] = useState(false)
    const { onLogout } = useContext(AppContext)

    useEffect(() => {
        // get Notification
        async function getNotification() {
            setLoading(true)
            try {
                const res = await HomePageService.getAboutUs()
                if (res.code === 403) {
                    setLoading(false)
                    alert('This Account is Logged in from another Device.')
                    onLogout()
                } else {
                    const data = res?.data
                    console.log('data', data)
                    setLoading(false)
                    setNotificatioData(data)
                    return res
                }
            } catch (err) {
                console.log(err, 'error')
                setLoading(false)
            }
        }
        getNotification()
    }, [])
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.modalDetails}
                onPress={() => {
                    navigation.navigate('WebView', {live_url: 'https://newvisions.sa/about_us'})
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: WINDOW_WIDTH * 0.8,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <Ionicons
                        name={'help-circle'}
                        size={20}
                        color={colors.primary}
                    />
                    <RNText style={styles.detailCategory}>
                        {I18n.t('AboutUs')}{' '}
                    </RNText>
                    {lang === 'ar' ? (
                        <ArabIcon width={15} height={15} />
                    ) : (
                        <ArrowIcon width={15} height={15} />
                    )}
                </View>
            </Pressable>
            <Pressable
                style={styles.modalDetails}
                onPress={() => {
                    navigation.navigate('WebView', {live_url: 'https://newvisions.sa/terms_and_conditions'})
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: WINDOW_WIDTH * 0.8,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <Ionicons
                        name={'reader'}
                        size={20}
                        color={colors.primary}
                    />
                    <RNText style={styles.detailCategory}>
                        {I18n.t('TermsOfService')}{' '}
                    </RNText>
                    {lang === 'ar' ? (
                        <ArabIcon width={15} height={15} />
                    ) : (
                        <ArrowIcon width={15} height={15} />
                    )}
                </View>
            </Pressable>
            <Pressable
                style={styles.modalDetails}
                onPress={() => {
                    navigation.navigate('WebView', {live_url: 'https://newvisions.sa/contact_us'})
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: WINDOW_WIDTH * 0.8,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <Ionicons name={'call'} size={20} color={colors.primary} />
                    <RNText style={styles.detailCategory}>
                        {I18n.t('ContactUs')}{' '}
                    </RNText>
                    {lang === 'ar' ? (
                        <ArabIcon width={15} height={15} />
                    ) : (
                        <ArrowIcon width={15} height={15} />
                    )}
                </View>
            </Pressable>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
    },
    modalDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        // justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: colors.white,
        shadowColor: 'rgba(34, 45, 51, 1)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
        height: WINDOW_HEIGHT * 0.065,
        paddingHorizontal: 22,
        borderRadius: 10,
        marginVertical: 15,
    },
    detailCategory: {
        // fontFamily: 'Raleway-Medium',
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(34, 45, 51, 1)',
        width: '80%',
        // justifyContent: 'flex-end',
        // backgroundColor: '#000',
    },
})
