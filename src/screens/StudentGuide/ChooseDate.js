import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Alert,
    FlatList,
    Platform,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text as RNText,
    TouchableOpacity,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { globalStyles } from '../../helpers/globalStyles'
import { IMAGEURL } from '../../utils/functions'
import { heightp, widthp } from '../../utils/responsiveDesign'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import I18n from 'i18n-js'
import { Text } from '../../components/common'
import StageCard from '../../components/StageCard'
import colors from '../../helpers/colors'
import NewLoader from '../../components/NewLoader'

const ChooseStudyDate = () => {
    const route = useRoute()

    const { item, guide_id } = route.params
    console.log('Items', item)
    const navigation = useNavigation()
    const { lang, onLogout } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState(null)
    const [activeStage, setActiveStage] = useState(null)
    const [groupData, setGroupData] = useState(null)
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false)

    const getGuidesDaysFunc = async () => {
        setLoading(true)
        const payload = {
            guide_id,
        }
        try {
            const res = await HomePageService.getGuideDays(payload)
            const data = res?.data
            if (res?.code === 200) {
                setLoading(false)
                console.log('guides days', data)
                setData(data)
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
            getGuidesDaysFunc()
        })
        return unsubscribe
    }, [navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getGuidesDaysFunc()
        if (res?.code === 200) {
            setRefreshing(false)
            setData(res?.data)
        }
    }, [])

    const navigateQuestionnaire = useCallback(
        (item) => {
            navigation.navigate('GuideQuestionnaire', {
                item,
                questionData: data,
            })
        },
        [navigation, item, data]
    )
    if (loading){
        return(
            <NewLoader />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    // globalStyles.wrapper,
                ]}
                style={{ flex: 1, flexGrow: 1 }}
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
                                // color: '#fff',
                                textAlign: 'center',
                                paddingTop: heightp(5),
                                paddingBottom: heightp(20),
                            },
                        ]}
                    >
                        {I18n.t('ChooseLessonNew')}
                    </RNText>
                </View>
                <View
                    style={[
                        globalStyles.horizontal,
                        {
                            marginBottom: heightp(5),
                        },
                    ]}
                />
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
                    data={data?.days}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                        const daysOfWeek = [
                            I18n.t('Saturday'),
                            I18n.t('Sunday'),
                            I18n.t('Monday'),
                            I18n.t('Tuesday'),
                            I18n.t('Wednesday'),
                            I18n.t('Thursday'),
                            I18n.t('Friday'),
                        ]
                        const specialIndex = `${item?.day_id - 1}`
                        const dayOfWeek = daysOfWeek[specialIndex]
                        return (
                            <>
                                <Pressable
                                    onPress={() => {
                                        navigateQuestionnaire(item)
                                    }}
                                    onPressIn={() => {
                                        setActiveStage(item)
                                    }}
                                    style={[
                                        styles.primaryContainer,
                                        {
                                            backgroundColor:
                                                item?.id === activeStage?.id
                                                    ? colors.primary
                                                    : colors.dark,
                                        },
                                    ]}
                                >
                                    <View>
                                        <Text
                                            style={styles.text2}
                                            text={dayOfWeek}
                                        />

                                        <Text
                                            style={styles.text2}
                                            text={item.start && `${item.start}`}
                                        />
                                    </View>
                                </Pressable>
                            </>
                        )
                    }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={20}
                    // onEndReached={onEndReached}
                    onMomentumScrollBegin={() => {
                        setOnEndReachedCalledDuringMomentum(false)
                    }}
                />
            </ScrollView>
            {/* <Loader visible={loading} /> */}
        </View>
    )
}

export default ChooseStudyDate

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    flatlistContent: {
        // flexGrow: 1,
    },
    primaryContainer: {
        minHeight: heightp(80),
        backgroundColor: colors.dark,
        borderRadius: 8,
        width: '100%',
        marginRight: heightp(25),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: heightp(10),
        marginTop: heightp(20),
    },
    text2: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})
