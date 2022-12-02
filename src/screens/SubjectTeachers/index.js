/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
    Alert,
    FlatList,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
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
import HomePageService from '../../services/userServices'
import { Loader } from '../../components/Loader'
import SubscriptionModal from '../../components/SubscriptionModal'
import { globalStyles } from '../../helpers/globalStyles'

const SubjectTeachers = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const [loader, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const route = useRoute()
    const { subject_id, teacher_id } = route.params
    const {
        subjectTeachersPage,
        app: { loading },
    } = useAppSelector((state) => state)
    const subjectTeachersData = subjectTeachersPage?.subjectTeachersData
    console.log('subjectTeachersData', subject_id, subjectTeachersData)
    //
    const [refreshing, setRefreshing] = useState(false)
    //
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const payload = {
                subject_id,
                teacher_id: teacher_id ? teacher_id : '',
            }
            dispatch(getSubjectTeachers(payload))
        })
        return unsubscribe
    }, [dispatch, subject_id])

    const navigateFullSubscription = useCallback(
        (item) => {
            console.log(
                'wwwwwwwwww TeacherProfile wwwwwwwwwwwwwwwwwwwww id',
                item?.id
            )
            navigation.navigate('FullLesson', {
                subject_id: item?.subject_id,
                iap_id: item?.iap_id,
                iap_activation: item?.iap_activation,
                lesson_price: item?.price,
                subscribe_id: item?.id,
            })
        },
        [navigation, subject_id]
    )
    const openModal = (message) => {
        setIsVisible(!isVisible)
        setModalMessage(message)
    }
    const subscribeExternal = async (item) => {
        setLoading(true)
        const payload = {
            id: item?.id.toString(),
            type: 3,
            lesson_id: '',
            day_id: '',
        }
        console.log('the payload dey here oooo', payload)
        try {
            const res = await HomePageService.subscribeExternal(payload)
            if (res.code === 200) {
                setLoading(false)
                openModal(res?.message)
            } else {
                setLoading(false)
                Alert.alert(I18n.t('Subscribe'), res?.message, [
                    {
                        text: 'Cancel',
                        onPress: () => navigation.popToTop(),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.popToTop(),
                    },
                ])
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }
    const bookOneLesson = (item) => {
        const iap_activation = item?.iap_activation
        if (!iap_activation || Platform.OS === 'android') {
            subscribeExternal(item)
        } else {
            const subscriptionInfo = {
                billNumber: 'ios_bill',
                paymentFor: 'OneLesson',
                lessonId: '1258',
                subjectId: subject_id,
                price: 200,
            }
            deviceStorage
                .saveDataToDevice({
                    key: 'subscriptionInfo',
                    value: subscriptionInfo,
                })
                .then(() => requestPurchase({ sku: item?.lesson_iap_id }))
        }
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
            console.log(
                'wwwwwwwwww TeacherProfile wwwwwwwwwwwwwwwwwwwww id',
                item?.id
            )
            navigation.navigate('PrivateLesson', {
                subject_id: item?.subject?.id,
                teacher_id: item?.teacher_id,
                iap_id: item?.lesson_iap_id,
                iap_activation: item?.iap_activation,
                lesson_price: item?.lesson_price,
                subscribe_id: item?.id,
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

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const payload = {
            subject_id,
            teacher_id: teacher_id ? teacher_id : '',
        }
        const res = await dispatch(getSubjectTeachers(payload))
        console.log('response', res?.payload)
        if (res?.payload?.code === 200) {
            setRefreshing(false)
        }
    }, [dispatch, subject_id])

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
            <Loader visible={loader} />
            <SubscriptionModal
                onPress={() => {
                    setIsVisible(!isVisible)
                }}
                isVisible={isVisible}
                text={modalMessage}
                navigation={() => {
                    setIsVisible(!isVisible)
                    navigation.popToTop()
                }}
            />
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
                    ListEmptyComponent={() => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text text={I18n.t('UnavailableTeacher')} />
                        </View>
                    )}
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <TeachersDetailCard
                                    bookOneLesson={() => bookOneLesson(item)}
                                    subjectDetails
                                    viewProfile={() =>
                                        navigateTeachersProfile(item)
                                    }
                                    bookCourse={() => {
                                        navigateFullSubscription(item)
                                        console.log(
                                            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx iap_activation iap_activation iap_activation',
                                            item
                                        )
                                    }}
                                    bookPrivateLesson={() => {
                                        navigatePivateLesson(item)
                                    }}
                                    title={item?.subject?.title}
                                    lessonPrice={item?.lesson_price}
                                    ratings={item?.user?.rating}
                                    numberOfStudents={
                                        item?.subject?.number_of_students
                                    }
                                    uri={`${IMAGEURL}/${item?.user?.image}`}
                                    contents={`${item?.user?.first_name} ${item?.user?.last_name}`}
                                />
                            </>
                        )
                    }}
                />
            </View>
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
        marginBottom: heightp(60),
    },
})

export default SubjectTeachers
