/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Pressable,
    ActivityIndicator,
    Text as RNText,
    Alert,
} from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import { Container, Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'
import { getTeachers } from '../../redux/action'
import { getSubject } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'
import HomePageService from '../../services/userServices'

const Teachers = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const route = useRoute()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [dataForTeachers, setDataForTeachers] = useState([])
    // const { level } = route.params;
    // const data = useAppSelector((state)=> console.log(state, 'hello'));
    const {
        teachersPage,
        app: { loading },
    } = useAppSelector((state) => state)
    const teachersData = teachersPage?.teachersData
    useEffect(() => {
        // const res = dispatch(getTeachers({ page: page }))
        // console.log('res', res)
        // setDataForTeachers(...teachersData, teachersData)
        async function getTeachers() {
            setIsLoading(true)
            console.log('answer to be submitted in live quiz', lesson_id, item)
            const payload = {
                lesson_id: lesson_id,
            }
            console.log(payload)
            try {
                const res = await HomePageService.getTeachers(payload)
                if (res.code === -2) {
                    setIsLoading(false)
                    console.log('false data', res)
                    Alert.alert(
                        `${I18n.t('Quiz')}`,
                        res?.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    navigation.navigate('Home')
                                },
                                style: 'cancel',
                            },
                        ],
                        {
                            cancelable: false,
                        }
                    )
                } else {
                    console.log('getTeachers res', res)
                    const data = res?.data
                    // setIsLoading(false)
                    // setQuizData(data?.questions)
                    // const filledArray = Array.from(
                    //     Array(data?.questions.length),
                    //     () => {
                    //         return { answer: '', question_id: '' }
                    //     }
                    // )
                    // setAnswersInput(filledArray)
                    // setNumOfMins(data?.number_of_minutes)
                    // console.log('quiz data', data)
                    
                    return res
                }
            } catch (err) {
                setIsLoading(false)
                console.log('err', err)
            }
        }
        getTeachers()
    }, [dispatch, teachersData])

    const navigateSubjectsDetails = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )
    const searchFilteredData = searchText
        ? dataForTeachers?.data.filter((x) =>
              x.first_name.toLowerCase().includes(searchText.toLowerCase())
          )
        : dataForTeachers?.data

    const fetchTeachers = async () => {
        setIsLoading(true)
        setPage(page + 1)
        dispatch(getTeachers({ page: page + 1 }))
        console.log('here to fetch', page)
        // console.log('res', res)
        // if (res.requestId.length > 0) {
        setIsLoading(false)
        // }
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    marginBottom: heightp(60),
                }}
            >
                <View style={styles.footer}>
                    <Pressable
                        activeOpacity={0.9}
                        onPress={() => {
                            fetchTeachers()
                        }}
                        style={styles.loadMoreBtn}
                    >
                        <RNText style={styles.btnText}>
                            {isLoading ? 'Loading...' : 'Load More'}
                        </RNText>
                        {isLoading ? (
                            <ActivityIndicator
                                color="white"
                                size="small"
                                style={{ marginLeft: 8 }}
                            />
                        ) : null}
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <Container>
            <View style={{ marginBottom: 15 }}>
                <SearchBar
                    placeholder={I18n.t('SearchTeachers')}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    style={styles.searchBar}
                />
            </View>
            <View style={styles.containerFlex}>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => <Text text={I18n.t('NoData')} />}
                    ListFooterComponent={renderFooter}
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <>
                            {/* <>{console.log(item)}</> */}
                            <TeachersDetailCard
                                // subjectDetails
                                pressed={() => navigateSubjectsDetails(item)}
                                city={item?.city?.name}
                                gender={item?.gender}
                                rates_count={item?.rates_count}
                                ratings={item?.rate === 0 ? null : item?.rate}
                                uri={`${IMAGEURL}/${item?.image}`}
                                contents={`${item?.first_name} ${item?.last_name}`}
                            />
                        </>
                    )}
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
        marginBottom: heightp(20),
    },
    footer: {
        // paddingVertical: heightp(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 7.5,
        backgroundColor: 'rgba(155, 186, 82, 1)',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
})

export default Teachers
