/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SubContext } from '.';
import StageCard from '../../components/StageCard'

const ChooseTime = ({getGroupDaysData}) => {
  const { setDisabledProps } = useContext(SubContext);
  const [activeStage, setActiveStage] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const items = [
    { id: 1, name: 'Select Group'},
  ];
  useEffect(() => {
    if (activeStage == null) {
      setDisabledProps(false);
    }else {
      setDisabledProps(true);
    }
  }, [activeStage, setDisabledProps])
  const styles = StyleSheet.create({
    container: {

    }
  })
  return(
    <View style={styles.container}>
      {getGroupDaysData?.map((item, index) => <StageCard show
      navigateSubjects={() => {}}
        stage={item}
        group
        reducedHeight
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
        // activeStage={activeStage}
        setActiveStage={setActiveStage}
        dark text={item.start && `${item.start} - ${item.end}`} />)}
    </View>
  )
};

export default ChooseTime;
