/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native'
import I18n from 'i18n-js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Container, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import { AppContext } from '../../context/AppState'
import colors from '../../helpers/colors'
import { WINDOW_HEIGHT } from '../../helpers/common'
import { globalStyles } from '../../helpers/globalStyles'
import { getSubjectLevels } from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import HomePageService from '../../services/userServices'
import { IMAGEURL } from '../../utils/functions'
import { heightp, widthp } from '../../utils/responsiveDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NewLoader from '../../components/NewLoader'

const HomeSubject = () => {
    const route = useRoute()
    const { lang, loadingSpinner, showLoadingSpinner, onLogout } =
        useContext(AppContext)
    // const { setDisabledProps } = useContext(SubContext);
    const [levelDatas, setLevelDatas] = useState(null)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { item } = route.params
    const uri = `${IMAGEURL}/${item.image}`
    const navigation = useNavigation()
    const { levelData } = useAppSelector((state) => state.levelPage)
    let stagesArray
    if (lang === 'ar') {
        stagesArray = ['مدرسة إبتدائية', 'المدرسة المتوسطة', 'تَعْليم ثانَويّ']
    } else {
        stagesArray = ['Primary School', 'Middle School', 'Secondary School']
    }

    const getSubjectLevels = async () => {
        setLoading(true)
        const payload = {
            stage_id: '',
        }
        try {
            const res = await HomePageService.getLevels(payload)
            const data = res?.data
            if (res.code === 200) {
                setLoading(false)
                setLevelDatas(data)
                // console.log('wwwwwwwwww data zooooooooooooooom', data)
            } else {
                console.log('account is logged in another device')
                onLogout()
                // return
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
            // getSubjectLevels()
        })
        return unsubscribe
    }, [item, dispatch])

    const navigateSubjects = useCallback(
        (item) => {
            if (activeStage)
                navigation.navigate('FazaReviewCourses', {
                    level: activeStage?.id,
                    levelSubject: item?.name,
                })
        },
        [activeStage, navigation]
    )

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getSubjectLevels()
        console.log('response', res)
        if (res?.code === 200) {
            setRefreshing(false)
        }
    }, [])
    if (loading){
        return(
            <NewLoader />
        )
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    globalStyles.wrapper,
                ]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <FastImage
                    style={{
                        height: WINDOW_HEIGHT * 0.2,
                        borderRadius: 14,
                        // width: heightp(210),
                    }}
                    source={{
                        uri,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <View
                    style={[
                        globalStyles.rowBetween,
                        {
                            alignSelf: 'flex-end',
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                            paddingHorizontal: widthp(5),
                            borderRadius: 15,
                            marginTop: heightp(5),
                        },
                    ]}
                >
                    <MaterialCommunityIcons
                        name="clock-time-three"
                        size={20}
                        color={'rgba(155, 186, 82, 1)'}
                    />
                    <Text
                        style={styles.subItemText}
                        fontSize={heightp(13)}
                        text={`${item?.id} ${I18n.t('Hours')}`}
                    />
                </View>
                <View style={globalStyles.horizontalMargin} />
                <View>
                    <Pressable
                        style={{
                            backgroundColor: 'rgba(155, 186, 82, 1)',
                            borderRadius: 10,
                            paddingHorizontal: widthp(12.5),
                            paddingVertical: heightp(10),
                        }}
                    >
                        <View style={globalStyles.rowBetween}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRightColor: '#fff',
                                    borderRightWidth: 1,
                                    paddingHorizontal: widthp(10),
                                }}
                            >
                                <FastImage
                                    style={{
                                        height: heightp(60),
                                        width: heightp(60),
                                        borderRadius: heightp(60 / 2),
                                        // width: heightp(210),
                                    }}
                                    source={{
                                        uri,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text
                                    style={[
                                        styles.subItemText,
                                        {
                                            color: '#fff',
                                        },
                                    ]}
                                    fontSize={heightp(13)}
                                    text={`${item?.id} ${I18n.t('Hours')}`}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    width: '68%',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: heightp(2.5),
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff',
                                            borderRadius: 20,
                                            padding: 5,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="clock-time-three"
                                            size={20}
                                            color={'rgba(155, 186, 82, 1)'}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.subItemText,
                                            {
                                                color: '#fff',
                                                fontSize: 16,
                                                fontWeight: '500',
                                            },
                                        ]}
                                        fontSize={heightp(18)}
                                        text={`${item?.id} ${I18n.t('Hours')}`}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: heightp(2.5),
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff',
                                            borderRadius: 20,
                                            padding: 5,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="calendar-blank"
                                            size={20}
                                            color={'rgba(155, 186, 82, 1)'}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.subItemText,
                                            {
                                                color: '#fff',
                                                fontSize: 16,
                                                fontWeight: '500',
                                            },
                                        ]}
                                        fontSize={heightp(13)}
                                        text={`${item?.id} ${I18n.t('Hours')}`}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: heightp(2.5),
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff',
                                            borderRadius: 20,
                                            padding: 5,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="star"
                                            size={20}
                                            color={'rgba(155, 186, 82, 1)'}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.subItemText,
                                            {
                                                color: '#fff',
                                                fontSize: 16,
                                                fontWeight: '500',
                                            },
                                        ]}
                                        fontSize={heightp(13)}
                                        text={`${item?.id} ${I18n.t('Hours')}`}
                                    />
                                </View>
                            </View>
                        </View>
                        <>
                            <View
                                style={[
                                    globalStyles.rowBetween,
                                    {
                                        backgroundColor: '#fff',
                                        width: '100%',
                                        borderRadius: 20,
                                        paddingHorizontal: widthp(10),
                                        marginVertical: heightp(5),
                                        paddingVertical: heightp(5),
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: 'rgba(155, 186, 82, 1)',
                                        fontWeight: '700',
                                        fontSize: 16,
                                    }}
                                    text={`${I18n.t('FirstPrimary')}`}
                                />
                                <Text
                                    style={{
                                        color: 'rgba(155, 186, 82, 1)',
                                        fontWeight: '500',
                                        fontSize: 14,
                                    }}
                                    text={`${60} ${I18n.t('SR')}`}
                                />
                            </View>
                            <View
                                style={[
                                    globalStyles.rowBetween,
                                    {
                                        backgroundColor: '#fff',
                                        width: '100%',
                                        borderRadius: 20,
                                        paddingHorizontal: widthp(10),
                                        marginVertical: heightp(5),
                                        paddingVertical: heightp(5),
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: 'rgba(155, 186, 82, 1)',
                                        fontWeight: '700',
                                        fontSize: 16,
                                    }}
                                    text={`${I18n.t('FirstPrimary')}`}
                                />
                                <Text
                                    style={{
                                        color: 'rgba(155, 186, 82, 1)',
                                        fontWeight: '500',
                                        fontSize: 14,
                                    }}
                                    text={`${60} ${I18n.t('SR')}`}
                                />
                            </View>
                            <View
                                style={[
                                    globalStyles.rowBetween,
                                    {
                                        backgroundColor: '#fff',
                                        width: '100%',
                                        borderRadius: 20,
                                        paddingHorizontal: widthp(10),
                                        marginVertical: heightp(5),
                                        paddingVertical: heightp(5),
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: 'rgba(155, 186, 82, 1)',
                                        fontWeight: '700',
                                        fontSize: 16,
                                    }}
                                    text={`${I18n.t('FirstPrimary')}`}
                                />
                                <Text
                                    style={{
                                        color: 'rgba(155, 186, 82, 1)',
                                        fontWeight: '500',
                                        fontSize: 14,
                                    }}
                                    text={`${60} ${I18n.t('SR')}`}
                                />
                            </View>
                        </>
                    </Pressable>
                    {/* {levelDatas?.map((item, index) => (
                        
                    ))} */}
                </View>
            </ScrollView>
            {/* <Loader visible={loading} /> */}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    textStyle: {
        fontSize: heightp(22),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    continueBtn: {
        backgroundColor: colors.primary,
        height: heightp(45),
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: heightp(20),
        marginBottom: heightp(25),
    },
    subItemText: {
        color: 'rgba(155, 186, 82, 1)',
        fontSize: 13,
        fontWeight: '700',
        fontFamily: 'Cairo',
        paddingHorizontal: widthp(5),
    },
})

export default HomeSubject
