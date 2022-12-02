import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Alert,
    Platform,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text as RNText,
    TouchableOpacity,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { globalStyles } from '../../helpers/globalStyles'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { Text } from '../../components/common'
import CheckBox from '@react-native-community/checkbox'
import Global from '../../../Global'
import SubscriptionModal from '../../components/SubscriptionModal'
import { deviceStorage } from '../../services/deviceStorage'
import { requestPurchase } from '../../services/iap'
const defaultUri = require('../../assets/img/default-profile-picture.jpeg')

const FazaSubscription = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { lang, loadingSpinner, showLoadingSpinner, onLogout } =
        useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState(null)
    const [groupData, setGroupData] = useState(null)
    const [options, setOptions] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const { item } = route.params

    let daysOfWeek
    if (lang === 'ar') {
        daysOfWeek = [
            { value: 1, label: 'سبت' },
            { value: 2, label: 'الاحد' },
            { value: 3, label: 'الاثنين' },
            { value: 4, label: 'الثلاثاء' },
            { value: 5, label: 'الاربع' },
            { value: 6, label: 'الخميس' },
            { value: 7, label: 'الجمعة' },
        ]
    } else {
        daysOfWeek = [
            { value: 1, label: 'Saturday' },
            { value: 2, label: 'Sunday' },
            { value: 3, label: 'Monday' },
            { value: 4, label: 'Tuesday' },
            { value: 5, label: 'Wednesday' },
            { value: 6, label: 'Thursday' },
            { value: 7, label: 'Friday' },
        ]
    }

    function isDate(dayId) {
        const result = daysOfWeek.find((label) => label?.value === dayId)
        return result?.label
    }

    const getSubjectReviewCourseDetails = async () => {
        setLoading(true)
        const payload = {
            course_id: item?.id,
        }
        try {
            const res = await HomePageService.getReviewCourseDetails(payload)
            const data = res?.data
            if (res.code === 200) {
                setLoading(false)
                setData(data?.info[0])
                setOptions(data?.teachers)
            } else {
                alert('This Account is Logged in from another Device.')
                onLogout()
                // return
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSubjectReviewCourseDetails()
        })
        return unsubscribe
    }, [item])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getSubjectReviewCourseDetails()
        if (res?.code === 200) {
            setRefreshing(false)
            setData(res?.data?.info[0])
            setOptions(res?.data?.teachers)
        }
    }, [])

    const openModal = (message) => {
        setIsVisible(!isVisible)
        setModalMessage(message)
    }

    const subscribeExternal = async () => {
        setLoading(true)
        const payload = {
            id: groupData?.subject?.id,
            type: 4,
            lesson_id: '',
            day_id: '',
        }
        try {
            const res = await HomePageService.subscribeExternal(payload)
            if (res.code === 200) {
                setLoading(false)
                openModal(res?.message)
            } else {
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

    const subscribeToGroup = () => {
        subscribeExternal()
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
        // if (Global.UserType == 4 && !iap_activation) {
        //     navigation.navigate('ParentSub', {
        //         uniqueId: groupData?.subject?.id,
        //         type: 4,
        //         lesson_id: '',
        //         day_id: '',
        //     })
        // } else if (Global.UserType == 3) {
        //     console.log('hello')
        //     if (!iap_activation || Platform.OS === 'android') {
        //         subscribeExternal()
        //     } else {
        //         const subscriptionInfo = {
        //             billNumber: 'ios_bill',
        //             paymentFor: 'FullLesson',
        //             lessonId: '1258',
        //             subjectId: subject_id,
        //             price: 200,
        //         }
        //         deviceStorage
        //             .saveDataToDevice({
        //                 key: 'subscriptionInfo',
        //                 value: subscriptionInfo,
        //             })
        //             .then(() => requestPurchase({ sku: iap_id }))
        //     }
        // } else {
        //     return
        // }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    // globalStyles.wrapper,
                ]}
                style={{ flex: 1, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.containerFlex}>
                    <FastImage
                        style={{
                            width: '95%',
                            height: heightp(180),
                            borderRadius: 10,
                        }}
                        source={{
                            uri: `${IMAGEURL}/${item?.image}`,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={styles.bigCountContainer}>
                    <View style={styles.countContainer}>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <IonIcons
                                name="people-circle"
                                color={colors.primary}
                                size={30}
                            />
                            <RNText style={styles.subItemText2}>
                                {I18n.t('Students')}
                            </RNText>
                        </View>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <RNText style={styles.subItemText2}>
                                {`${data?.subject?.title}`}
                            </RNText>
                        </View>
                    </View>
                    <View style={styles.countContainer}>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <IonIcons
                                name="people-circle"
                                color={colors.primary}
                                size={30}
                            />
                            <RNText style={styles.subItemText2}>
                                {I18n.t('SubjectName')}
                            </RNText>
                        </View>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <RNText style={styles.subItemText2}>
                                {`${data?.number_of_students} ${I18n.t(
                                    'Students'
                                )}`}
                            </RNText>
                        </View>
                    </View>
                    <View style={styles.countContainer}>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <IonIcons
                                name="people-circle"
                                color={colors.primary}
                                size={30}
                            />
                            <RNText style={styles.subItemText2}>
                                {I18n.t('Price')}
                            </RNText>
                        </View>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <RNText style={styles.subItemText2}>
                                {`${data?.price} ${I18n.t('SAR')}`}
                            </RNText>
                        </View>
                    </View>
                </View>
                <Text
                    numberOfLines={1}
                    style={[
                        styles.textAlign,
                        {
                            paddingVertical: heightp(5),
                            paddingHorizontal: heightp(10),
                        },
                    ]}
                    text={`${I18n.t('GroupDates')}`}
                />
                {options?.map((item, index) => (
                    <Pressable
                        style={[
                            styles.bigCountContainer,
                            {
                                borderLeftWidth: 10,
                                backgroundColor:
                                    item?.id === groupData?.id
                                        ? '#E0F1B8'
                                        : 'rgba(0, 0, 0, 0.05)',
                                borderLeftColor:
                                    item?.id === groupData?.id
                                        ? colors.primary
                                        : '#C5C5C5',
                            },
                        ]}
                        onPress={() => {
                            setGroupData(item)
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <View
                                style={[
                                    styles.countHalfContainer,
                                    {
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        paddingHorizontal: heightp(10),
                                        marginBottom: heightp(5),
                                    },
                                ]}
                            >
                                <CheckBox
                                    value={item?.id === groupData?.id}
                                    onValueChange={() => {
                                        setGroupData(item)
                                    }}
                                    style={{ marginRight: 2.5 }}
                                    tintColor={'#C5C5C5'}
                                    onCheckColor={colors.primary}
                                    onTintColor={colors.primary}
                                />
                                <RNText style={styles.subItemText2}>
                                    {I18n.t('Students')}
                                </RNText>
                            </View>
                            <View
                                style={[
                                    globalStyles.horizontal,
                                    {
                                        marginHorizontal: heightp(10),
                                    },
                                ]}
                            />
                            <View style={styles.teacherTimeContainer}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '50%',
                                    }}
                                >
                                    <FastImage
                                        style={{
                                            width: heightp(60),
                                            height: heightp(60),
                                            borderRadius: heightp(60),
                                        }}
                                        source={
                                            item?.subject?.teacher?.image ===
                                            null
                                                ? defaultUri
                                                : {
                                                      uri: `${IMAGEURL}/${item?.subject?.teacher?.image}`,
                                                      priority:
                                                          FastImage.priority
                                                              .normal,
                                                  }
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={[
                                            styles.textAlign,
                                            {
                                                fontWeight: '700',
                                                fontSize: heightp(13),
                                                textAlign: 'center',
                                                color: '#434854',
                                            },
                                        ]}
                                        text={`${item?.subject?.teacher?.first_name} ${item?.subject?.teacher?.last_name}`}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '50%',
                                    }}
                                >
                                    {item?.days?.map((day, index) => (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                // width: '50%',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                paddingRight: heightp(5),
                                                marginVertical: heightp(5),
                                            }}
                                        >
                                            <View
                                                style={[
                                                    globalStyles.rowStart,
                                                    {
                                                        width: '50%',
                                                    },
                                                ]}
                                            >
                                                <IonIcons
                                                    name="ios-calendar"
                                                    color={'#434854'}
                                                    size={20}
                                                />
                                                <RNText
                                                    style={styles.subItemText3}
                                                >
                                                    {isDate(day?.day_id)}
                                                </RNText>
                                            </View>
                                            <View
                                                style={[
                                                    globalStyles.rowStart,
                                                    {
                                                        width: '50%',
                                                    },
                                                ]}
                                            >
                                                <IonIcons
                                                    name="ios-time-outline"
                                                    color={'#434854'}
                                                    size={20}
                                                />
                                                <RNText
                                                    style={styles.subItemText3}
                                                >
                                                    {day?.start}
                                                </RNText>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
            <View
                style={{
                    backgroundColor:
                        groupData === null
                            ? 'rgba(67, 72, 84, 1)'
                            : colors.primary,
                    width: '90%',
                    height: 45,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    borderRadius: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        groupData === null
                            ? alert(I18n.t('ChooseGroup'))
                            : subscribeToGroup()
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <RNText
                            style={[
                                styles.subItemText,
                                {
                                    marginHorizontal: 20,
                                    color: colors.white,
                                },
                            ]}
                        >
                            {I18n.t('GroupConfirmation')}
                        </RNText>
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
            <Loader visible={loading} />
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
        </View>
    )
}

export default FazaSubscription

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    flatlistContent: {
        // flexGrow: 1,
    },
    containerFlex: {
        marginTop: heightp(5),
        marginBottom: heightp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subItemText: {
        color: '#434854',
        fontSize: heightp(16),
        fontWeight: '700',
        textAlign: 'left',
        fontFamily: 'Cairo',
        alignSelf: 'center',
    },
    bigCountContainer: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        borderRadius: 10,
        marginVertical: heightp(10),
        paddingVertical: heightp(10),
    },
    countContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: heightp(5),
    },
    countHalfContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    subItemText2: {
        marginLeft: heightp(5),
        // fontWeight: 'bold',
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
    subItemText3: {
        marginLeft: heightp(5),
        // fontWeight: 'bold',
        fontSize: heightp(12),
        lineHeight: heightp(20),
        textAlign: 'left',
        color: '#434854',
    },
    textAlign: {
        fontWeight: 'bold',
        textAlign: 'left',
    },
    teacherTimeContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: heightp(10),
        marginBottom: heightp(5),
    },
})
