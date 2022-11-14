/* eslint-disable camelcase */
/* eslint-disable react/no-children-prop */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
    FlatList,
    Linking,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Timeline from 'react-native-timeline-flatlist'
import { Container, Text } from '../../components/common'
import IconText from '../../components/IconText'
import StageCard from '../../components/StageCard'
import SubjectCard from '../../components/SubjectCard'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import { getSubjectDetails } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'
import Global from '../../../Global'

const DisplaySubject = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const route = useRoute()
    const { title, subjectId, uri } = route.params
    const { subjectDetails } = useAppSelector(
        (state) => state.subjectDetailsPage
    )
    const number_of_hours = subjectDetails?.number_of_hours
    const number_of_students = subjectDetails?.number_of_students
    const level = subjectDetails?.level?.name
    const pdf_link = subjectDetails?.pdf_link
    const chaptersArray = subjectDetails?.chapters
    const lang = 'ar'
    //
    const [refreshing, setRefreshing] = useState(false)
    //
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const payload = {
                subject_id: subjectId?.toString(),
            }
            dispatch(getSubjectDetails(payload))
        })
        return unsubscribe
    }, [dispatch, subjectId])

    const subscribeToLessons = useCallback(
        (tag) => {
            if (subjectId)
                navigation.navigate('SubjectTeachers', {
                    subject_id: subjectId,
                    tag,
                })
        },
        [navigation, subjectId]
    )

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const payload = {
            subject_id: subjectId?.toString(),
        }
        const res = await dispatch(getSubjectDetails(payload))
        console.log('response', res?.payload)
        if (res?.payload?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                globalStyles.container,
                globalStyles.wrapper,
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.containerFlex}>
                <View>
                    <FastImage
                        style={{
                            width: heightp(350),
                            height: heightp(190),
                            borderRadius: 10,
                        }}
                        source={{
                            uri,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={styles.description}>
                    <View style={[globalStyles.rowBetween, styles.listing]}>
                        <IconText
                            text={I18n.t('TimeOfSubject')}
                            children={
                                <Ionicons
                                    name="ios-time"
                                    size={25}
                                    color={colors.black}
                                />
                            }
                        />
                        <Text
                            style={styles.textColor}
                            text={`${number_of_hours} ${I18n.t('Hours')}`}
                        />
                    </View>
                    <View style={[globalStyles.rowBetween, styles.listing]}>
                        <IconText
                            text={I18n.t('NoOfStudents')}
                            children={
                                <Ionicons
                                    name="ios-people"
                                    size={25}
                                    color={colors.black}
                                />
                            }
                        />
                        <Text
                            style={styles.textColor}
                            text={`${number_of_students} ${I18n.t('Students')}`}
                        />
                    </View>
                    <View style={[globalStyles.rowBetween, styles.listing]}>
                        <IconText
                            text={I18n.t('EducationalLevel')}
                            children={
                                <Ionicons
                                    name="ios-trending-up"
                                    size={25}
                                    color={colors.black}
                                />
                            }
                        />
                        <Text style={styles.textColor} text={level} />
                    </View>
                    <View style={[globalStyles.rowBetween, styles.listing]}>
                        <IconText
                            text={I18n.t('DownloadBook')}
                            children={
                                <Ionicons
                                    name="ios-download"
                                    size={25}
                                    color={colors.black}
                                />
                            }
                        />
                        <Pressable
                            onPress={() => Linking.openURL(pdf_link)}
                            style={globalStyles.subBtn}
                        >
                            <Text
                                style={globalStyles.btnColor}
                                text={I18n.t('Download')}
                            />
                        </Pressable>
                    </View>
                    <View style={[globalStyles.rowBetween, styles.listing]}>
                        <IconText
                            text={I18n.t('Subscribe')}
                            children={
                                <MaterialIcons
                                    name="youtube-subscription"
                                    size={25}
                                    color={colors.black}
                                />
                            }
                        />
                        <Pressable
                            onPress={
                                Global.UserType == 4
                                    ? () => subscribeToLessons('parent')
                                    : () => subscribeToLessons('student')
                            }
                            style={globalStyles.subBtn}
                        >
                            <Text
                                style={globalStyles.btnColor}
                                text={
                                    Global.UserType == 4
                                        ? I18n.t('Subscribe')
                                        : I18n.t('Subscribe')
                                }
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            <Text
                style={styles.lessonProgress}
                text={I18n.t('LessonProgress')}
            />
            <Timeline
                columnFormat={
                    lang === 'ar' ? 'single-column-left' : 'single-column-right'
                }
                circleSize={20}
                circleColor={colors.primary}
                lineColor="rgb(59,63,73, 0.5)"
                descriptionStyle={{ color: colors.gray }}
                options={{
                    style: {
                        paddingTop: 5,
                        fontFamily: 'Cairo-Regular',
                        backgroundColor: 'rgba(246, 246, 246, 1)',
                    },
                }}
                showTime={false}
                separator
                data={chaptersArray}
                titleStyle={{
                    color: 'rgb(59,63,73)',
                    fontFamily: 'Cairo-Regular',
                    textAlign: 'left',
                }}
                position="right"
            />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(20),
    },
    listing: {
        marginVertical: heightp(8),
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    textColor: {
        color: colors.primary,
        fontSize: heightp(18),
        fontWeight: 'bold',
    },
    lessonProgress: {
        fontSize: heightp(18),
        marginBottom: heightp(5),
        textAlign: 'left',
    },
})

export default DisplaySubject
