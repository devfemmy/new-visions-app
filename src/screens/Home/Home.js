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
    const [stagesArray, setStagesArray] = useState(null)
    const [teachersArray, setTeachersArray] = useState(null)
    const [videoId, setVideoId] = useState(null)

    const data = useAppSelector((state) => state.homePage)
    // const packagesArray = data?.homeData?.multi_packages
    // const stagesArray = data?.homeData?.stages
    // const teachersArray = data?.homeData?.teachers
    // const videoId = data?.homeData?.video
    // console.log('packages on home page', data)

    const [packages, setPackages] = useState([])
    //
    const [searchText, setSearchText] = useState('')
    const [sons, setSons] = useState([])
    const [loadingContent, setLoadingContent] = useState(false)
    //
    const [refreshing, setRefreshing] = useState(false)
    //
    const [vidId, setVidId] = useState('')
    //
    function getPackages(params) {
        axios
            .post('https://newvisions.sa/api/getPackages', {})
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

    const homePage = async () => {
        showLoadingSpinner(true)
        try {
            const res = await HomePageService.homePage()
            const data = res?.data
            if (res.code === 200) {
                showLoadingSpinner(false)
                setPackagesArray(data?.multi_packages)
                setStagesArray(data?.stages)
                setTeachersArray(data?.teachers)
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
            .post('https://newvisions.sa/api/getUserChildren', {})
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
            getData()
            // dispatch(getHomePage())
            homePage()
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
            getChildren()
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
        console.log('data in the async storage', session)
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

    return (
        <ScrollView
            contentContainerStyle={[styles.container, globalStyles.container]}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={globalStyles.rowBetween}>
                <Text
                    style={styles.headerText}
                    fontSize={heightp(21)}
                    text={`${i18n.t('HelloUsername')} ${
                        user ? user?.first_name : ''
                    }`}
                />
            </View>
            <View style={[styles.containerFlex]}>
                <Vimeo
                    videoId={vidId}
                    params={'api=1&autoplay=0'}
                    handlers={videoCallbacks}
                    style={{
                        height: WINDOW_HEIGHT * 0.275,
                        borderRadius: 14,
                    }}
                />
            </View>

            {(Global.UserType == 3 || Global.UserType == 4) && (
                <View style={styles.newWrapper}>
                    <HeaderTitle
                        deleteIcon
                        pressed={() => navigation.navigate('Subjects')}
                        text={i18n.t('EducationalLevelNew')}
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
                            data={stagesArray}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item }) => {
                                const uri = `${IMAGEURL2}${item.image}`
                                return (
                                    // <StageCard
                                    //     eduPress={() =>
                                    //         navigation.navigate(
                                    //             'EducationalStage',
                                    //             {
                                    //                 stage_id: item?.id,
                                    //             }
                                    //         )
                                    //     }
                                    //     newPress={() => {}}
                                    //     uri={uri}
                                    //     text={item.name}
                                    // />
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate(
                                                'EducationalStage',
                                                {
                                                    stage_id: item?.id,
                                                }
                                            )
                                        }}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: heightp(15),
                                        }}
                                    >
                                        <View
                                            style={{
                                                minHeight: heightp(60),
                                                backgroundColor: colors.primary,
                                                borderRadius: 32,
                                                width: widthp(95),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingHorizontal: heightp(10),
                                            }}
                                        >
                                            <FastImage
                                                style={{
                                                    width: heightp(50),
                                                    height: heightp(40),
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
                                        </View>
                                        <Text
                                            style={{
                                                color: 'rgba(32, 32, 32, 1)',
                                                fontWeight: '500',
                                                paddingTop: 5,
                                            }}
                                            text={item.name}
                                            fontSize={heightp(13)}
                                        />
                                    </Pressable>
                                )
                            }}
                        />
                    </View>
                    {/* <View style={globalStyles.horizontal} /> */}
                </View>
            )}

            <View style={[styles.newWrapper, globalStyles.rowBetween]}>
                {(Global.UserType == 3 || Global.UserType == 4) && (
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
                )}
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
                {(Global.UserType == 3 || Global.UserType == 4) && (
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
                )}
            </View>
            {/* <View style={globalStyles.horizontal} /> */}

            <View style={styles.newWrapper}>
                <HeaderTitle
                    pressed={() => navigation.navigate('MultiPackagesStage')}
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
                                            width: heightp(210),
                                            height: heightp(130),
                                            borderRadius: 10,
                                            marginRight: heightp(20),
                                        }}
                                        source={{
                                            uri,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </Pressable>
                            )
                        }}
                    />
                </View>
            </View>

            {/* <View style={globalStyles.horizontal} /> */}

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
                                            item?.rate === 0 ? null : item?.rate
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
            {/* {(Global.UserType == 3 || Global.UserType == 4) && (
                <>
                    <View
                        style={[
                            styles.containerFlex,
                            {
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: heightp(20),
                                marginBottom: heightp(20),
                            },
                        ]}
                    >
                        <Pressable
                            onPress={() => {
                                navigation.navigate('FazaPackagesStage')
                            }}
                            style={styles.fazaQuizzesContainer}
                        >
                            <Text
                                style={styles.textColor}
                                text={`${i18n.t('FAZA')}`}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('AllMeasurementStage')
                            }}
                            style={styles.fazaQuizzesContainer}
                        >
                            <Text
                                style={styles.textColor}
                                text={`${i18n.t('Quizzes')}`}
                            />
                        </Pressable>
                    </View>
                    <View style={globalStyles.horizontal} />
                </>
            )} */}
            {/* <View style={styles.containerFlex}>
                <Pressable
                    onPress={() => navigation.navigate('PackagesStage')}
                    style={{
                        marginTop: heightp(20),
                    }}
                >
                    <FastImage
                        style={{
                            width: '100%',
                            height: heightp(180),
                            borderRadius: 10,
                        }}
                        source={{
                            uri: defaultUri,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </Pressable>
            </View>
            <View style={globalStyles.horizontal} /> */}

            {/* <View style={styles.containerFlex}>
                <Pressable
                    onPress={() => navigation.navigate('FreeLessons')}
                    style={{
                        marginTop: heightp(20),
                    }}
                >
                    <FastImage
                        style={{
                            width: '100%',
                            height: heightp(180),
                            borderRadius: 10,
                        }}
                        source={
                            lang === 'ar' ? freeLessonsUriAr : freeLessonsUri
                        }
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </Pressable>
            </View>
            <View style={styles.containerFlex}>
                <Pressable
                    onPress={() => navigation.navigate('StudentGuide')}
                    style={{
                        marginTop: heightp(20),
                    }}
                >
                    <FastImage
                        style={{
                            width: '100%',
                            height: heightp(180),
                            borderRadius: 10,
                        }}
                        source={lang === 'ar' ? guideUriAr : guideUri}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </Pressable>
            </View>
            <View style={globalStyles.horizontal} /> */}
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
})

export default Home
