/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { createContext, useEffect, useState } from 'react'
import { Platform, View } from 'react-native';
import I18n from 'i18n-js';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Container,} from '../../components/common'
import colors from '../../helpers/colors';
import { getGroupDays, getSubjectGroups } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deviceStorage } from '../../services/deviceStorage';
import { getInAppPurchaseProducts } from '../../services/getInAppPurchase';
import { requestPurchase } from '../../services/iap';
import ChooseGroup from './ChooseGroup';
import ChooseTime from './ChooseTime';
import SelectGroup from './SelectGroup';

export const SubContext = createContext(null)
const FullLessonSubscription = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { subject_id } = route.params
    const { subjectGroupData } = useAppSelector(
        (state) => state.subjectGroupPage
    )
    const { getGroupDaysData } = useAppSelector((state) => state.groupDaysPage)
    useEffect(() => {
        const payload = {
            subject_id,
        }
        dispatch(getSubjectGroups(payload))
    }, [dispatch, subject_id])
    const [disabledProp, setDisabledProps] = useState(false)
    const [groupId, setGroupId] = useState(null)
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
    const subscribeToFullLesson = () => {
        //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
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
            .then(() =>
                requestPurchase({ sku: 'com.newtouch.newvisions_curriculum' })
            )
    }
  return (
    <SubContext.Provider value={{ disabledProp, setDisabledProps, setGroupId }}>
      <Container>
        <View style={{flex: 1}}>
          <ProgressSteps 
          completedStepIconColor={colors.primary}
          activeStepIconBorderColor={colors.primary} 
          completedProgressBarColor={colors.primary} 
          activeLabelColor={colors.primary} removeBtnRow>
              <ProgressStep  nextBtnText={I18n.t('Next')}  nextBtnDisabled={!disabledProp} label={I18n.t('SelectGroup')}>
                  <View>
                    <SelectGroup />
                  </View>
              </ProgressStep>
              <ProgressStep previousBtnText={I18n.t('Previous')} nextBtnText={I18n.t('Next')} nextBtnDisabled={!disabledProp}  label={I18n.t('ChooseGroup')}>
                <View>
                    <ChooseGroup subjectGroupData={subjectGroupData} />
                  </View>
              </ProgressStep>
              <ProgressStep previousBtnText={I18n.t('Previous')} finishBtnText={I18n.t('Subscribe')} onSubmit={subscribeToFullLesson} label={I18n.t('GroupDays')}>
                <View>
                    <ChooseTime getGroupDaysData={getGroupDaysData} />
                  </View>
              </ProgressStep>
          </ProgressSteps>
        </View>
      </Container>
    </SubContext.Provider>
  )
};

export default FullLessonSubscription;
