/* eslint-disable camelcase */
/* eslint-disable react/no-children-prop */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Linking, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Timeline from 'react-native-timeline-flatlist';
import { Container, Text } from '../../components/common'
import IconText from '../../components/IconText';
import StageCard from '../../components/StageCard'
import SubjectCard from '../../components/SubjectCard'
import colors from '../../helpers/colors';
import { globalStyles } from '../../helpers/globalStyles';
import {  getSubjectDetails, } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'

const DisplaySubject = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { title, subjectId, uri } = route.params;
  const {subjectDetails} = useAppSelector((state)=> state.subjectDetailsPage);
  const number_of_hours = subjectDetails?.number_of_hours;
  const number_of_students = subjectDetails?.number_of_students;
  const level = subjectDetails?.level_id;
  const pdf_link = subjectDetails?.pdf_link;
  const chaptersArray = subjectDetails?.chapters;
  const lang = 'ar';
  useEffect(() => {
    const payload = {
      subject_id: subjectId?.toString(),
    }
    dispatch(getSubjectDetails(payload))
  },[dispatch, subjectId]);

  // const navigateSubjects = useCallback(() => {
  //   if (activeStage)
  //     navigation.navigate('Home', {
  //       level: activeLevel?.id,
  //       // subject: route?.params?.SubjectValue ? route.params.SubjectValue : '',
  //     });
  // }, [activeLevel?.id, activeStage, navigation]);

  return (
      <Container>
        <View style={styles.containerFlex}>
        <View>
          <FastImage
          style={{width: heightp(350), height: heightp(190), borderRadius: 10}}
          source={{
            uri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        </View>
        <View style={styles.description}>
          <View style={[globalStyles.rowBetween, styles.listing]}>
            <IconText text="Time of Subject" 
            children={<Ionicons name="ios-time" size={25} color={colors.black} />} />
            <Text style={styles.textColor} text={`${number_of_hours} hours`} />
            </View>
            <View style={[globalStyles.rowBetween, styles.listing]}>
            <IconText text="No. Of Students" 
            children={<Ionicons name="ios-people" size={25} color={colors.black} />} />
            <Text style={styles.textColor} text={`${number_of_students} students`} />
            </View>
            <View style={[globalStyles.rowBetween, styles.listing]}>
            <IconText text="Educational Level" 
            children={<Ionicons name="ios-trending-up" size={25} color={colors.black} />} />
            <Text style={styles.textColor} text={level} />
            </View>
            <View style={[globalStyles.rowBetween, styles.listing]}>
            <IconText text="Download Book" 
            children={<Ionicons name="ios-download-outline" size={25} color={colors.black} />} />
            <Text onPress={() => Linking.openURL(pdf_link)} style={styles.textColor} text="Download" />
            </View>
        </View>
        </View>
        {/* {<View style={{ margin: 15, marginRight: 25 }}> */}
        <Text style={styles.lessonProgress} text="Lesson progress" />
          <Timeline
            columnFormat={lang === 'ar' ? 'single-column-left' : 'single-column-right'}
            circleSize={20}
            circleColor={colors.primary}
            lineColor="rgb(59,63,73, 0.5)"
            descriptionStyle={{ color: colors.gray }}
            options={{
              style: { paddingTop: 5, fontFamily: 'Cairo-Regular', backgroundColor: 'rgba(246, 246, 246, 1)' },
            }}
            showTime={false}
            separator
            data={chaptersArray}
            titleStyle={{ color: 'rgb(59,63,73)', fontFamily: 'Cairo-Regular' }}
            position="right"
          />
        {/* </View>} */}
      </Container>
  )
}
const styles = StyleSheet.create({
  flatlistContent: {
    flexGrow: 1,
  },
  containerFlex: {
    marginBottom: heightp(20)
  },
  listing: {
    marginVertical: heightp(8)
  },
  textColor: {
    color: colors.primary,
    fontSize: heightp(18),
    fontWeight: 'bold'
  },
  lessonProgress: {
    fontSize: heightp(18),
    marginBottom: heightp(5)
  }
})

export default DisplaySubject;