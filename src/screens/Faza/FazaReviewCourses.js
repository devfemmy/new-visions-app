/* eslint-disable camelcase */
import { useNavigation, useRoute } from '@react-navigation/native'
import I18n from 'i18n-js'
import i18n from 'i18n-js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text as RNText,
} from 'react-native'
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

const FazaReviewCourses = () => {
    const route = useRoute()
    const { lang, loadingSpinner, showLoadingSpinner, onLogout } =
        useContext(AppContext)
    const [levelDatas, setLevelDatas] = useState(null)
    const [activeStage, setActiveStage] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { level, levelSubject } = route.params
    const navigation = useNavigation()
    console.log(level, '================================')

    const getSubjectReviewCourses = async () => {
        setLoading(true)
        const payload = {
            level_id: level,
        }
        try {
            const res = await HomePageService.getReviewCourses(payload)
            const data = res?.data
            if (res.code === 200) {
                setLoading(false)
                setLevelDatas(data)
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
            getSubjectReviewCourses()
        })
        return unsubscribe
    }, [level, dispatch])

    const navigateFazaSubscription = useCallback(
        (item) => {
            navigation.navigate('FazaSubscription', {
                item: item,
            })
        },
        [navigation]
    )

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getSubjectReviewCourses()
        if (res?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    console.log(
        `SubjectReview levelDatas =================================`,
        levelDatas
    )

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
                <View>
                    <RNText
                        style={[
                            styles.subItemText2,
                            {
                                color: colors.primary,
                                textAlign: 'center',
                                paddingTop: heightp(5),
                                paddingBottom: heightp(20),
                            },
                        ]}
                    >
                        {I18n.t('FazaText')}
                    </RNText>
                </View>
                <View
                    style={[
                        globalStyles.horizontal,
                        {
                            marginBottom: heightp(15),
                        },
                    ]}
                />
                <View
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 15,
                    }}
                >
                    <Text style={styles.textStyle} text={levelSubject} />
                </View>
                <RNText
                    style={[
                        styles.subItemText2,
                        {
                            textAlign: 'center',
                            paddingTop: heightp(10),
                            paddingBottom: heightp(5),
                        },
                    ]}
                >
                    {I18n.t('FazaText2')}
                </RNText>
                <View style={globalStyles.horizontalMargin} />
                {levelDatas?.length > 0 ? (
                    <View>
                        {levelDatas?.map((item, index) => (
                            <FazaDetailCourseCard
                                pressed={() => navigateFazaSubscription(item)}
                                price={item?.price}
                                number_of_students={item?.number_of_students}
                                uri={`${IMAGEURL}/${item?.image}`}
                                image={item?.image}
                                contents={`${item?.title}`}
                                subject={`${item?.subject?.title}`}
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
            <Loader visible={loading} />
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
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})

export default FazaReviewCourses
