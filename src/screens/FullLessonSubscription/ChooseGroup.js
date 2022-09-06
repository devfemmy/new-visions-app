/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SubContext } from '.';
import StageCard from '../../components/StageCard'

const ChooseGroup = (subjectGroupData) => {
  const items = subjectGroupData?.subjectGroupData;
  const { setGroupId, setDisabledProps } = useContext(SubContext);
  const [activeStage, setActiveStage] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  useEffect(() => {
    const groupId = activeStage?.days[0]?.group_id;
    if (activeStage == null) {
      setDisabledProps(false);
    }else {
      setDisabledProps(true);
      setGroupId(groupId)
    }
  }, [activeStage, setDisabledProps, setGroupId])
  const styles = StyleSheet.create({
    container: {

    }
  })
  return(
    <View style={styles.container}>
      {items?.map((item, index) => (
          <StageCard group show
      navigateSubjects={() => {}}
        stage={item}
        groupNumber={item && `Group Number ${index + 1}`}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        dark text={item.start && `${item.start} - ${item.end}`} />
        ))}
    </View>
  )
};

export default ChooseGroup;
