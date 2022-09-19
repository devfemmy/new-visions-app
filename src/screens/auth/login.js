import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    Image,
} from 'react-native'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    appleAuth,
    appleAuthAndroid,
    AppleButton,
} from '@invertase/react-native-apple-authentication'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import Screen from '../../components/Screen'
import colors from '../../helpers/colors'
import LoginForm from './LoginForm'

import { AppContext } from '../../context/AppState'
import LoginApi from '../../api/Login/LoginApi'
import Global from '../../../Global'

import { SocialButtons } from './SocialButtons'
import { heightp } from '../../utils/responsiveDesign'
// import { socialAuthApi } from "../../api/socialAuthApi";
import Toast from 'react-native-toast-message'
import Lottie from '../../components/Lottie'
import { useNavigation } from '@react-navigation/native'

function Login() {
    const {
        changeLang,
        lang,
        showLoadingSpinner,
        initUUID,
        onLogin,
        loadingSpinner,
    } = useContext(AppContext)
    const sourceLot = require('../../assets/Lottie/green-dots-loader.json')
    const navigation = useNavigation()
    const socialAuthApi = ({ givenName, familyName, email, id, type }) => {
        console.log('I AM HERE')
        axios
            .post('https://www.newvisions.sa/api/signupExternal', {
                first_name: givenName,
                last_name: familyName,
                email,
                client_id: id,
                type,
            })
            .then(async (response) => {
                if (response.data.code === 200) {
                    console.log('response hereee', response.data)
                    if (response.data.data?.type === 2) {
                        Global.UserType = 'Teacher'
                    }
                    if (response.data.data.type === 3) {
                        Global.UserType = 'Student'
                    }
                    if (response.data.data.type === 4) {
                        Global.UserType = 'Parent'
                    }
                    Global.LoggedIn = true
                    if (
                        response.data.data.phone === '123456' ||
                        response.data.data.phone === 123456
                    ) {
                        const responseData = response?.data?.data
                        Global.AuthenticationToken =
                            responseData?.remember_token
                        AsyncStorage.setItem(
                            'token',
                            Global.AuthenticationToken
                        )
                        navigation.navigate('CompleteProfile', {
                            userData: responseData,
                        })
                    } else {
                        // replace('Main');
                        setUserInfo(response.data.data)
                    }
                } else {
                    alert(JSON.stringify(response.data.message))
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    const onAppleButtonPress = async () => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(
            appleAuthRequestResponse.user
        )
        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            socialAuthApi({
                firstName: appleAuthRequestResponse?.fullName?.givenName,
                lastName: appleAuthRequestResponse?.fullName?.familyName,
                email: appleAuthRequestResponse?.email,
                id: appleAuthRequestResponse?.user,
                type: 'APPLE',
            })
        }
    }

    const signInGoogle = async () => {
        // It will prompt google Signin Widget
        try {
            await GoogleSignin.hasPlayServices({
                // Check if device has Google Play Services installed
                // Always resolves to true on iOS
                showPlayServicesUpdateDialog: true,
            })
            const {
                user: { givenName, familyName, id, email },
            } = await GoogleSignin.signIn()
            socialAuthApi({
                firstName: givenName,
                lastName: familyName,
                email,
                id,
                type: 'GMAIL',
            })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // alert('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signing In')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('Play Services Not Available or Outdated')
            } else {
                alert(error.message)
            }
        }
    }

    const submitLogin = (values) => {
        showLoadingSpinner(true)
        axios
            .post('https://newvisions.sa/api/login', {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data
                        setUserInfo(data)
                    } else {
                        showLoadingSpinner(false)
                        alert(response.data.message)
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                alert(error)
            })
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
        onLogin(userData, true)
    }

    return (
        <>
            {!loadingSpinner && (
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../../assets/img/BG.png')}
                        style={styles.backgroundImage}
                        imageStyle={{ tintColor: 'rgba(255, 255, 255, 1)' }}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.center}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../assets/img/logo-light.png')}
                                ></Image>
                                <AppleButton />
                                <LoginForm
                                    submitLogin={submitLogin}
                                    signInGoogle={signInGoogle}
                                    onAppleButtonPress={onAppleButtonPress}
                                />
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            )}

            {loadingSpinner && <Lottie fileSource={sourceLot} />}
            <Toast />
        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        resizeMode: 'stretch',
        flex: 1,
    },
    logo: {
        height: 100,
        width: 280,
        marginVertical: 50,
        resizeMode: 'stretch',
    },
    socialLogin: {
        paddingHorizontal: heightp(25),
        marginVertical: heightp(10),
    },
})

export default Login
