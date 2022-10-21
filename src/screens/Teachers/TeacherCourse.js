/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { Container, Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'
import TeachersCourseCard from '../../components/TeachersCourseCard'

const TeacherCourse = () => {
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const [loader, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const route = useRoute()
    const { courses, item } = route.params

    const subscribeToLessons = useCallback(
        (subjectId) => {
            if (subjectId)
                navigation.navigate('SubjectTeachers', {
                    subject_id: subjectId,
                    teacher_id: item?.id,
                })
        },
        [navigation, item]
    )

    const navigatePivateLesson = useCallback(
        (course) => {
            // const payload = {
            //     subject_id,
            //     teacher_id: teacher_id ? teacher_id : '',
            // }
            // console.log('payload', item, 'ccccccccccccccccccccccccc', course)
            // dispatch(getSubjectTeachers(payload))
            // const {id, title, image} = item;
            // const uri = `${IMAGEURL}/${image}`
            // // if (id)
            navigation.navigate('PrivateLesson', {
                subscribe_id: course?.id,
                subject_id: course?.subject?.id,
                teacher_id: item?.id,
                iap_id: course?.iap_id,
                iap_activation: course?.iap_activation,
                lesson_price: course?.lesson_price,
            })
        },
        [navigation, item]
    )
    return (
        <Container>
            <View style={{ marginBottom: 15 }} />
            <View style={styles.containerFlex}>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text text={I18n.t('NoData')} />
                        </View>
                    )}
                    data={courses}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                        console.log(
                            courses.length,
                            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                            item
                        )
                        return (
                            <>
                                {item?.subject && (
                                    <TeachersCourseCard
                                        pressed={() => {
                                            // navigateSubjectsDetails(item)
                                        }}
                                        students={
                                            item?.subject?.number_of_students
                                        }
                                        duration={
                                            item?.subject?.number_of_hours
                                        }
                                        uri={`${IMAGEURL}/${item?.subject?.image}`}
                                        contents={item?.subject?.title}
                                        key={index}
                                        onPressSubscribeTeachers={() => {
                                            subscribeToLessons(
                                                item?.subject?.id
                                            )
                                        }}
                                        onPressSubscribePrivateTeachers={() => {
                                            navigatePivateLesson(item)
                                        }}
                                        fromAllCourse={true}
                                    />
                                )}
                            </>
                        )
                    }}
                    getItemLayout={(data, index) => ({
                        length: heightp(135),
                        offset: heightp(135) * index,
                        index,
                    })}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(60),
    },
})

export default TeacherCourse
