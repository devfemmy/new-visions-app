import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Text as RNText,
    Pressable,
    FlatList,
} from 'react-native'
import { heightp, widthp } from '../../utils/responsiveDesign'
import Lottie from '../../components/Lottie'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppContext } from '../../context/AppState'
import HomePageService from '../../services/userServices'
import colors from '../../helpers/colors'
import I18n from 'i18n-js'
import { WINDOW_WIDTH } from '../../helpers/common'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from '../../components/common'
import ContentLoader, { Rect } from 'react-content-loader/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Global from '../../../Global'
const defaultUri =
    'https://firebasestorage.googleapis.com/v0/b/newvisions-9f9ef.appspot.com/o/logo-light.png?alt=media&token=68b6dab7-4a8e-4093-9b7a-994a951eda7a'

function RegisterStages() {
    const { showLoadingSpinner, loadingSpinner, onLogin, lang } =
        useContext(AppContext)
    const sourceLot = require('../../assets/Lottie/green-dots-loader.json')
    const navigation = useNavigation()
    const route = useRoute()
    const {
        firstName,
        lastName,
        accountType,
        gender,
        emailAddress,
        user,
        phoneNumber,
    } = route.params
    const [loading, setLoading] = useState(false)
    const [stagesArray, setStagesArray] = useState([])
    const [levelsArray, setLevelsArray] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null)
    const [currentLevel, setCurrentLevel] = useState(null)
    const [currentStage, setCurrentStage] = useState(null)
    const [stageId, setStageId] = useState('1')

    const getStages = async () => {
        showLoadingSpinner(true)
        try {
            const res = await HomePageService.getStages()
            const data = res?.data
            if (res.code === 200) {
                showLoadingSpinner(false)
                // console.log('data fetched here in get stages', data)
                setStagesArray(data)
            } else {
                showLoadingSpinner(false)
                // console.log('account is logged in another device')
            }
            return res
        } catch (err) {
            showLoadingSpinner(false)
        }
    }

    const getSubjectLevels = async (stage) => {
        setLevelsArray([])
        setLoading(true)
        setStageId(stage)

        const payload = {
            stage_id: stage,
        }
        try {
            const res = await HomePageService.getLevels(payload)
            const data = res?.data
            if (res.code === 200) {
                setLoading(false)
                setLevelsArray(data)
            } else {
                // console.log('account is logged in another device')
                // onLogout()
                // return
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    const setUserInfoToken = (userData) => {
        showLoadingSpinner(false)
        Global.AuthenticationToken = userData.remember_token
        AsyncStorage.setItem(
            'token',
            Global.AuthenticationToken || userData.remember_token
        )
        // console.log('userData.remember_token', userData.remember_token)
    }
    const setUserInfo = (userData) => {
        showLoadingSpinner(false)
        // console.log('yoooooooooooo', userData.remember_token)
        Global.AuthenticationToken = userData.remember_token
        AsyncStorage.setItem('token', Global.AuthenticationToken)
        Global.Image = userData.image
        Global.UserName = firstName + lastName
        Global.phone = userData.phone
        Global.email = userData.email
        Global.UserId = userData.id
        Global.UserType = userData.type
        onLogin(userData, true)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStages()
            setUserInfoToken(user)
        })
        return unsubscribe
    }, [navigation])

    const registerStagesFunc = async () => {
        showLoadingSpinner(true)
        const payload = {
            first_name: firstName,
            last_name: lastName,
            gender: gender === 'male' ? '1' : '2',
            type:
                accountType === 'student'
                    ? '3'
                    : accountType === 'parent'
                    ? '4'
                    : '2',
            level_id: currentLevel,
            stage_id: currentStage?.id,
            email: emailAddress,
            phone: phoneNumber || user?.phone,
        }
        try {
            const res = await HomePageService.completeData(payload)
            showLoadingSpinner(false)
            if (res.code === 200) {
                showLoadingSpinner(false)
                const newUser = {
                    first_name: firstName,
                    last_name: lastName,
                    phone: user.phone,
                    remember_token: user.remember_token,
                    type: user.type,
                    stage_id: stageId,
                }
                setUserInfo(newUser)
                // navigation.navigate('OtpVerification')
            } else {
                showLoadingSpinner(false)
                alert(res.message)
            }
            return res
        } catch (err) {
            alert(err)
            showLoadingSpinner(false)
        }
    }

    return (
        <>
            {!loadingSpinner && (
                <View style={styles.container}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.center}>
                            <Image
                                style={styles.logo}
                                source={{ uri: defaultUri }}
                            />
                            {/* stages */}
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: widthp(20),
                                    paddingVertical: heightp(10),
                                }}
                            >
                                {stagesArray?.length > 0 &&
                                    stagesArray?.map((stage, index) => {
                                        const topIndex = index
                                        return (
                                            <>
                                                <Pressable
                                                    style={
                                                        styles.pickerContainer
                                                    }
                                                    onPress={() => {
                                                        setCurrentIndex(index)
                                                        setCurrentStage(stage)
                                                        getSubjectLevels(
                                                            stage?.id
                                                        )
                                                    }}
                                                >
                                                    <RNText
                                                        style={[styles.label]}
                                                    >
                                                        {stage?.name}
                                                    </RNText>
                                                    <MaterialCommunityIcons
                                                        name="chevron-down"
                                                        size={30}
                                                        color={colors.white}
                                                        style={{
                                                            transform: [
                                                                {
                                                                    rotate:
                                                                        topIndex ===
                                                                        currentIndex
                                                                            ? '0deg'
                                                                            : '270deg',
                                                                },
                                                            ],
                                                        }}
                                                    />
                                                </Pressable>
                                                {topIndex === currentIndex &&
                                                levelsArray.length === 0 ? (
                                                    <ContentLoader
                                                        viewBox="0 0 380 70"
                                                        backgroundColor={
                                                            colors.darkGray
                                                        }
                                                        foregroundColor={
                                                            colors.gray
                                                        }
                                                        height={100}
                                                        speed={1}
                                                    >
                                                        <Rect
                                                            x="80"
                                                            y="17"
                                                            rx="4"
                                                            ry="4"
                                                            width="200"
                                                            height="13"
                                                        />
                                                    </ContentLoader>
                                                ) : (
                                                    <>
                                                        {topIndex ===
                                                            currentIndex && (
                                                            <>
                                                                <FlatList
                                                                    nestedScrollEnabled
                                                                    keyboardShouldPersistTaps="handled"
                                                                    contentContainerStyle={
                                                                        styles.flatlistContent
                                                                    }
                                                                    ListEmptyComponent={() => (
                                                                        <View
                                                                            style={{
                                                                                justifyContent:
                                                                                    'center',
                                                                                alignItems:
                                                                                    'center',
                                                                            }}
                                                                        >
                                                                            <Text
                                                                                text={I18n.t(
                                                                                    'NoData'
                                                                                )}
                                                                            />
                                                                        </View>
                                                                    )}
                                                                    data={
                                                                        levelsArray
                                                                    }
                                                                    keyExtractor={(
                                                                        item
                                                                    ) =>
                                                                        `key ${item.id}`
                                                                    }
                                                                    showsVerticalScrollIndicator={
                                                                        false
                                                                    }
                                                                    renderItem={({
                                                                        item,
                                                                        index,
                                                                    }) => {
                                                                        return (
                                                                            <Pressable
                                                                                onPress={() => {
                                                                                    setCurrentLevel(
                                                                                        item?.id
                                                                                    )
                                                                                }}
                                                                                style={{
                                                                                    paddingVertical:
                                                                                        heightp(
                                                                                            2.5
                                                                                        ),
                                                                                    borderBottomColor:
                                                                                        'rgba(216, 216, 216, 1)',
                                                                                    borderBottomWidth:
                                                                                        index ===
                                                                                        levelsArray.length -
                                                                                            1
                                                                                            ? 0
                                                                                            : 1,
                                                                                }}
                                                                            >
                                                                                <Text
                                                                                    style={{
                                                                                        color:
                                                                                            currentLevel ===
                                                                                            item?.id
                                                                                                ? 'rgba(155, 186, 82, 1)'
                                                                                                : 'rgba(32, 32, 32, 1)',
                                                                                        fontWeight:
                                                                                            '500',
                                                                                        paddingTop: 5,
                                                                                        textAlign:
                                                                                            lang ===
                                                                                            'ar'
                                                                                                ? 'left'
                                                                                                : 'right',
                                                                                    }}
                                                                                    text={
                                                                                        item?.name
                                                                                    }
                                                                                    fontSize={heightp(
                                                                                        13
                                                                                    )}
                                                                                />
                                                                            </Pressable>
                                                                        )
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )
                                    })}
                            </View>
                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={() => registerStagesFunc()}
                            >
                                <View style={styles.loginBtnView}>
                                    <RNText style={styles.loginText}>
                                        {I18n.t('Next')}
                                    </RNText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}

            {loadingSpinner && <Lottie fileSource={sourceLot} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: heightp(40),
    },
    center: {
        paddingTop: 15,
        alignItems: 'center',
    },
    logo: {
        height: 75,
        width: '55%',
        resizeMode: 'stretch',
        marginVertical: 25,
    },
    loginBtn: {
        width: '60%',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: heightp(50),
    },
    loginBtnView: {
        flex: 1,
        borderRadius: 40,
        backgroundColor: 'rgba(67, 72, 84, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 15,
    },
    loginText: {
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colors.white,
    },
    label: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
    },
    pickerContainer: {
        height: heightp(60),
        width: WINDOW_WIDTH * 0.85,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(155, 186, 82, 1)',
        paddingHorizontal: widthp(25),
        marginVertical: 5,
    },
    flatlistContent: {
        // flexGrow: 1,
        backgroundColor: 'rgba(250, 250, 249, 1)',
        paddingHorizontal: widthp(20),
        paddingVertical: heightp(5),
        borderRadius: 10,
        //
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },
})

export default RegisterStages
