/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View, } from 'react-native'
import FastImage from 'react-native-fast-image'
import colors from '../helpers/colors'
import { globalStyles } from '../helpers/globalStyles'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'

const LessonCard = ({
  text, 
  dark,
  stage,
  activeStage,
  setActiveLevel,
  setActiveStage,
  group,
  reducedHeight,}) => {
    let isActive
  if (group) {
    isActive = activeStage?.id === stage?.id;
  }else {
    isActive = activeStage?.title === stage?.title;
  }
  const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const specialIndex = `${stage?.day_id - 1}`;
  const dayOfWeek = daysOfWeek[specialIndex]
  const styles = StyleSheet.create({
    container: {
      minHeight: heightp(70),
      backgroundColor: isActive ? colors.primary : colors.dark,
      borderRadius: 8,
      width: dark ? '100%' :  widthp(121),
      marginRight: heightp(25),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: heightp(10),
      marginTop: dark ? heightp(20) : 0,
    },
    darkContainer: {
      minHeight: heightp(50),
      backgroundColor: !dark ? colors.primary : colors.dark,
      borderRadius: 8,
      width: dark ? '100%' :  widthp(121),
      marginRight: heightp(25),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: heightp(10),
      marginTop: dark ? heightp(20) : 0
    },
    textColor: {
      color: 'white',
      fontWeight: 'bold'
    },
  });
  return (
    <View>
      <Pressable    
        onPress={() => {
        setActiveStage(stage);
        if (stage.title !== activeStage?.title) setActiveLevel(null);
      }} style={!dark ? styles.darkContainer : styles.container}>
        {group && !reducedHeight ? <Text style={styles.textColor} text={dayOfWeek} /> : null}
        <Text style={styles.textColor} text={text} />
      </Pressable>
    </View>
  )
}


export default LessonCard;