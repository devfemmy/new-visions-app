/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Pressable,
    ActivityIndicator,
    Text as RNText,
    Alert,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import I18n from 'i18n-js'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import { Container, Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'
import { getTeachers } from '../../redux/action'
import { getSubject } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import HomePageService from '../../services/userServices'
import colors from '../../helpers/colors'
import { AppContext } from '../../context/AppState'
import Global from '../../../Global'

const ResponseCache = {}
const Teachers = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const route = useRoute()
    const [isLoading, setIsLoading] = useState(false)
    // const [page, setPage] = useState(0)
    const { lang, onLogOut } = useContext(AppContext)
    const [dataForTeachers, setDataForTeachers] = useState([])

    // New use state
    const insets = useSafeAreaInsets()
    const [Page, setPage] = useState(1)
    const [PagePrev, setPagePrev] = useState(0)
    const [MaxPages, setMaxPages] = useState(999)
    const [SerachValue, setSerachValue] = useState('')
    const [CurrentSerachValue, setCurrentSerachValue] = useState('')
    const [LoadedPage, setLoadedPage] = useState(-1)
    const scrollRef = useRef()
    const [responseValue, SetresponseValue] = useState([])
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
        // getTeachers(page)
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
        ? responseValue?.filter((x) =>
              x.first_name.toLowerCase().includes(searchText.toLowerCase())
          )
        : responseValue

    const fetchTeachers = async () => {
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

    const GetTeachersNext = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
        if (LoadedPage === Page) setPage(Page + 1)
    }

    const GetTeachersPrev = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
        if (LoadedPage === Page) setPage(Page - 1)
    }

    const GetExtraCache = () => {
        let page = 0

        let keys = Object.keys(ResponseCache)
        keys = keys.filter((k) => {
            const jsonKey = JSON.parse(k)
            if (jsonKey.search === SerachValue) return true

            return false
        })

        keys = keys.map((key) => JSON.parse(key).page)

        if (keys.length !== 0) page = Math.max(...keys) + 1

        const payload = {
            search: SerachValue,
        }

        axios
            .post(
                `https://www.newvisions.sa/api/getTeachers?page=${page}`, // URL
                payload, // data
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 403) {
                    Global.AuthenticationToken = ''
                    Global.UserName = ''
                    Global.UserType = ''
                    Global.UserGender = ''
                    LoggedIn = false
                    alert('This Account is Logged in from another Device.')
                    onLogOut()
                    // return
                } else {
                    ResponseCache[
                        JSON.stringify({ page, search: SerachValue })
                    ] = response.data.data.data
                    // console.log(
                    //     `saved to cache :${JSON.stringify({
                    //         page,
                    //         search: SerachValue,
                    //     })}`
                    // )

                    // console.log(
                    //     'aaaaaaaaaaaa page number',
                    //     Page,
                    //     'aaaaaaaaaaaa payload',
                    //     payload
                    // )

                    // console.log(
                    //     'xxxxxxxxxxxxxxxxxxxx responseValue',
                    //     response.data.data.data
                    // )
                }
            })
            .catch((error) => {})
    }
    const SearchExtraCache = (text) => {
        setPage(1)
        let page = 0

        let keys = Object.keys(ResponseCache)
        keys = keys.filter((k) => {
            const jsonKey = JSON.parse(k)
            if (jsonKey.search === SerachValue) return true

            return false
        })

        keys = keys.map((key) => JSON.parse(key).page)

        if (keys.length !== 0) page = Math.max(...keys) + 1

        const payload = {
            search: text,
        }

        // console.log(`https://www.newvisions.sa/api/getTeachers?page=${1}`)

        axios
            .post(
                `https://www.newvisions.sa/api/getTeachers?page=${1}`, // URL
                payload, // data
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 403) {
                    Global.AuthenticationToken = ''
                    Global.UserName = ''
                    Global.UserType = ''
                    Global.UserGender = ''
                    LoggedIn = false
                    alert('This Account is Logged in from another Device.')
                    onLogOut()
                    // return
                } else {
                    ResponseCache[
                        JSON.stringify({ page, search: SerachValue })
                    ] = response.data.data.data

                    SetresponseValue(response.data?.data?.data)
                    // console.log(
                    //     `saved to cache :${JSON.stringify({
                    //         page,
                    //         search: SerachValue,
                    //     })}`
                    // )

                    // console.log(
                    //     'aaaaaaaaaaaa page number',
                    //     1,
                    //     'aaaaaaaaaaaa payload',
                    //     payload
                    // )

                    // console.log(
                    //     'xxxxxxxxxxxxxxxxxxxx responseValue',
                    //     response.data.data.data
                    // )
                }
            })
            .catch((error) => {})
    }
    useEffect(() => {
        if (Page <= 1) {
            setPagePrev(0)
        } else {
            setPagePrev(1)
        }
        if (Page == LoadedPage && SerachValue == CurrentSerachValue) {
            return
        }
        if (
            ResponseCache.hasOwnProperty(
                JSON.stringify({ page: Page, search: SerachValue })
            )
        ) {
            setLoadedPage(Page)
            SetresponseValue(
                ResponseCache[
                    JSON.stringify({ page: Page, search: SerachValue })
                ]
            )
            setCurrentSerachValue(SerachValue)

            // console.log(
            //     `loaded From Cache :${JSON.stringify({
            //         page: Page,
            //         search: SerachValue,
            //     })}`
            // )
            GetExtraCache()
            return
        }

        const payload = {
            search: SerachValue,
        }
        axios
            .post(
                `https://www.newvisions.sa/api/getTeachers?page=${Page}`, // URL
                payload, // data
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                    },
                }
            )
            .then((response) => {
                // if (response.data.code === 403) {
                //     Global.AuthenticationToken = ''
                //     Global.UserName = ''
                //     Global.UserType = ''
                //     Global.UserGender = ''
                //     LoggedIn = false
                //     alert('This Account is Logged in from another Device.')
                //     onLogOut()
                //     // return
                // } else {
                setLoadedPage(Page)
                setCurrentSerachValue(SerachValue)
                SetresponseValue(response.data?.data?.data || [])
                ResponseCache[
                    JSON.stringify({ page: Page, search: SerachValue })
                ] = response.data?.data?.data || []
                setMaxPages(Math.ceil(response.data.data.total / 10))
                GetExtraCache()
                // }
            })
            .catch((error) => {
                console.log('errrrrrorrrrr wey dey here', error)
                alert(error)
            })
    }, [])

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
        // <View
        //     style={{
        //         // paddingHorizontal: heightp(10),
        //     }}
        // >
        <View style={styles.containerFlex}>
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 15 }}>
                    <SearchBar
                        placeholder={I18n.t('SearchTeachers')}
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text)
                            setSerachValue(text)
                            SearchExtraCache(text)
                        }}
                        style={[styles.searchBar, { color: colors.dark }]}
                        inputStyle={{ color: colors.dark }}
                        iconColor={colors.dark}
                    />
                </View>
                <FlatList
                    nestedScrollEnabled={true}
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
                    // ListFooterComponent={renderFooter}
                    data={responseValue}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <>
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
                    // onEndReached={onEndReached}
                    onMomentumScrollBegin={() => {
                        setOnEndReachedCalledDuringMomentum(false)
                    }}
                />
            </ScrollView>
            <View
                style={{
                    flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: 10,
                    // marginBottom: heightp(10),
                }}
            >
                <TouchableOpacity
                    disabled={!PagePrev}
                    onPress={() => {
                        GetTeachersPrev()
                    }}
                >
                    <View
                        style={{
                            backgroundColor: PagePrev ? colors.primary : 'grey',
                            borderRadius: 5,
                            paddingHorizontal: 40,
                            paddingVertical: 8,
                        }}
                    >
                        <Text
                            text={I18n.t('Previous')}
                            style={{ color: 'white' }}
                        />
                    </View>
                </TouchableOpacity>
                <Text
                    text={` ${I18n.t('Page')} ${Page}`}
                    style={{ color: 'black' }}
                />

                <TouchableOpacity
                    disabled={Page === MaxPages}
                    onPress={() => {
                        GetTeachersNext()
                    }}
                >
                    <View
                        style={{
                            backgroundColor:
                                MaxPages === Page
                                    ? 'rgb(59,63,73)'
                                    : 'yellowgreen',
                            borderRadius: 5,
                            paddingHorizontal: 40,
                            paddingVertical: 8,
                        }}
                    >
                        <Text
                            text={I18n.t('Next')}
                            style={{ color: 'white' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        // </View>
    )
}
const styles = StyleSheet.create({
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        // marginBottom: heightp(20),
        flex: 1,
        paddingHorizontal: heightp(10),
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
