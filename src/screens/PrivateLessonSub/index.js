/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Alert, Platform, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { Container, Text } from '../../components/common'
import colors from '../../helpers/colors'
import {
    // getSubjectChaptersAndLessons,
    getTeacherFreeDays,
} from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deviceStorage } from '../../services/deviceStorage'
import { getInAppPurchaseProducts } from '../../services/getInAppPurchase'
import { requestPurchase } from '../../services/iap'
import I18n from 'i18n-js'
import ChooseGroup from '../FullLessonSubscription/ChooseGroup'
import SelectGroup from '../FullLessonSubscription/SelectGroup'
import ChooseFreeDay from './ChooseFreeday'
import ChooseLesson from './ChooseLesson'
import HomePageService from '../../services/userServices'
import { Loader } from '../../components/Loader'
import Global from '../../../Global'
import SubscriptionModal from '../../components/SubscriptionModal'
import { AppContext } from '../../context/AppState'
import { heightp } from '../../utils/responsiveDesign'
// import ChooseGroup from './ChooseGroup';
// import ChooseTime from './ChooseTime';
// import SelectGroup from './SelectGroup';

export const SubContext = createContext(null)
const PrivateLessonSubscription = () => {
    const route = useRoute()
    const { lang, onLogout } = useContext(AppContext)
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [allLessons, setAllLessons] = useState([])
    const {
        subject_id,
        teacher_id,
        iap_activation,
        iap_id,
        lesson_price,
        subscribe_id,
    } = route.params
    const { getSubjectChaptersAndLessonData } = useAppSelector(
        (state) => state.getSubjectChaptersAndLessonsPage
    )
    const { teachersFreeDaysData } = useAppSelector(
        (state) => state.teacherFreeDaysPage
    )
    console.log(
        'groupsss teachersFreeDaysData allLessons ooooooooooooooooooooo',
        subject_id,
        allLessons
    )
    useEffect(() => {
        const payload = {
            subject_id: subject_id,
        }
        async function getSubjectChaptersAndLessons() {
            setLoading(true)
            try {
                const res = await HomePageService.getSubjectChaptersAndLessons(
                    payload
                )
                if (res.code === 403) {
                    setLoading(false)
                    alert('This Account is Logged in from another Device.')
                    onLogout()
                } else {
                    const data = res?.data
                    data?.map((a) => {
                        setAllLessons((allLessons) => [
                            ...allLessons,
                            ...a?.lessons,
                        ])
                    })
                    setLoading(false)
                    return data
                }
            } catch (err) {
                console.log(err, 'error')
                setLoading(false)
            }
        }
        const unsubscribe = navigation.addListener('focus', () => {
            getSubjectChaptersAndLessons()
        })
        return unsubscribe
    }, [dispatch, subject_id, navigation])
    const [disabledProp, setDisabledProps] = useState(false)
    const [lessonIdGotten, setLessonIdGetten] = useState(0)
    const [dayIdData, setDayIdData] = useState(0)
    const [groupId, setGroupId] = useState(null)
    useEffect(() => {
        const payload = {
            teacher_id,
        }
        dispatch(getTeacherFreeDays(payload))
    }, [dispatch, teacher_id])
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
        console.log(
            'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee the payload dey here oooo',
            subscribe_id
        )
        setLoading(true)
        const payload = {
            id: subscribe_id.toString(),
            type: 3,
            lesson_id: lessonIdGotten,
            day_id: dayIdData,
        }
        try {
            const res = await HomePageService.subscribeExternal(payload)
            if (res.code === 200) {
                setLoading(false)
                openModal(res?.message)
            } else {
                setLoading(false)
                Alert.alert(I18n.t('Subscribe'), I18n.t('SelectRequiredDay'), [
                    {
                        text: 'OK',
                        onPress: () => {},
                    },
                ])
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }
    const subscribeToLesson = () => {
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
        if (Global.UserType == 4 && !iap_activation) {
            navigation.navigate('ParentSub', {
                uniqueId: subscribe_id.toString(),
                type: 3,
                lesson_id: lessonIdGotten,
                day_id: dayIdData,
            })
        } else if (Global.UserType == 3) {
            console.log('hello')
            if (!iap_activation || Platform.OS === 'android') {
                subscribeExternal()
            } else {
                const subscriptionInfo = {
                    billNumber: 'ios_bill',
                    paymentFor: 'FullLesson',
                    lessonId: '1258',
                    subjectId: subject_id,
                    price: 200,
                }
                deviceStorage
                    .saveDataToDevice({
                        key: 'subscriptionInfo',
                        value: subscriptionInfo,
                    })
                    .then(() => requestPurchase({ sku: iap_id }))
            }
        } else {
            return
        }
    }
    return (
        <SubContext.Provider
            value={{
                disabledProp,
                setDisabledProps,
                setGroupId,
                setLessonIdGetten,
                lessonIdGotten,
                setDayIdData,
            }}
        >
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
            <Loader visible={loading} />
            <Container>
                <View style={{ flex: 1 }}>
                    <ProgressSteps
                        completedStepIconColor={colors.primary}
                        activeStepIconBorderColor={colors.primary}
                        completedProgressBarColor={colors.primary}
                        activeLabelColor={colors.primary}
                        removeBtnRow
                    >
                        <ProgressStep
                            nextBtnText={I18n.t('Next')}
                            nextBtnDisabled={!disabledProp}
                            label={I18n.t('ChooseClass')}
                        >
                            <View>
                                {/* <SelectGroup /> */}
                                {allLessons.length > 0 ? (
                                    <ChooseLesson
                                        lessons={allLessons}
                                        subject_id={subject_id}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            text={I18n.t('NoAvailableLessons')}
                                        />
                                    </View>
                                )}
                            </View>
                        </ProgressStep>
                        <ProgressStep
                            previousBtnText={I18n.t('Previous')}
                            finishBtnText={
                                Global.UserType == 4
                                    ? `${I18n.t(
                                          'Subscribefor'
                                      )} ${lesson_price} ${I18n.t('SARlesson')}`
                                    : `${I18n.t(
                                          'Subscribefor'
                                      )} ${lesson_price} ${I18n.t('SARlesson')}`
                            }
                            onSubmit={
                                Global.UserType == 4
                                    ? subscribeToLesson
                                    : subscribeToLesson
                            }
                            label={I18n.t('ChooseDay')}
                            // nextBtnDisabled={!disabledProp}
                            nextBtnStyle={{
                                backgroundColor: colors.primary,
                                // width: '100%',
                                paddingHorizontal:
                                    lang === 'ar' ? heightp(20) : heightp(10),
                                borderRadius: 20,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: lang === 'ar' ? -50 : -50,
                                // marginLeft: lang === 'ar' ? 0 : 40,
                            }}
                            nextBtnTextStyle={{
                                color: colors.white,
                                fontSize: lang === 'ar' ? 14 : 13,
                            }}
                        >
                            <View>
                                {/* <ChooseGroup subjectGroupData={subjectGroupData} /> */}
                                <ChooseFreeDay
                                    freeDays={teachersFreeDaysData}
                                />
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </Container>
        </SubContext.Provider>
    )
}

export default PrivateLessonSubscription
