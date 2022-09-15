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
import colors from '../../helpers/colors'

const Teachers = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const route = useRoute()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [dataForTeachers, setDataForTeachers] = useState([])
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false)
    // console.log('quiz data', dataForTeachers.length)
    // const { level } = route.params;
    // const data = useAppSelector((state)=> console.log(state, 'hello'));
    // const {
    //     teachersPage,
    //     app: { loading },
    // } = useAppSelector((state) => state)
    // const teachersData = teachersPage?.teachersData
    async function getTeachers(page) {
        setIsLoading(true)
        const payload = { page: page }
        console.log(payload)
        try {
            const res = await HomePageService.getTeachers(payload)
            if (res.code === -2) {
                setIsLoading(false)
                console.log('false data', res)
                Alert.alert(
                    `${I18n.t('Teachers')}`,
                    res?.message,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // navigation.navigate('Home')
                            },
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            } else {
                const data = res?.data?.data
                console.log('getTeachers res', data)
                setIsLoading(false)
                setDataForTeachers(data)
                // const filledArray = Array.from(
                //     Array(data?.questions.length),
                //     () => {
                //         return { answer: '', question_id: '' }
                //     }
                // )
                // setAnswersInput(filledArray)
                // setNumOfMins(data?.number_of_minutes)
                // console.log('quiz data', data)

                return data
            }
        } catch (err) {
            setIsLoading(false)
            console.log('err', err)
        }
    }
    useEffect(() => {
        // const res = dispatch(getTeachers())
        // console.log('res', res)
        // setDataForTeachers(...teachersData, teachersData)

        getTeachers(page)
    }, [dispatch])

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
        ? dataForTeachers?.filter((x) =>
              x.first_name.toLowerCase().includes(searchText.toLowerCase())
          )
        : dataForTeachers

    const fetchTeachers = async () => {
        console.log('here to fetch')
        setIsLoading(true)
        setPage(page + 1)
        const payload = { page: page + 1 }
        try {
            const res = await HomePageService.getTeachers(payload)
            if (res.code === -2) {
                setIsLoading(false)
                console.log('false data', res)
                Alert.alert(
                    `${I18n.t('Teachers')}`,
                    res?.message,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // navigation.navigate('Home')
                            },
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            } else {
                const data = res?.data?.data
                setIsLoading(false)
                setDataForTeachers([...dataForTeachers, ...data])
                console.log('getTeachers res for fetch', data)
                return data
            }
        } catch (err) {
            setIsLoading(false)
            console.log('err', err)
        }
    }
    const navigateTeachersProfile = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )

    const renderFooter = () => {
        return (
            <View
                style={{
                    marginBottom: heightp(60),
                }}
            >
                {isLoading ? (
                    <ActivityIndicator
                        color={colors.primary}
                        size="small"
                        style={{ marginLeft: 8 }}
                    />
                ) : null}
                {/* <View style={styles.footer}>
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
                                color={colors.primary}
                                size="small"
                                style={{ marginLeft: 8 }}
                            />
                        ) : null}
                    </Pressable>
                </View> */}
            </View>
        )
    }

    const onEndReached = useCallback(
        (distanceFromEnd) => {
            if (!onEndReachedCalledDuringMomentum) {
                // setTimeout(() => {
                fetchTeachers()
                // }, 3000)
                setOnEndReachedCalledDuringMomentum(true)
            }
        },
        [onEndReachedCalledDuringMomentum]
    )

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
                    ListFooterComponent={renderFooter}
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <>
                            <>{console.log('"yuuuuuuuuuu', item)}</>
                            <TeachersDetailCard
                                // subjectDetails
                                viewProfile={() =>
                                    navigateTeachersProfile(item)
                                }
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
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={20}
                    onEndReached={onEndReached}
                    onMomentumScrollBegin={() => {
                        setOnEndReachedCalledDuringMomentum(false)
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
