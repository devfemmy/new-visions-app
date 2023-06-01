/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native'
import i18n from 'i18n-js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import AllMeasurementQuizCard from '../../components/AllMeasurementQuizCard'
import { Container, Text } from '../../components/common'
import FazaDetailCourseCard from '../../components/FazaDetailCourseCard'
import { Loader } from '../../components/Loader'
import { AppContext } from '../../context/AppState'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import HomePageService from '../../services/userServices'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import NewLoader from '../../components/NewLoader'

const AllMeasurementQuiz = () => {
    const route = useRoute()
    const { lang, loadingSpinner, showLoadingSpinner, onLogout } =
        useContext(AppContext)
    const [levelDatas, setLevelDatas] = useState(null)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { level_id } = route.params
    const navigation = useNavigation()
    console.log(level_id, '================================')

    const getUserMeasurementQuizzes = async () => {
        setLoading(true)
        const payload = {
            level_id: level_id,
        }
        try {
            const res = await HomePageService.getMeasurementQuizzes(payload)
            const data = res?.data
            if (res.code === 200) {
                setLoading(false)
                setLevelDatas(data)
                console.log('================================>', data)
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
        getUserMeasurementQuizzes()
        const unsubscribe = navigation.addListener('focus', () => {})
        return unsubscribe
    }, [dispatch])

    const navigateNowQuizResult = useCallback(
        (item) => {
            navigation.navigate('LiveNowQuizResult', {
                item: item,
            })
        },
        [navigation]
    )

    const navigateNowQuiz = useCallback(
        (item) => {
            navigation.navigate('AllMeasurementQuizQuestion', {
                item: item,
            })
        },
        [navigation]
    )

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getUserMeasurementQuizzes()
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
                    // globalStyles.wrapper,
                ]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={globalStyles.horizontalMargin} />
                {levelDatas?.length > 0 ? (
                    <View>
                        {levelDatas?.map((item, index) => (
                            <AllMeasurementQuizCard
                                pressed={() => {
                                    // console.log('uetm ============>', item)
                                    // item?.final_result === null
                                    //     ? navigateNowQuiz(item)
                                    //     :
                                    null
                                }}
                                uri={`${IMAGEURL}/${item?.photo}`}
                                image={item?.photo}
                                item={item}
                                contents={
                                    lang === 'en' ? item?.title_en : item?.title
                                }
                                quizzesResult={() => {
                                    item?.final_result === null
                                        ? navigateNowQuiz(item)
                                        : navigateNowQuizResult(item)
                                }}
                            />
                        ))}
                    </View>
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text text={i18n.t('NoData')} />
                    </View>
                )}
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
        color: 'white',
        paddingVertical: 12.5,
    },
    continueBtn: {
        backgroundColor: colors.primary,
        height: heightp(45),
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: heightp(20),
        marginBottom: heightp(25),
    },
})

export default AllMeasurementQuiz
