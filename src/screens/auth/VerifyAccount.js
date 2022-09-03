import React, { useState } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { Icon, Button, Text } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { heightp } from '../../utils/responsiveDesign'
import defaultStyles from '../../helpers/styles'
import colors from '../../helpers/colors'

export default function VerifyAccount({ route, navigation }) {
    // const { t, i18n } = useTranslation()
    // const lang = i18n.language
    const [loading, setLoading] = useState(false)
    const [CodeInput, setCodeInput] = React.useState('')

    const VerifyAPI = () => {
        setLoading(true)
        axios
            .post('https://www.newvisions.sa/api/verifyAccount', {
                phone: route.params.phone,
                code: CodeInput,
            })
            .then((response) => {
                if (JSON.stringify(response.data.code) == 200) {
                    const data = response.data.data
                    setUserInfo(data)
                    setLoading(false)
                    navigation.navigate('Login')
                    console.log('Clicked')
                } else {
                    alert(JSON.stringify(response.data.message))
                    setLoading(false)
                    console.log('Failed')
                }
            })
            .catch((error) => {
                alert(error)
                setLoading(false)
            })
    }
    const setUserInfo = async (userData) => {
        await AsyncStorage.setItem('token', userData.remember_token)
        await AsyncStorage.setItem('userId', userData.id.toString())
        await AsyncStorage.setItem('type', userData.id.toString())
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={loading}
                style={loading ? styles.loading : { display: 'none' }}
                size="large"
                color="#9bba52"
            />
            <ImageBackground
                source={require('../../assets/img/BG.png')}
                style={styles.backgroundImage}
                imageStyle={{ tintColor: 'rgba(155,186,82,1)' }}
            >
                <View style={{ flex: 0.8 }} />
                <View style={styles.content}>
                    <Icon
                        style={styles.icon}
                        color="#fff"
                        type="font-awesome"
                        name="paper-plane"
                        size={90}
                    />
                    <Text style={styles.textbold}>
                        {' '}
                        {i18n.t('CodeConfirmation')}{' '}
                    </Text>
                    <Text
                        style={[
                            styles.textbold,
                            { fontSize: heightp(12), marginBottom: 0 },
                        ]}
                    >
                        {
                            'If You Did Not Receive The Verification Code, You Can '
                        }
                    </Text>
                    <Text
                        style={[
                            styles.textbold,
                            { fontSize: heightp(12), marginVertical: 0 },
                        ]}
                    >
                        {'Resend the verification code again'}
                    </Text>
                    <Text
                        style={
                            (styles.text,
                            {
                                marginTop: 20,
                                paddingVertical: 10,
                                color: '#fff',
                                textAlign: 'center',
                            })
                        }
                    >
                        {i18n.t('PleaseEnterTheCode')}
                    </Text>
                    <View style={{ justifyContent: 'center' }}>
                        <OTPInputView
                            pinCount={6}
                            style={{
                                width: '100%',
                                height: 50,
                                marginBottom: 50,
                            }}
                            codeInputFieldStyle={{
                                width: 50,
                                height: 50,
                                borderRadius: 7,
                                backgroundColor: colors.gray,
                                color: colors.primary,
                                fontFamily: defaultStyles.text.fontFamily,
                                fontSize: 18,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                            }}
                            keyboardType="default"
                            onCodeFilled={(code) => {
                                console.log(code)
                            }}
                        />
                    </View>
                    <View
                        style={{
                            // alignItems: 'stretch',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            // flex: 1,
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#fff' }]}
                            onPress={() => {
                                VerifyAPI()
                            }}
                        >
                            <Text style={styles.buttontext}>{`Enter ${i18n.t(
                                'VerificationCode'
                            )}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        zIndex: 999,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cccccc57',
    },
    container: { flex: 1 },
    backgroundImage: {
        height: '100%',
        width: '100%',
        flex: 1,
        tintColor: '#9BBA52',
    },
    content: {
        flex: 5,
        // alignItems: 'center',
        marginHorizontal: 20,
    },
    icon: {
        marginBottom: 15,
    },
    textbold: {
        color: colors.white,
        marginVertical: 5,
        textAlign: 'center',
        fontSize: heightp(16),
        fontWeight: '700',
        fontFamily: defaultStyles.text.fontFamily,
        // lineHeight: heightp(16),
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
    },
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: 'yellowgreen',
    },

    underlineStyleBase: {
        // width: layout.widthPixel(38),
        // height: layout.heightPixel(40),
        borderWidth: 1,
        color: 'yellowgreen',
    },

    underlineStyleHighLighted: {
        // borderColor: 'yellowgreen',
    },
    button: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '85%',
        borderRadius: 40,
        height: 50,
    },
    buttontext: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Cairo-Regular',
    },
})
