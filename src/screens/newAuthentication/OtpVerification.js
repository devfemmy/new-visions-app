import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native'
import { heightp, widthp } from '../../utils/responsiveDesign'
import Lottie from '../../components/Lottie'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppContext } from '../../context/AppState'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomePageService from '../../services/userServices'
import colors from '../../helpers/colors'
import I18n from 'i18n-js'
import Global from '../../../Global'

function OtpVerification() {
    const { showLoadingSpinner, loadingSpinner, onLogin } =
        useContext(AppContext)
    const sourceLot = require('../../assets/Lottie/green-dots-loader.json')
    const navigation = useNavigation()
    const route = useRoute()
    const { phoneNumber } = route.params
    const [verCode, setVerCode] = useState('')

    const verifyLoginCode = async () => {
        showLoadingSpinner(true)
        const payload = {
            phone: phoneNumber,
            code: verCode,
        }
        try {
            const res = await HomePageService.verifyAccount(payload)
            if (res.code === 201) {
                console.log('response', res)
                showLoadingSpinner(false)
                navigation.navigate('RegisterUserData', {
                    user: res?.data,
                })
            } else if (res.code === 200) {
                console.log('response login', res.data)
                setUserInfo(res?.data)
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
    const setUserInfo = (userData) => {
        showLoadingSpinner(false)
        console.log('yoooooooooooo', userData.remember_token)
        Global.AuthenticationToken = userData.remember_token
        AsyncStorage.setItem('token', Global.AuthenticationToken)
        Global.Image = userData.image
        Global.UserName = userData.first_name + userData.last_name
        Global.phone = userData.phone
        Global.email = userData.email
        Global.UserId = userData.id
        Global.UserType = String(userData.type)
        onLogin(userData, true)
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
                                source={require('../../assets/img/logo-New.png')}
                            />
                            {/* otp input */}
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: widthp(20),
                                    paddingTop: heightp(30),
                                }}
                            >
                                <Text style={styles.verifyText}>
                                    {I18n.t('PleaseAddVerificationCode')}
                                </Text>
                                <OTPInputView
                                    pinCount={4}
                                    style={{
                                        width: '70%',
                                        height: 50,
                                        marginBottom: 50,
                                    }}
                                    codeInputFieldStyle={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 7,
                                        borderColor: 'rgba(67, 72, 84, 1)',
                                        backgroundColor:
                                            'rgba(67, 72, 84, 0.01)',
                                        color: 'rgba(67, 72, 84, 1)',
                                        fontFamily: 'Cairo-Medium',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    }}
                                    keyboardType="phone-pad"
                                    onCodeFilled={(code) => {
                                        console.log(code)
                                        setVerCode(code)
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={() => verifyLoginCode()}
                            >
                                <View style={styles.loginBtnView}>
                                    <Text style={styles.loginText}>
                                        {I18n.t('Next')}
                                    </Text>
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
    container: { flex: 1, backgroundColor: '#fff' },
    center: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        resizeMode: 'stretch',
        flex: 1,
    },
    logo: {
        height: 75,
        width: '55%',
        resizeMode: 'stretch',
        marginVertical: 25,
    },
    socialLogin: {
        paddingHorizontal: heightp(25),
        marginVertical: heightp(10),
    },
    loginBtn: {
        width: '60%',
        flexDirection: 'row',
        height: 47.5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 25,
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
        // marginRight: '35%',
        color: colors.white,
    },
    verifyText: {
        fontSize: 15,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: '700',
        color: 'rgba(67, 72, 84, 1)',
        paddingVertical: heightp(30),
    },
})

export default OtpVerification
