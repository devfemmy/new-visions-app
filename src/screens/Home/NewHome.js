import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text as RNText,
    RefreshControl,
    Dimensions,
} from 'react-native'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchBar from 'react-native-platform-searchbar'
import Toast from 'react-native-toast-message'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Container, Text } from '../../components/common'
import { globalStyles } from '../../helpers/globalStyles'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getHomePage } from '../../redux/action'
import { heightp, widthp } from '../../utils/responsiveDesign'
import HeaderTitle from '../../components/common/HeaderTitle'
import StageCard from '../../components/StageCard'
import TeachersCard from '../../components/TeachersCard'
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions'
import HomePageService from '../../services/userServices'
import Global from '../../../Global'
import { AppContext } from '../../context/AppState'
import axios from 'axios'
import colors from '../../helpers/colors'
import SonListItem from '../Parent/SonListItem'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/common'
import { Vimeo } from 'react-native-vimeo-iframe'
const defaultUri =
    'https://firebasestorage.googleapis.com/v0/b/newvisions-9f9ef.appspot.com/o/HOME_BG_NEW.jpg?alt=media&token=0c48db74-5d80-4fb3-a43b-fea209a57225'
const freeLessonsUri = require('../../assets/img/freeLessons.png')
const guideUri = require('../../assets/img/guide.png')
const freeLessonsUriAr = require('../../assets/img/free-ar.png')
const guideUriAr = require('../../assets/img/guide-ar.png')

let session: ''
const { width, height } = Dimensions.get('window')
const Home = () => {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin, user } =
        useContext(AppContext)
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [packagesArray, setPackagesArray] = useState(null)
    const [stagesArray, setStagesArray] = useState([])
    const [teachersArray, setTeachersArray] = useState(null)
    const [subjectsArray, setSubjectsArray] = useState(null)
    const [videoId, setVideoId] = useState(null)
    //
    const [filterModal, setFilterModal] = useState(false)
    const [filterOption, setFilterOption] = useState({})
    //
    const colors_ = ['#9BBA52', '#F37529', '#59A7F2', '#917CFF']

    const bg_colors_ = ['#C9EB7AC7', '#FFC59B8A', '#D3E9FF', '#917CFF88']

    const data = useAppSelector((state) => state.homePage)
    // console.log('=============> user in the home page', user)

    const [packages, setPackages] = useState([])
    //
    const [searchText, setSearchText] = useState('')
    const [sons, setSons] = useState([])
    const [loadingContent, setLoadingContent] = useState(false)
    //
    const [refreshing, setRefreshing] = useState(false)
    //
    const [vidId, setVidId] = useState('')
    console.log('stagesArray', filterOption)
    //
    function getPackages(params) {
        axios
            .post('https://mo.visionsplus.net/api/getPackages', {})
            .then((response) => {
                console.log('success message xxxxx', response.data)
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response?.data?.code == 200) {
                        const data = response?.data?.data?.data
                        // console.log('multi Packages: ' + data)
                        setPackages(data)
                        showLoadingSpinner(false)
                        console.log(packages)
                    } else if (response?.data?.code == 403) {
                        // console.log('account is logged in another device')
                        onLogout()
                        showLoadingSpinner(false)
                    } else if (response?.data?.code == 407) {
                        onLogout()
                        console.log('response 3')
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        console.log('response 1')
                        // alert(response.data.message)
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                console.log('response 2', error)
                // alert(error)
            })
    }

    const homePage = async (stage_id) => {
        showLoadingSpinner(true)
        const payload = {
            stage_id: stage_id,
        }
        console.log('payload', payload)
        try {
            const res = await HomePageService.homePage(payload)
            const data = res?.data
            if (res.code === 200) {
                showLoadingSpinner(false)
                setPackagesArray(data?.multi_packages)
                // setStagesArray(data?.stages)
                setTeachersArray(data?.teachers)
                setSubjectsArray(data?.subjects)
                const id = parseInt(data?.video.replace(/[^0-9]/g, ''))
                setVidId(id)
                // setVideoId(data?.video)
                console.log('================================>', data)
            } else {
                // console.log('account is logged in another device')
                onLogout()
                // return
            }
            return res
        } catch (err) {
            showLoadingSpinner(false)
        }
    }

    const getStages = async () => {
        // showLoadingSpinner(true)
        try {
            const res = await HomePageService.getStages()
            const data = res?.data
            if (res.code === 200) {
                showLoadingSpinner(false)
                // console.log('data fetched here in get stages', data)
                setStagesArray(data)
                let defaultStage = data.map((item) => {
                    if (item?.id === user?.stage_id) {
                        setFilterOption(item)
                        return item
                    } else {
                        return null
                    }
                })
            } else {
                showLoadingSpinner(false)
                // console.log('account is logged in another device')
            }
            return res
        } catch (err) {
            showLoadingSpinner(false)
        }
    }

    const navigateTeacherProfile = useCallback(
        (item) => {
            console.log('item wey dey here', item)
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )

    const getChildren = (value) => {
        //showLoadingSpinner(true);
        axios
            .post('https://mo.visionsplus.net/api/getUserChildren', {})
            .then((response) => {
                // console.log('home response', response.data)
                //alert(response.data.code);
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data
                        setSons(data)
                        setLoadingContent(false)
                    } else if (response.data.code == 403) {
                        // console.log('account is logged in another device')
                        onLogout()
                    } else {
                        showLoadingSpinner(false)
                        Toast.show({
                            text1: response.data.message,
                            type: 'error',
                            style: { color: colors.dark },
                        })
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                // alert(error)
            })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStages()
            getData()
            // dispatch(getHomePage())
            homePage(user?.stage_id)
            getPackages()
            // const id = parseInt(videoId?.replace(/[^0-9]/g, ''))
            // setVideoId(id)
            // Send Notification Token

            async function postNotificationToken() {
                const fcmtoken = await AsyncStorage.getItem('fcmtoken')
                const payload = {
                    token: fcmtoken,
                }
                try {
                    const res = await HomePageService.postNotificationData(
                        payload
                    )
                    return res
                } catch (err) {
                    console.log(err, 'error')
                }
            }
            postNotificationToken()
            // getChildren()
        })
        return unsubscribe
    }, [navigation, dispatch])

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         const id = parseInt(videoId?.replace(/[^0-9]/g, ''))
    //         setVideoId(id)
    //         console.log('the video id is this hrre ====>', id)
    //     })
    //     return unsubscribe
    // }, [navigation, videoId])

    const getData = async () => {
        const dataFromAsync = await AsyncStorage.getItem('user')
        session = JSON.parse(dataFromAsync)
        // console.log('data in the async storage', session)
    }

    function SubscriptionsClicked(item) {
        navigation.navigate('Subscriptions', { id: item })
    }

    function AttendanceClicked(item) {
        navigation.navigate('Attendance', { id: item, userStatus: 'Parent' })
    }

    const renderItem = ({ item }) => (
        <SonListItem
            name={item.name}
            status={item.status}
            subClick={() => {
                SubscriptionsClicked(item.user_id)
                console.log('Subscriptions', item)
            }}
            attendanceClick={() => {
                AttendanceClicked(item.user_id)
            }}
        />
    )

    const searchFilteredData = searchText
        ? sons?.filter((x) =>
              x?.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : sons

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await dispatch(getHomePage())
        console.log('response', res?.payload)
        if (res?.payload?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    const videoCallbacks = {
        timeupdate: (data) => console.log('timeupdate: ', data),
        play: (data) => console.log('play: ', data),
        pause: (data) => console.log('pause: ', data),
        fullscreenchange: (data) => console.log('fullscreenchange: ', data),
        ended: (data) => console.log('ended: ', data),
        controlschange: (data) => console.log('controlschange: ', data),
    }

    const navigateHomeSubject = useCallback(
        (item) => {
            navigation.navigate('HomeSubject', {
                item,
                title: `${item?.title}`,
            })
        },
        [navigation]
    )

    return (
        <ScrollView
            contentContainerStyle={[styles.container, globalStyles.container]}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View
                style={[
                    globalStyles.rowBetween,
                    {
                        flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                    },
                ]}
            >
                <Text
                    style={styles.headerText}
                    fontSize={heightp(21)}
                    text={`${i18n.t('HelloUsername')} ${
                        user ? user?.first_name : ''
                    }`}
                />
                <Pressable
                    onPress={() => setFilterModal(!filterModal)}
                    style={[
                        globalStyles.rowBetween,
                        {
                            backgroundColor: '#FAFAFA',
                            paddingHorizontal: widthp(5),
                            borderRadius: 15,
                        },
                    ]}
                >
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={'#000'}
                    />
                    <Text
                        onPress={() => {
                            // pressed
                            setFilterModal(!filterModal)
                        }}
                        style={styles.text}
                        fontSize={heightp(13)}
                        text={`${
                            stagesArray.length > 0 ? filterOption?.name : ''
                        }`}
                    />
                </Pressable>
            </View>
            {/* // filter options */}
            <View style={styles.filterUpperContainer}>
                <View>
                    {filterModal && (
                        <View
                            style={[
                                styles.filterShadow,
                                {
                                    left: lang === 'ar' ? 0 : 200,
                                    right: lang === 'ar' ? 200 : 0,
                                },
                            ]}
                        >
                            {stagesArray?.map((item) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            setFilterOption(item)
                                            setFilterModal(!filterModal)
                                        }}
                                        style={[
                                            styles.filterOptions,
                                            {
                                                flexDirection:
                                                    lang === 'ar'
                                                        ? 'row-reverse'
                                                        : 'row',
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={styles.text}
                                            fontSize={heightp(12)}
                                            text={`${item?.name}`}
                                        />
                                        <MaterialCommunityIcons
                                            name="chevron-down"
                                            size={20}
                                            color={'#000'}
                                            style={{
                                                transform: [
                                                    {
                                                        rotate:
                                                            lang === 'ar'
                                                                ? '90deg'
                                                                : '270deg',
                                                    },
                                                ],
                                            }}
                                        />
                                    </Pressable>
                                )
                            })}
                        </View>
                    )}
                </View>
            </View>
            {filterOption?.name === i18n.t('FirstPrimary') ? (
                <>
                    <View
                        style={[
                            styles.containerFlex,
                            {
                                marginVertical: heightp(2.5),
                                // backgroundColor: '#f0f',
                            },
                        ]}
                    >
                        <FastImage
                            style={{
                                height: WINDOW_HEIGHT * 0.2,
                                borderRadius: 14,
                                // width: heightp(210),
                            }}
                            source={require('../../assets/img/home_page_primary_img.png')}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>

                    <View style={styles.newWrapper}>
                        <HeaderTitle
                            pressed={() => {
                                // navigation.navigate('MultiPackagesStage')
                            }}
                            text={i18n.t('Subjects')}
                        />
                        <View style={styles.containerFlex}>
                            <FlatList
                                horizontal
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.flatlistContent}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text text={i18n.t('NoData')} />
                                    </View>
                                )}
                                data={subjectsArray}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item, index }) => {
                                    const uri = `${IMAGEURL}/${item.image}`

                                    return (
                                        <Pressable
                                            onPress={() => {
                                                // navigateHomeSubject(item)
                                            }}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: heightp(100),
                                                height: heightp(130),
                                                borderRadius: 10,
                                                marginRight: heightp(20),
                                                // padding: heightp(15),
                                                backgroundColor:
                                                    bg_colors_[
                                                        index %
                                                            bg_colors_.length
                                                    ],
                                            }}
                                        >
                                            <FastImage
                                                style={{
                                                    width: heightp(60),
                                                    height: heightp(60),
                                                    borderRadius: 10,
                                                    // marginRight: heightp(20),
                                                }}
                                                source={{
                                                    uri,
                                                    priority:
                                                        FastImage.priority
                                                            .normal,
                                                }}
                                                resizeMode={
                                                    FastImage.resizeMode.cover
                                                }
                                            />
                                            <Text
                                                style={{
                                                    color: colors_[
                                                        index % colors_.length
                                                    ],
                                                    fontWeight: '900',
                                                    paddingTop: 2.5,
                                                    textAlign: 'center',
                                                }}
                                                text={`${item?.title}`}
                                                fontSize={heightp(10.5)}
                                            />
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.newWrapper}>
                        <HeaderTitle
                            pressed={() =>
                                navigation.navigate('MultiPackagesStage')
                            }
                            text={i18n.t('MultiPackages')}
                        />
                        <View style={styles.containerFlex}>
                            <FlatList
                                // horizontal
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.flatlistContent}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text text={i18n.t('NoData')} />
                                    </View>
                                )}
                                data={packagesArray}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item, index }) => {
                                    const uri = `${IMAGEURL}/${item.image}`

                                    return (
                                        <Pressable
                                            onPress={() =>
                                                navigation.navigate(
                                                    'MultiPackageDetails',
                                                    {
                                                        item,
                                                        packageType: 'multi',
                                                    }
                                                )
                                            }
                                            style={{
                                                // width: heightp(210),
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                height: WINDOW_HEIGHT * 0.18,
                                                borderRadius: 10,
                                                marginVertical: heightp(10),
                                                paddingHorizontal: widthp(10),
                                                paddingVertical: heightp(15),
                                                backgroundColor:
                                                    bg_colors_[
                                                        index %
                                                            bg_colors_.length
                                                    ],
                                            }}
                                        >
                                            <FastImage
                                                style={{
                                                    width: heightp(60),
                                                    height: heightp(70),
                                                    borderRadius: 10,
                                                }}
                                                source={{
                                                    uri,
                                                    priority:
                                                        FastImage.priority
                                                            .normal,
                                                }}
                                                resizeMode={
                                                    FastImage.resizeMode.cover
                                                }
                                            />
                                            <View
                                                style={{
                                                    width: '75%',
                                                    height: '100%',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    justifyContent:
                                                        'space-between',
                                                    paddingHorizontal:
                                                        widthp(5),
                                                    paddingVertical: heightp(2),
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'rgba(67, 72, 84, 1)',
                                                        fontWeight: '500',
                                                        paddingTop: 5,
                                                        textAlign:
                                                            lang !== 'ar'
                                                                ? 'left'
                                                                : 'right',
                                                    }}
                                                    text={`${item?.title}`}
                                                    fontSize={heightp(14)}
                                                />
                                                <Text
                                                    style={{
                                                        color: 'rgba(67, 72, 84, 1)',
                                                        fontWeight: '500',
                                                        paddingTop: 5,
                                                        textAlign: 'center',
                                                    }}
                                                    text={`${i18n.t(
                                                        'FirstPrimary'
                                                    )}`}
                                                    fontSize={heightp(11)}
                                                />
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                        backgroundColor:
                                                            'rgba(231, 243, 255, 1)',
                                                        paddingHorizontal:
                                                            widthp(10),
                                                        paddingVertical:
                                                            heightp(2.5),
                                                        borderRadius: 20,
                                                        alignSelf: 'flex-end',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: colors_[
                                                                index %
                                                                    colors_.length
                                                            ],
                                                            fontWeight: '500',
                                                            textAlign: 'center',
                                                            paddingHorizontal:
                                                                widthp(2.5),
                                                        }}
                                                        text={`${
                                                            item?.price
                                                        } ${i18n.t('SR')}`}
                                                        fontSize={heightp(11)}
                                                    />
                                                    <MaterialCommunityIcons
                                                        name={'tag'}
                                                        size={15}
                                                        color={
                                                            colors_[
                                                                index %
                                                                    colors_.length
                                                            ]
                                                        }
                                                    />
                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <View
                        style={[
                            styles.containerFlex,
                            {
                                marginVertical: heightp(2.5),
                                // backgroundColor: '#f0f',
                            },
                        ]}
                    >
                        <Vimeo
                            videoId={vidId}
                            params={'api=1&autoplay=0'}
                            handlers={videoCallbacks}
                            style={{
                                height: WINDOW_HEIGHT * 0.25,
                                borderRadius: 14,
                                // color: '#ff0',
                                // backgroundColor: '#ff0',
                            }}
                        />
                    </View>

                    <View style={styles.newWrapper}>
                        <HeaderTitle
                            pressed={() => {
                                // navigation.navigate('MultiPackagesStage')
                            }}
                            text={i18n.t('Subjects')}
                        />
                        <View style={styles.containerFlex}>
                            <FlatList
                                horizontal
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.flatlistContent}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text text={i18n.t('NoData')} />
                                    </View>
                                )}
                                data={subjectsArray}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item }) => {
                                    // console.log('renderItem', item)
                                    const uri = `${IMAGEURL}/${item.image}`
                                    // navigation.navigate("MultiPackageDetails", item);
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                // navigateHomeSubject(item)
                                            }}
                                        >
                                            <FastImage
                                                style={{
                                                    width: heightp(200),
                                                    height: heightp(100),
                                                    borderRadius: 10,
                                                    marginRight: heightp(20),
                                                }}
                                                source={{
                                                    uri,
                                                    priority:
                                                        FastImage.priority
                                                            .normal,
                                                }}
                                                resizeMode={
                                                    FastImage.resizeMode.cover
                                                }
                                            />
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.newWrapper}>
                        <HeaderTitle
                            pressed={() =>
                                navigation.navigate('MultiPackagesStage')
                            }
                            text={i18n.t('MultiPackages')}
                        />
                        <View style={styles.containerFlex}>
                            <FlatList
                                horizontal
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.flatlistContent}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text text={i18n.t('NoData')} />
                                    </View>
                                )}
                                data={packagesArray}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item }) => {
                                    // console.log('renderItem', item)
                                    const uri = `${IMAGEURL}/${item.image}`
                                    // navigation.navigate("MultiPackageDetails", item);
                                    return (
                                        <Pressable
                                            onPress={() =>
                                                navigation.navigate(
                                                    'MultiPackageDetails',
                                                    {
                                                        item,
                                                        packageType: 'multi',
                                                    }
                                                )
                                            }
                                        >
                                            <FastImage
                                                style={{
                                                    width: heightp(200),
                                                    height: heightp(100),
                                                    borderRadius: 10,
                                                    marginRight: heightp(20),
                                                }}
                                                source={{
                                                    uri,
                                                    priority:
                                                        FastImage.priority
                                                            .normal,
                                                }}
                                                resizeMode={
                                                    FastImage.resizeMode.cover
                                                }
                                            />
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    <View
                        style={[
                            styles.newWrapper,
                            globalStyles.rowBetween,
                            {
                                marginVertical: heightp(7.5),
                            },
                        ]}
                    >
                        <Pressable
                            onPress={() => {
                                navigation.navigate('AllMeasurementStage')
                            }}
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <FastImage
                                style={{
                                    width: heightp(75),
                                    height: heightp(75),
                                }}
                                source={require('../../assets/img/quizzes_new.png')}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text
                                style={{
                                    color: 'rgba(32, 32, 32, 1)',
                                    fontWeight: '500',
                                    paddingTop: 5,
                                }}
                                text={`${i18n.t('Quizzes')}`}
                                fontSize={heightp(11)}
                            />
                        </Pressable>
                        {/* )} */}
                        <Pressable
                            onPress={() => navigation.navigate('StudentGuide')}
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <FastImage
                                style={{
                                    width: heightp(75),
                                    height: heightp(75),
                                }}
                                source={require('../../assets/img/studentGuide_new.png')}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text
                                style={{
                                    color: 'rgba(32, 32, 32, 1)',
                                    fontWeight: '500',
                                    paddingTop: 5,
                                }}
                                text={`${i18n.t('StudentGuide')}`} // study guide
                                fontSize={heightp(11)}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate('FreeLessons')}
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <FastImage
                                style={{
                                    width: heightp(75),
                                    height: heightp(75),
                                }}
                                source={require('../../assets/img/freeLessons_new.png')}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text
                                style={{
                                    color: 'rgba(32, 32, 32, 1)',
                                    fontWeight: '500',
                                    paddingTop: 5,
                                }}
                                text={`${i18n.t('FreeLessons')}`} //free lessons
                                fontSize={heightp(11)}
                            />
                        </Pressable>
                        {/* {(Global.UserType == 3 || Global.UserType == 4) && ( */}
                        <Pressable
                            onPress={() => {
                                navigation.navigate('FazaPackagesStage')
                            }}
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <FastImage
                                style={{
                                    width: heightp(75),
                                    height: heightp(75),
                                }}
                                source={require('../../assets/img/faza_new.png')}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text
                                style={{
                                    color: 'rgba(32, 32, 32, 1)',
                                    fontWeight: '500',
                                    paddingTop: 5,
                                }}
                                text={`${i18n.t('FAZA')}`}
                                fontSize={heightp(11)}
                            />
                        </Pressable>
                        {/* )} */}
                    </View>

                    {session?.type == 3 ? (
                        <View style={styles.newWrapper}>
                            <HeaderTitle
                                pressed={() => navigation.navigate('Teachers')}
                                text={i18n.t('Teachers')}
                            />
                            <View style={styles.containerFlex}>
                                <FlatList
                                    horizontal
                                    keyboardShouldPersistTaps="handled"
                                    contentContainerStyle={
                                        styles.flatlistContent
                                    }
                                    ListEmptyComponent={() => (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text text={i18n.t('NoData')} />
                                        </View>
                                    )}
                                    data={teachersArray}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    onEndReachedThreshold={0.5}
                                    renderItem={({ item }) => {
                                        // console.log('renderItem', item)
                                        const uri = `${IMAGEURL}/${item.image}`
                                        return (
                                            <TeachersCard
                                                pressed={() =>
                                                    navigateTeacherProfile(item)
                                                }
                                                uri={uri}
                                                ratings={
                                                    item?.rate === 0
                                                        ? null
                                                        : item?.rate
                                                }
                                                lastName={item.last_name}
                                                text={item.first_name}
                                                image={item.image}
                                            />
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    ) : (
                        <>
                            {/* <SearchBar
                        placeholder={i18n.t('Search')}
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        style={[
                            globalStyles.searchBar,
                            {
                                marginTop: heightp(20),
                                marginBottom: heightp(10),
                            },
                        ]}
                        inputStyle={{ color: colors.dark }}
                        iconColor={colors.dark}
                    /> */}
                            {/* <TouchableWithoutFeedback
                        onPress={() => {
                            // setToggle1(!toggle1)
                        }}
                    >
                        <View style={styles.subItem}>
                            <Ionicons
                                name="ios-albums"
                                size={35}
                                color={colors.white}
                            />
                            <RNText style={styles.subItemText}>
                                {i18n.t('Subscriptions')}
                            </RNText>
                            <FontAwesome
                                name={
                                    lang === 'ar'
                                        ? 'arrow-circle-left'
                                        : 'arrow-circle-right'
                                }
                                color={colors.white}
                                size={35}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            // setToggle1(!toggle1)
                        }}
                    >
                        <View style={styles.subItem}>
                            <Ionicons
                                name="ios-grid"
                                size={35}
                                color={colors.white}
                            />
                            <RNText style={styles.subItemText}>
                                {i18n.t('Attendance')}
                            </RNText>
                            <FontAwesome
                                name={
                                    lang === 'ar'
                                        ? 'arrow-circle-left'
                                        : 'arrow-circle-right'
                                }
                                color={colors.white}
                                size={35}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            // setToggle1(!toggle1)
                        }}
                    >
                        <View style={styles.subItem}>
                            <Ionicons
                                name="ribbon-outline"
                                size={35}
                                color={colors.white}
                            />
                            <RNText style={styles.subItemText}>
                                {i18n.t('MeasurementTestResult')}
                            </RNText>
                            <FontAwesome
                                name={
                                    lang === 'ar'
                                        ? 'arrow-circle-left'
                                        : 'arrow-circle-right'
                                }
                                color={colors.white}
                                size={35}
                            />
                        </View>
                    </TouchableWithoutFeedback> */}
                            {loadingContent ? (
                                <ContentLoader
                                    viewBox="0 0 380 70"
                                    backgroundColor={colors.darkGray}
                                    foregroundColor={colors.gray}
                                    height={100}
                                    speed={1}
                                >
                                    {i18n.locale === 'ar' ? (
                                        <>
                                            <Rect
                                                x="300"
                                                y="0"
                                                rx="4"
                                                ry="4"
                                                width="70"
                                                height="70"
                                            />
                                            <Rect
                                                x="80"
                                                y="17"
                                                rx="4"
                                                ry="4"
                                                width="200"
                                                height="13"
                                            />
                                            <Rect
                                                x="80"
                                                y="40"
                                                rx="3"
                                                ry="3"
                                                width="200"
                                                height="10"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Rect
                                                x="0"
                                                y="0"
                                                rx="4"
                                                ry="4"
                                                width="70"
                                                height="70"
                                            />
                                            <Rect
                                                x="80"
                                                y="17"
                                                rx="4"
                                                ry="4"
                                                width="200"
                                                height="13"
                                            />
                                            <Rect
                                                x="80"
                                                y="40"
                                                rx="3"
                                                ry="3"
                                                width="150"
                                                height="10"
                                            />
                                        </>
                                    )}
                                </ContentLoader>
                            ) : (
                                <>
                                    {/* <View style={globalStyles.horizontalMargin} /> */}
                                    <FlatList
                                        data={searchFilteredData}
                                        extraData={searchFilteredData}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        scrollEnabled={true}
                                    />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    flatlistContent: {
        // flexGrow: 1,
    },
    containerFlex: {
        // marginBottom: heightp(20),
    },
    subItem: {
        backgroundColor: colors.primary,
        height: 90,
        width: '100%',
        marginTop: 15,
        marginBottom: 5,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    subItemText: {
        color: colors.white,
        fontSize: 19,
        fontWeight: '700',
        fontFamily: 'Cairo',
    },
    fazaQuizzesContainer: {
        minHeight: heightp(110),
        backgroundColor: colors.primary,
        borderRadius: 8,
        width: width * 0.42,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: heightp(10),
        // marginTop: 0,
    },
    textColor: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerText: {
        fontWeight: 'bold',
    },
    newWrapper: {
        backgroundColor: '#rgba(250, 250, 250, 1)',
        paddingHorizontal: 15,
        paddingVertical: heightp(10),
        borderRadius: 18,
        marginVertical: heightp(5),
    },
    //
    filterUpperContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 30,
        zIndex: 999,
    },
    filterShadow: {
        // top: -30,
        width: width * 0.4,
        paddingHorizontal: widthp(20),
        paddingVertical: heightp(10),

        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

export default Home
