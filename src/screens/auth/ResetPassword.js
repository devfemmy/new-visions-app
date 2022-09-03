import React, { useState, useContext } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import { Button, Text, Icon } from 'react-native-elements'
import i18n from 'i18n-js'
import { TextInput } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import colors from '../../helpers/colors'
import { heightp } from '../../utils/responsiveDesign'
import Global from '../../../Global'
import { AppContext } from '../../context/AppState'

export default function ResetPassword({ route, navigation }) {
    // const { t, i18n } = useTranslation()
    const { changeLang, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [PasswordInput, setPassword] = useState('')
    const [PasswordConfirmationInput, setPasswordConfirmation] = useState('')
    const VerifyAPI = () => {
        setLoading(true)
        axios
            .post('https://www.newvisions.sa/api/resetPassword', {
                phone:
                    route.params.phone != undefined ? route.params.phone : null,
                password: PasswordInput,
                password_confirmation: PasswordConfirmationInput,
            })
            .then(function (response) {
                if (JSON.stringify(response.data.code) == 200) {
                    setLoading(false)
                    alert(i18n.t('PasswordChangeComplete'))
                    // setUserInfo(response.data.data)
                    // showLoadingSpinner(true)
                    navigation.navigate('Login')
                } else {
                    alert(JSON.stringify(response.data.message))
                    setLoading(false)
                }
            })
            .catch(function (error) {
                alert(error)
                setLoading(false)
            })
    }
    const setUserInfo = async (userData) => {
        // showLoadingSpinner(false)
        Global.AuthenticationToken = userData.remember_token
        await AsyncStorage.setItem('token', userData.remember_token)
        Global.Image = userData.image
        Global.UserName = userData.first_name + userData.last_name
        Global.phone = userData.phone
        Global.email = userData.email
        Global.UserId = userData.id
        onLogin(userData, true)
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
                <View style={{ flex: 0.08 }} />
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.dispatch(StackActions.pop(1))
                        }}
                    >
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={20}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                    {/* <Text
                        style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: 'Tajawal-Regular',
                            textAlign: 'center',
                        }}
                    >
                        {i18n.t('EnterNewPassword')}
                    </Text> */}
                    <View></View>
                </View>
                <View style={{ alignSelf: 'center', marginTop: heightp(40) }}>
                    <Icon
                        style={styles.icon}
                        color="white"
                        type="fontisto"
                        name="unlocked"
                        size={90}
                    />
                    <Text
                        style={[
                            styles.textbold,
                            { marginTop: heightp(10), textAlign: 'center' },
                        ]}
                    >
                        {`${i18n.t('ForgotPassword')}?`}
                    </Text>
                    <Text
                        style={[
                            styles.textbold,
                            {
                                fontSize: heightp(12),
                                marginBottom: 0,
                                textAlign: 'center',
                            },
                        ]}
                    >
                        {i18n.t('EnterYourEmailToRestYourPassword')}
                    </Text>
                </View>
                <View style={styles.content}>
                    <Text
                        style={
                            (styles.text,
                            {
                                marginTop: 20,
                                color: '#fff',
                                fontSize: heightp(14),
                            })
                        }
                    >
                        {i18n.t('Password')}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 5,
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <TextInput
                            activeUnderlineColor="#fff"
                            style={{
                                marginBottom: 15,
                                height: 50,
                                backgroundColor: '#fff',
                                opacity: 0.5,
                                borderRadius: 5,
                                // borderBottomColor: 'white',
                                width: '100%',
                            }}
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={PasswordInput}
                            right={
                                <TextInput.Icon
                                    color={colors.primary}
                                    name="lock"
                                />
                            }
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <Text
                        style={
                            (styles.text,
                            {
                                color: '#fff',
                                fontSize: heightp(14),
                            })
                        }
                    >
                        {i18n.t('ConfirmPassword')}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 5,
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <TextInput
                            activeUnderlineColor="#fff"
                            style={{
                                marginBottom: 15,
                                height: 50,
                                backgroundColor: '#fff',
                                opacity: 0.5,
                                borderRadius: 5,
                                // borderBottomColor: 'white',
                                width: '100%',
                            }}
                            secureTextEntry={true}
                            onChangeText={setPasswordConfirmation}
                            value={PasswordConfirmationInput}
                            right={
                                <TextInput.Icon
                                    color={colors.primary}
                                    name="lock"
                                />
                            }
                        />
                    </View>
                </View>
                <View
                    style={{
                        // alignItems: 'stretch',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 0.2,
                    }}
                >
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#fff' }]}
                        onPress={() => {
                            VerifyAPI()
                        }}
                    >
                        <Text style={styles.buttontext}>{`${i18n.t(
                            'ChangePassword'
                        )}`}</Text>
                    </TouchableOpacity>
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
    },
    content: {
        marginHorizontal: 20,
    },
    icon: {
        marginBottom: 15,
    },
    textbold: {
        color: 'white',
        fontFamily: 'Tajawal-Medium',
        fontSize: 16,
        marginVertical: 5,
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginBottom: 5,
    },
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: 'yellowgreen',
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: 'yellowgreen',
    },

    underlineStyleHighLighted: {
        borderColor: 'yellowgreen',
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
