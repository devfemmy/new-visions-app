/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Alert, Platform, View } from 'react-native'
import I18n from 'i18n-js'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { Container } from '../../components/common'
import colors from '../../helpers/colors'
import { getGroupDays, getSubjectGroups } from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deviceStorage } from '../../services/deviceStorage'
import { getInAppPurchaseProducts } from '../../services/getInAppPurchase'
import { requestPurchase } from '../../services/iap'
import ChooseGroup from './ChooseGroup'
import ChooseTime from './ChooseTime'
import SelectGroup from './SelectGroup'
import HomePageService from '../../services/userServices'
import { Loader } from '../../components/Loader'
import Global from '../../../Global'
import SubscriptionModal from '../../components/SubscriptionModal'
import { heightp } from '../../utils/responsiveDesign'
import { AppContext } from '../../context/AppState'

export const SubContext = createContext(null)
const FullLessonSubscription = () => {
    const route = useRoute()
    const { lang } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const items = [
        // { id: 1, name: I18n.t('MorningSession') },
        // { id: 2, name: I18n.t('EveningSession') },
        { id: 2, name: I18n.t('ViewGroupDates') },
        { id: 3, name: I18n.t('SpecialDate') },
    ]
    const { subject_id, iap_id, iap_activation, lesson_price } = route.params
    const { subjectGroupData } = useAppSelector(
        (state) => state.subjectGroupPage
    )
    console.log('iap_activation full lesson', lesson_price)
    const { getGroupDaysData } = useAppSelector((state) => state.groupDaysPage)
    // useEffect(() => {
    //     const payload = {
    //         subject_id,
    //         type: items[0].id === 1 ? 1 : items[0].id === 2 ? 2 : '',
    //     }
    //     console.log('xxxxxxxxxxxxxxxxxxx hello, na here i dey', payload)
    //     dispatch(getSubjectGroups(payload))
    // }, [dispatch, subject_id])
    const [disabledProp, setDisabledProps] = useState(false)
    const [groupId, setGroupId] = useState(null)
    console.log('groupId', groupId)
    useEffect(() => {
        const payload = {
            group_id: groupId,
        }
        dispatch(getGroupDays(payload))
    }, [dispatch, groupId])

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
        setLoading(true)
        const payload = {
            id: subject_id.toString(),
            type: 1,
            lesson_id: '',
            day_id: '',
        }
        try {
            const res = await HomePageService.subscribeExternal(payload)
            if (res.code === 200) {
                setLoading(false)
                openModal(res?.message)
                // Alert.alert('Alert', res?.message, [
                //     {
                //         text: 'Cancel',
                //         onPress: () => navigation.popToTop(),
                //         style: 'cancel',
                //     },
                //     {
                //         text: 'OK',
                //         onPress: () => navigation.navigate('HomePage'),
                //     },
                // ])
            } else {
                setLoading(false)
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }
    const subscribeToFullLesson = () => {
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
        if (!iap_activation) {
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
    }
    return (
        <SubContext.Provider
            value={{ disabledProp, setDisabledProps, setGroupId }}
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
                            label={I18n.t('SelectGroup')}
                        >
                            <View>
                                <SelectGroup
                                    subject_id={subject_id}
                                    items={items}
                                />
                            </View>
                        </ProgressStep>
                        <ProgressStep
                            previousBtnText={I18n.t('Previous')}
                            nextBtnText={I18n.t('Next')}
                            nextBtnDisabled={!disabledProp}
                            label={I18n.t('ChooseGroup')}
                        >
                            <View>
                                <ChooseGroup
                                    subjectGroupData={subjectGroupData}
                                />
                            </View>
                        </ProgressStep>
                        <ProgressStep
                            previousBtnText={I18n.t('Previous')}
                            finishBtnText={
                                Global.UserType == 4
                                    ? ''
                                    : `${I18n.t(
                                          'Subscribefor'
                                      )} ${lesson_price} ${I18n.t('Rscourse')}`
                            }
                            onSubmit={
                                Global.UserType == 4
                                    ? null
                                    : subscribeToFullLesson
                            }
                            label={I18n.t('GroupDays')}
                            nextBtnStyle={{
                                backgroundColor: colors.primary,
                                // width: '100%',
                                paddingHorizontal:
                                    lang === 'ar' ? heightp(20) : heightp(10),
                                borderRadius: 20,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: lang === 'ar' ? -40 : -50,
                                // marginLeft: lang === 'ar' ? 0 : 40,
                            }}
                            nextBtnTextStyle={{
                                color: colors.white,
                                fontSize: lang === 'ar' ? 14 : 13,
                            }}
                        >
                            <View>
                                <ChooseTime
                                    lesson_price={lesson_price}
                                    getGroupDaysData={getGroupDaysData}
                                />
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </Container>
        </SubContext.Provider>
    )
}

export default FullLessonSubscription
