/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { createContext, useEffect, useState } from 'react'
import { Alert, Platform, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { Container } from '../../components/common'
import colors from '../../helpers/colors'
import {
    getSubjectChaptersAndLessons,
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
// import ChooseGroup from './ChooseGroup';
// import ChooseTime from './ChooseTime';
// import SelectGroup from './SelectGroup';

export const SubContext = createContext(null)
const PrivateLessonSubscription = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const { subject_id, teacher_id, iap_activation, iap_id } = route.params
    console.log('iap_activation one lesson', iap_activation, iap_id)
    const { getSubjectChaptersAndLessonData } = useAppSelector(
        (state) => state.getSubjectChaptersAndLessonsPage
    )
    const { teachersFreeDaysData } = useAppSelector(
        (state) => state.teacherFreeDaysPage
    )
    useEffect(() => {
        const payload = {
            subject_id,
        }
        dispatch(getSubjectChaptersAndLessons(payload))
    }, [dispatch, subject_id])
    const [disabledProp, setDisabledProps] = useState(false)
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
                Alert.alert('Alert', res?.message, [
                    {
                        text: 'Cancel',
                        onPress: () => navigation.popToTop(),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('HomePage'),
                    },
                ])
            } else {
                setLoading(false)
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }
    const subscribeToLesson = () => {
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
        if (!iap_activation) {
            subscribeExternal()
        } else {
            const subscriptionInfo = {
                billNumber: 'ios_bill',
                paymentFor: 'OneLesson',
                lessonId: '1258',
                subjectId: subject_id,
                price: 200,
            }
            deviceStorage
                .saveDataToDevice({
                    key: 'subscriptionInfo',
                    value: subscriptionInfo,
                })
                .then(() =>
                    requestPurchase({
                        sku: 'com.newtouch.newvisions_one_lesson',
                    })
                )
        }
    }
    return (
        <SubContext.Provider
            value={{ disabledProp, setDisabledProps, setGroupId }}
        >
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
                                <ChooseLesson
                                    lessons={getSubjectChaptersAndLessonData}
                                />
                            </View>
                        </ProgressStep>
                        <ProgressStep
                            previousBtnText={I18n.t('Previous')}
                            finishBtnText={
                                Global.UserType == 4 ? '' : I18n.t('Subscribe')
                            }
                            onSubmit={
                                Global.UserType == 4 ? null : subscribeToLesson
                            }
                            label={I18n.t('ChooseDay')}
                            nextBtnDisabled={!disabledProp}
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
