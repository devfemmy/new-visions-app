/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { createContext, useEffect, useState } from 'react'
import { Platform, View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Container,} from '../../components/common'
import colors from '../../helpers/colors';
import { getSubjectChaptersAndLessons, getTeacherFreeDays } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deviceStorage } from '../../services/deviceStorage';
import { getInAppPurchaseProducts } from '../../services/getInAppPurchase';
import { requestPurchase } from '../../services/iap';
import I18n from 'i18n-js';
import ChooseGroup from '../FullLessonSubscription/ChooseGroup';
import SelectGroup from '../FullLessonSubscription/SelectGroup';
import ChooseFreeDay from './ChooseFreeday';
import ChooseLesson from './ChooseLesson';
// import ChooseGroup from './ChooseGroup';
// import ChooseTime from './ChooseTime';
// import SelectGroup from './SelectGroup';

export const SubContext = createContext(null);
const PrivateLessonSubscription = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { subject_id, teacher_id } = route.params;
  const {getSubjectChaptersAndLessonData} = useAppSelector((state)=> state.getSubjectChaptersAndLessonsPage);
  const {teachersFreeDaysData} = useAppSelector((state)=> state.teacherFreeDaysPage);
  useEffect(() => {
    const payload = {
      subject_id,
    }
    dispatch(getSubjectChaptersAndLessons(payload))
  }, [dispatch, subject_id]);
  const [disabledProp, setDisabledProps] = useState(false);
  const [groupId, setGroupId] = useState(null);
  useEffect(() => {
    const payload = {
      teacher_id,
    }
    dispatch(getTeacherFreeDays(payload))
  }, [dispatch, teacher_id]);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      getInAppPurchaseProducts();
    }
  }, []);
  const subscribeToLesson = () => {
  //  navigation.navigate('SuccessSub', {name: 'Private Lesson'})
    const subscriptionInfo = {
      billNumber: 'ios_bill',
      paymentFor: 'OneLesson',
      lessonId: '1258',
      subjectId: subject_id,
      price: 200,
    };
    deviceStorage
      .saveDataToDevice({ key: 'subscriptionInfo', value: subscriptionInfo })
      .then(() => requestPurchase({ sku: 'com.newtouch.newvisions_one_lesson' }));
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
              <ProgressStep nextBtnText={I18n.t('Next')}   nextBtnDisabled={!disabledProp} label={I18n.t('ChooseDay')}>
                  <View>
                    {/* <SelectGroup /> */}
                    <ChooseLesson lessons={getSubjectChaptersAndLessonData} />
                  </View>
              </ProgressStep>
              <ProgressStep previousBtnText={I18n.t('Previous')} finishBtnText={I18n.t('Subscribe')}  onSubmit={subscribeToLesson} nextBtnDisabled={!disabledProp}  label={I18n.t('ChooseClass')}>
                <View>
                    {/* <ChooseGroup subjectGroupData={subjectGroupData} /> */}
                    <ChooseFreeDay freeDays={teachersFreeDaysData} />
                  </View>
              </ProgressStep>
          </ProgressSteps>
        </View>
      </Container>
    </SubContext.Provider>
  )
};

export default PrivateLessonSubscription;