/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { createContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Container,} from '../../components/common'
import colors from '../../helpers/colors';
import { getGroupDays, getSubjectGroups } from '../../redux/action';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ChooseGroup from './ChooseGroup';
import ChooseTime from './ChooseTime';
import SelectGroup from './SelectGroup';

export const SubContext = createContext(null);
const FullLessonSubscription = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { subject_id } = route.params;
  const {subjectGroupData} = useAppSelector((state)=> state.subjectGroupPage);
  const {getGroupDaysData} = useAppSelector((state)=> state.groupDaysPage);
  useEffect(() => {
    const payload = {
      subject_id: '1'
    }
    dispatch(getSubjectGroups(payload))
  }, [dispatch, subject_id]);
  const [disabledProp, setDisabledProps] = useState(false);
  const [groupId, setGroupId] = useState(null);
  useEffect(() => {
    const payload = {
      group_id: '1'
    }
    dispatch(getGroupDays(payload))
  }, [dispatch, groupId]);
  return (
    <SubContext.Provider value={{ disabledProp, setDisabledProps, setGroupId }}>
      <Container>
        <View style={{flex: 1}}>
          <ProgressSteps 
          completedStepIconColor={colors.primary}
          activeStepIconBorderColor={colors.primary} 
          completedProgressBarColor={colors.primary} 
          activeLabelColor={colors.primary} removeBtnRow>
              <ProgressStep  nextBtnDisabled={!disabledProp} label="Select Group">
                  <View>
                    <SelectGroup />
                  </View>
              </ProgressStep>
              <ProgressStep nextBtnDisabled={!disabledProp}  label="Choose the group">
                <View>
                    <ChooseGroup subjectGroupData={subjectGroupData} />
                  </View>
              </ProgressStep>
              <ProgressStep onSubmit={() => navigation.navigate('SuccessSub')} nextBtnDisabled={!disabledProp} label="Choose the time">
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