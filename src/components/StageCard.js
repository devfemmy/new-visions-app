/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View, } from 'react-native'
import colors from '../helpers/colors'
import { globalStyles } from '../helpers/globalStyles'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'

const StageCard = ({
  text, 
  dark,
  stage,
  levels,
  activeStage,
  activeLevel,
  setActiveLevel,
  setActiveStage,
  show,
  group,
  groupNumber,
  reducedHeight,
  navigateSubjects,}) => {
    let isActive
  if (group) {
    isActive = activeStage?.id === stage?.id;
  }else {
    isActive = activeStage?.name === stage?.name;
  }
  const styles = StyleSheet.create({
    container: {
      minHeight: reducedHeight ? heightp(80): heightp(110),
      backgroundColor: isActive ? colors.primary : colors.dark,
      borderRadius: 8,
      width: dark ? '100%' :  widthp(121),
      marginRight: heightp(25),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: heightp(10),
      marginTop: dark ? heightp(18) : 0,
    },
    darkContainer: {
      minHeight: heightp(110),
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
    levels: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: heightp(30),
      marginHorizontal: heightp(12),
    },
    levelBox: {
      width: '48%',
      marginBottom: heightp(10),
      paddingHorizontal: heightp(10),
      paddingVertical: heightp(15),
      borderRadius: heightp(5),
    },
    level: {
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Cairo-Medium',
      fontSize: heightp(14),
    },
    continueBtn: {
        backgroundColor: colors.primary,
        height: heightp(45),
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: heightp(20)
    }
  });
  return (
    <View>
      {!dark ? 
      <Pressable    
            onPress={() => {}} style={!dark ? styles.darkContainer : styles.container}>
            <Text style={styles.textColor} text={text} />
          </Pressable>: 
      <Pressable    
        onPress={() => {
        setActiveStage(stage);
        if (stage.name !== activeStage?.name) setActiveLevel(null);
      }} style={!dark ? styles.darkContainer : styles.container}>
        {group && !reducedHeight ? <Text style={styles.textColor} text={groupNumber} /> : null}
        <Text style={styles.textColor} text={text} />
      </Pressable>
    }
      {isActive && !show ? (
        <>
          <View style={styles.levels}>
            {levels?.map((level) => {
              const isActiveLevel = level.id === activeLevel?.id;
              return (
                <TouchableOpacity
                  key={level.id}
                  activeOpacity={0.7}
                  onPress={() => setActiveLevel(level)}
                  style={[
                    styles.levelBox,
                    { backgroundColor: isActiveLevel ? colors.primary : colors.black },
                  ]}
                >
                  <Text text={level.name} numberOfLines={1} style={styles.level} />
                </TouchableOpacity>
              );
            })}
          </View>

          {activeLevel ? (
            <TouchableOpacity activeOpacity={0.7} style={styles.continueBtn} onPress={navigateSubjects}>
              <Text
                text="NEXT"
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  color: 'white',
                  fontFamily: 'Cairo-Medium',
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </>
      ) : null}
      <View style={!dark ? null : globalStyles.horizontalMargin} />
    </View>
  )
}


export default StageCard;