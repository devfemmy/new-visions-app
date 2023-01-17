import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Alert,
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
import { heightp } from '../../utils/responsiveDesign'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { Text } from '../../components/common'
import CheckBox from '@react-native-community/checkbox'
import SubscriptionModal from '../../components/SubscriptionModal'
import moment from 'moment'
const defaultUri = require('../../assets/img/default-profile-picture.jpeg')
const freeLessonsUri = require('../../assets/img/freeLessons.png')

const FreeLessons = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { lang, onLogout } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState(null)
    const [groupData, setGroupData] = useState(null)

    const getFreeLessonsFunc = async () => {
        setLoading(true)
        try {
            const res = await HomePageService.getFreeLessons()
            const data = res?.data
            if (res?.code === 200) {
                setLoading(false)
                setData(data)
            } else {
                alert('This Account is Logged in from another Device.')
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
            getFreeLessonsFunc()
        })
        return unsubscribe
    }, [navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getFreeLessonsFunc()
        if (res?.code === 200) {
            setRefreshing(false)
            setData(res?.data?.info[0])
        }
    }, [])

    const joinLive = async (item) => {
        setLoading(true)
        const payload = {
            id: item?.id.toString(),
            type: '7',
        }
        try {
            const res = await HomePageService.joinLive(payload)
            if (res.code === 200) {
                setLoading(false)
                console.log('join ed live already', res)
                const live_url = res?.data?.live_url
                const lesson_id = res?.data?.lesson
                // await AsyncStorage.setItem('lessonId', lesson_id)
                navigation.navigate('WebView', {
                    live_url,
                    lesson_id,
                    liveNow: 'liveNow',
                    item: item,
                })
            } else if (res.code === -2) {
                alert(I18n.t('NotAvailableNow'))
                setLoading(false)
            } else {
                console.log('could not joined live already', item, res)
                setLoading(false)
            }
            return res
        } catch (err) {
            setLoading(false)
        }
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
                <View style={styles.containerFlex}>
                    <FastImage
                        style={{
                            width: '95%',
                            height: heightp(140),
                            borderRadius: 10,
                        }}
                        source={freeLessonsUri}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
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
                        {I18n.t('FreeLiveExtra')}
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
                <View
                    style={[
                        styles.bigCountContainer,
                        {
                            backgroundColor: 'rgba(155, 186, 82, 1)',
                        },
                    ]}
                >
                    <View style={styles.countContainer}>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    width: '75%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <RNText
                                style={[
                                    styles.subItemText2,
                                    {
                                        color: '#fff',
                                    },
                                ]}
                            >
                                {I18n.t('AvailableFreeLessons')}
                            </RNText>
                        </View>
                        <View
                            style={[
                                styles.countHalfContainer,
                                {
                                    width: '25%',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    paddingHorizontal: 20,
                                },
                            ]}
                        >
                            <IonIcons
                                name="ios-radio-outline"
                                color={colors.white}
                                size={30}
                            />
                        </View>
                    </View>
                </View>

                {data?.map((item, index) => {
                    const dateSplit = item?.date.split(' ')
                    return (
                        <View
                            style={[
                                styles.bigCountContainer,
                                {
                                    backgroundColor: colors.primary,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                                <View style={styles.teacherTimeContainer}>
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '45%',
                                            borderRightWidth: 1.5,
                                            borderRightColor: colors.white,
                                        }}
                                    >
                                        <FastImage
                                            style={{
                                                width: heightp(60),
                                                height: heightp(60),
                                                borderRadius: heightp(60),
                                            }}
                                            source={
                                                item?.user?.image === null ||
                                                item?.user?.image === undefined
                                                    ? defaultUri
                                                    : {
                                                          uri: `${IMAGEURL}/${item?.user?.image}`,
                                                          priority:
                                                              FastImage.priority
                                                                  .normal,
                                                      }
                                            }
                                            resizeMode={
                                                FastImage.resizeMode.cover
                                            }
                                        />
                                        <Text
                                            numberOfLines={1}
                                            style={[
                                                styles.textAlign,
                                                {
                                                    fontWeight: '700',
                                                    fontSize: heightp(13),
                                                    textAlign: 'center',
                                                    color: colors.white,
                                                },
                                            ]}
                                            text={`${item?.user?.first_name} ${item?.user?.last_name}`}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '55%',
                                        }}
                                    >
                                        <View style={styles.details}>
                                            <View style={globalStyles.rowStart}>
                                                <IonIcons
                                                    name="ios-layers"
                                                    color={colors.white}
                                                    size={20}
                                                />
                                                <RNText
                                                    style={[
                                                        styles.subItemText3,
                                                    ]}
                                                >
                                                    {item?.subject?.title}
                                                </RNText>
                                            </View>
                                        </View>
                                        <View style={styles.details}>
                                            <View style={globalStyles.rowStart}>
                                                <IonIcons
                                                    name="ios-time"
                                                    color={colors.white}
                                                    size={20}
                                                />
                                                <RNText
                                                    style={[
                                                        styles.subItemText3,
                                                    ]}
                                                >
                                                    {`${dateSplit[1]} ${dateSplit[2]}`}
                                                </RNText>
                                            </View>
                                        </View>
                                        <View style={styles.details}>
                                            <View style={globalStyles.rowStart}>
                                                <IonIcons
                                                    name="ios-calendar"
                                                    color={colors.white}
                                                    size={20}
                                                />
                                                <RNText
                                                    style={[
                                                        styles.subItemText3,
                                                    ]}
                                                >
                                                    {dateSplit[0]}
                                                </RNText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: colors.white,
                                        width: '90%',
                                        height: 30,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: 2,
                                        borderRadius: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            joinLive(item)
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <RNText
                                                style={[
                                                    styles.subItemText,
                                                    {
                                                        marginHorizontal: 20,
                                                        color: colors.primary,
                                                    },
                                                ]}
                                            >
                                                {I18n.t('Start')}
                                            </RNText>
                                            <FontAwesome
                                                name={
                                                    I18n.locale == 'ar'
                                                        ? 'arrow-circle-left'
                                                        : 'arrow-circle-right'
                                                }
                                                size={20}
                                                color={colors.primary}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            <Loader visible={loading} />
        </View>
    )
}

export default FreeLessons

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    flatlistContent: {
        // flexGrow: 1,
    },
    containerFlex: {
        marginTop: heightp(5),
        marginBottom: heightp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subItemText: {
        color: '#434854',
        fontSize: heightp(16),
        fontWeight: '700',
        textAlign: 'left',
        fontFamily: 'Cairo',
        alignSelf: 'center',
    },
    bigCountContainer: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        borderRadius: 10,
        marginVertical: heightp(10),
        paddingVertical: heightp(10),
    },
    countContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: heightp(5),
    },
    countHalfContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    subItemText2: {
        marginLeft: heightp(5),
        // fontWeight: 'bold',
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
    subItemText3: {
        marginLeft: heightp(5),
        fontWeight: '700',
        fontSize: heightp(12),
        lineHeight: heightp(20),
        textAlign: 'left',
        color: colors.white,
    },
    textAlign: {
        fontWeight: 'bold',
        textAlign: 'left',
    },
    teacherTimeContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: heightp(10),
        marginBottom: heightp(5),
    },
    details: {
        flexDirection: 'row',
        // width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        paddingHorizontal: heightp(20),
        marginVertical: heightp(5),
    },
})
