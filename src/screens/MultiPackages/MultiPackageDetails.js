/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import {
    View,
    Text,
    ImageBackground,
    Platform,
    Alert,
    RefreshControl,
} from 'react-native'
import React, { useCallback } from 'react'
import { IMAGEURL } from '../../utils/functions'
import FastImage from 'react-native-fast-image'
import { StyleSheet } from 'react-native'
import colors from '../../helpers/colors'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import I18n from 'i18n-js'
import { useState } from 'react'
import { AppContext } from '../../context/AppState'
import { useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import DetailsTeachers from './DetailsTeachers'
import { TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useLayoutEffect } from 'react'
import HTML from 'react-native-render-html'
import { Dimensions } from 'react-native'
import Screen from '../../components/Screen'
import { heightp } from '../../utils/responsiveDesign'
import { getInAppPurchaseProducts } from '../../services/getInAppPurchase'
import { deviceStorage } from '../../services/deviceStorage'
import { requestPurchase } from '../../services/iap'
import HomePageService from '../../services/userServices'
import { Loader } from '../../components/Loader'
import { useNavigation } from '@react-navigation/native'
import Global from '../../../Global'
import SubscriptionModal from '../../components/SubscriptionModal'

export default function MultiPackageDetails({ route }) {
    const navigation = useNavigation()

    const [description, setDescription] = useState({})
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)

    const [isVisible, setIsVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [iapId, setIapId] = useState('')
    const [iap_activation, setIapActivation] = useState(false)
    const { packageType, item } = route.params
    const [uniqueId, setUniqueId] = useState('')
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const uri = `${IMAGEURL}/${description.image}`

    async function getMultiPackageDetails(params) {
        return await axios
            .post('https://newvisions.sa/api/getMultiPackageDetails', {
                package_id: item?.id,
            })
            .then((response) => {
                console.log('response', response?.data)
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data
                        const iapIdInit = response?.data?.data?.iap_id
                        const signaling = response?.data?.data?.iap_activation
                        const uniqueIdentifier = response?.data?.data?.id
                        setIapActivation(signaling)
                        setUniqueId(uniqueIdentifier)
                        setIapId(iapIdInit)
                        setDescription(data)
                        showLoadingSpinner(false)
                    } else if (response.data.code == 403) {
                        alert('This Account is Logged in from another Device.')
                        onLogout()
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        alert(response.data.message)
                    }
                }
                return response
            })
            .catch((error) => {
                showLoadingSpinner(false)
                alert(error)
            })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
            getMultiPackageDetails()
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (Platform.OS === 'ios') {
            getInAppPurchaseProducts()
        }
    }, [])
    const openModal = (message) => {
        setIsVisible(!isVisible)
        setModalMessage(message)
    }
    const subscribeExternal = async () => {
        console.log('i don dey here oo')
        setLoading(true)
        const payload = {
            id: uniqueId.toString(),
            type: 2,
            lesson_id: '',
            day_id: '',
        }
        console.log('the payload dey here oooo', payload)
        try {
            const res = await HomePageService.subscribeExternal(payload)
            if (res.code === 200) {
                setLoading(false)
                openModal(res?.message)
            } else {
                console.log('failed', res)
                setLoading(false)
                Alert.alert(I18n.t('Subscribe'), res?.message, [
                    {
                        text: 'Cancel',
                        onPress: () => navigation.popToTop(),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.popToTop(),
                    },
                ])
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }
    const subscribeMultiPackage = (value) => {
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
        if (value === 'parent') {
            console.log('her')
            navigation.navigate('ParentSub', {
                uniqueId,
                type: 2,
                lesson_id: '',
                day_id: '',
            })
        } else {
            console.log('student')
            if (!iap_activation || Platform.OS === 'android') {
                subscribeExternal()
            } else {
                const subscriptionInfo = {
                    billNumber: 'ios_bill',
                    paymentFor: 'Multipackage',
                    lessonId: '1258',
                    subjectId: 12345,
                    price: 200,
                }
                deviceStorage
                    .saveDataToDevice({
                        key: 'subscriptionInfo',
                        value: subscriptionInfo,
                    })
                    .then(() => requestPurchase({ sku: iapId }))
            }
        }
    }
    const subscribeSinglePackage = (value) => {
        if (value === 'parent') {
            navigation.navigate('ParentSub', {
                uniqueId,
                type: 2,
                lesson_id: '',
                day_id: '',
            })
        } else {
            console.log('student')
            if (!iap_activation || Platform.OS === 'android') {
                subscribeExternal()
            } else {
                const subscriptionInfo = {
                    billNumber: 'ios_bill',
                    paymentFor: 'Singlepackage',
                    lessonId: '1258',
                    subjectId: 12345,
                    price: 200,
                }
                deviceStorage
                    .saveDataToDevice({
                        key: 'subscriptionInfo',
                        value: subscriptionInfo,
                    })
                    .then(() => requestPurchase({ sku: iapId }))
            }
        }
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
    }

    useLayoutEffect(() => {
        showLoadingSpinner(true)
    }, [])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getMultiPackageDetails()
        console.log('ffffffffffffffffffffffffffffff response', res?.data)
        if (res?.data?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    return (
        <>
            <Screen style={{ marginBottom: 20, paddingHorizontal: 20 }}>
                <Loader visible={loading} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <FastImage
                        style={{
                            width: '95%',
                            height: 200,
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 10,
                        }}
                        source={{
                            uri,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View
                        style={[
                            // styles.bigCountContainer,
                            {
                                backgroundColor: 'rgba(155, 186, 82, 1)',
                                paddingVertical: heightp(10),
                                marginVertical: heightp(10),
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '95%',
                                borderRadius: 10,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.subItemText,
                                { alignSelf: 'center', color: '#fff' },
                            ]}
                        >
                            {description.title}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            marginVertical: 5,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={[
                                styles.subItemText,
                                { color: colors.primary, marginHorizontal: 10 },
                            ]}
                        >
                            {I18n.t('MultiPackageNdw')}
                        </Text>
                    </View>
                    <View style={styles.countContainer}>
                        <View style={styles.countHalfContainer}>
                            <IonIcons
                                name="people-circle"
                                color={colors.primary}
                                size={48}
                            />
                            <View>
                                <Text style={styles.subItemText2}>
                                    {I18n.t('Students')}
                                </Text>
                                <Text style={styles.subItemText2}>
                                    {description.number_of_students}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.countHalfContainer}>
                            <View
                                style={{
                                    width: 45,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: colors.primary,
                                    borderRadius: 25,
                                }}
                            >
                                <MaterialIcons
                                    name="local-offer"
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                            <View>
                                <Text style={styles.subItemText2}>
                                    {I18n.t('SAR')}
                                </Text>
                                <Text style={styles.subItemText2}>
                                    {description.price}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            alignItems: 'center',
                        }}
                    >
                        <AntDesign
                            name="infocirlce"
                            color={colors.primary}
                            size={16}
                        />
                        <Text
                            style={[
                                styles.subItemText,
                                { color: colors.primary, marginHorizontal: 10 },
                            ]}
                        >
                            {I18n.t('MultiPackageBrief')}
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            height: 150,
                            borderRadius: 10,
                            width: '95%',
                            alignSelf: 'center',
                            paddingHorizontal: heightp(10),
                        }}
                    >
                        <ScrollView nestedScrollEnabled={true}>
                            {description && (
                                <HTML
                                    tagsStyles={{
                                        div: { textAlign: 'left' },
                                    }}
                                    source={{ html: description.description }}
                                    imagesMaxWidth={
                                        Dimensions.get('window').width
                                    }
                                />
                            )}
                        </ScrollView>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            alignItems: 'center',
                        }}
                    >
                        <IonIcons
                            name="people"
                            color={colors.primary}
                            size={20}
                        />
                        <Text
                            style={[
                                styles.subItemText,
                                { color: colors.primary, marginHorizontal: 10 },
                            ]}
                        >
                            {I18n.t('GroupTeachers')}
                        </Text>
                    </View>
                    {description && (
                        <DetailsTeachers data={description.content} />
                    )}

                    {Global.UserType == 4 ? (
                        <View>
                            {iap_activation ? (
                                <View />
                            ) : (
                                <View
                                    style={{
                                        backgroundColor: colors.primary,
                                        width: '90%',
                                        height: 45,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        borderRadius: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={
                                            packageType === 'multi'
                                                ? () =>
                                                      subscribeMultiPackage(
                                                          'parent'
                                                      )
                                                : () =>
                                                      subscribeSinglePackage(
                                                          'parent'
                                                      )
                                        }
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={[
                                                    styles.subItemText,
                                                    {
                                                        marginHorizontal: 20,
                                                        color: colors.white,
                                                    },
                                                ]}
                                            >
                                                {I18n.t('SubscribeNow')}{' '}
                                                {description.price}{' '}
                                                {I18n.t('SAR')}
                                            </Text>
                                            <FontAwesome
                                                name={
                                                    I18n.locale == 'ar'
                                                        ? 'arrow-circle-left'
                                                        : 'arrow-circle-right'
                                                }
                                                size={30}
                                                color={colors.white}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ) : (
                        <View
                            style={{
                                backgroundColor: colors.primary,
                                width: '90%',
                                height: 45,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderRadius: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={
                                    packageType === 'multi'
                                        ? () => subscribeMultiPackage('student')
                                        : () =>
                                              subscribeSinglePackage('student')
                                }
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Text
                                        style={[
                                            styles.subItemText,
                                            {
                                                marginHorizontal: 20,
                                                color: colors.white,
                                            },
                                        ]}
                                    >
                                        {I18n.t('SubscribeNowNew')}
                                    </Text>
                                    <FontAwesome
                                        name={
                                            I18n.locale == 'ar'
                                                ? 'arrow-circle-left'
                                                : 'arrow-circle-right'
                                        }
                                        size={30}
                                        color={colors.white}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </Screen>
            <SubscriptionModal
                onPress={() => {
                    setIsVisible(!isVisible)
                }}
                isVisible={isVisible}
                text={modalMessage}
                navigation={() => {
                    setIsVisible(!isVisible)
                    navigation.popToTop()
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    subItemText: {
        color: colors.dark,
        fontSize: heightp(16),
        fontWeight: '700',
        textAlign: 'left',
        fontFamily: 'Cairo',
        alignSelf: 'center',
    },
    countContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        width: '95%',
        borderRadius: 10,
        marginVertical: heightp(10),
    },
    countHalfContainer: {
        width: '50%',
        // height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    subItemText2: {
        marginLeft: heightp(5),
        fontWeight: 'bold',
        fontSize: heightp(15),
        lineHeight: heightp(20),
    },
})
