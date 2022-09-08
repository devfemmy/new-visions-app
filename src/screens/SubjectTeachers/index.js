/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import { Container, Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'
import { getSubjectTeachers } from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'
import { deviceStorage } from '../../services/deviceStorage'
import { requestPurchase } from '../../services/iap'

const SubjectTeachers = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const route = useRoute()
    const { subject_id } = route.params
    const {
        subjectTeachersPage,
        app: { loading },
    } = useAppSelector((state) => state)
    const subjectTeachersData = subjectTeachersPage?.subjectTeachersData;
    useEffect(() => {
        const payload = {
            subject_id,
        }
        dispatch(getSubjectTeachers(payload))
    }, [dispatch, subject_id])

    const navigateFullSubscription = useCallback(
        (item) => {
            navigation.navigate('FullLesson', {
                subject_id,
                iap_id: item?.iap_id
            })
        },
        [navigation, subject_id]
    )
    const bookOneLesson = (item) => {
        const subscriptionInfo = {
            billNumber: 'ios_bill',
            paymentFor: 'OneLesson',
            lessonId: '1258',
            subjectId: subject_id,
            price: 200,
          };
          deviceStorage
            .saveDataToDevice({ key: 'subscriptionInfo', value: subscriptionInfo })
            .then(() => requestPurchase({ sku:  item?.lesson_iap_id}));
    }
    const navigateTeachersProfile = useCallback(
        (item) => {
            const teacherItem = item?.user
            navigation.navigate('TeacherProfile', {
                item: teacherItem,
                title: `${teacherItem?.first_name} ${teacherItem?.last_name}`,
            })
        },
        [navigation]
    )
    const navigatePivateLesson = useCallback(
        (item) => {
            // const {id, title, image} = item;
            // const uri = `${IMAGEURL}/${image}`
            // if (id)
            navigation.navigate('PrivateLesson', {
                subject_id,
                teacher_id: item?.teacher_id,
                iap_id: item?.iap_id
            })
        },
        [navigation, subject_id]
    )
    const searchFilteredData = searchText
        ? subjectTeachersData?.filter((x) =>
              x?.user?.first_name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
          )
        : subjectTeachersData

    return (
        <Container>
            <View style={{ marginBottom: 15 }}>
                {/* <SearchBar
          placeholder="Search Subject Teachers"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchBar}
          /> */}
            </View>
            <View style={styles.containerFlex}>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => <Text text={I18n.t('UnavailableTeacher')} />}
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        
                        return (
                            <TeachersDetailCard
                                bookOneLesson={() => bookOneLesson(item)}
                                subjectDetails
                                viewProfile={() =>
                                    navigateTeachersProfile(item)
                                }
                                bookCourse={() => navigateFullSubscription(item)}
                                bookPrivateLesson={() =>
                                    navigatePivateLesson(item)
                                }
                                title={item?.subject?.title}
                                lessonPrice={item?.lesson_price}
                                numberOfStudents={
                                    item?.subject?.number_of_students
                                }
                                uri={`${IMAGEURL}/${item?.user?.image}`}
                                contents={`${item?.user?.first_name} ${item?.user?.last_name}`}
                            />
                        )
                    }}
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

export default SubjectTeachers
