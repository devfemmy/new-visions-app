import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    Image,
    Platform,
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

// import LoginApi from '../../api/Login/LoginApi'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import Global from '../../../Global'

// import { SocialButtons } from './SocialButtons'
import { heightp } from '../../utils/responsiveDesign'
// import { socialAuthApi } from "../../api/socialAuthApi";
import Lottie from '../../components/Lottie'
import { AppContext } from '../../context/AppState'
import LoginForm from '../auth/newAuth/LoginForm'
import HomePageService from '../../services/userServices'

const defaultUri =
    'https://firebasestorage.googleapis.com/v0/b/newvisions-9f9ef.appspot.com/o/logo-light.png?alt=media&token=68b6dab7-4a8e-4093-9b7a-994a951eda7a'

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
    const socialAuthApi = (givenName, familyName, email, id, type ) => {
        console.log('I AM HERE', givenName, familyName)
        axios
            .post('https://newvisions.sa/api/signupExternal', {
                first_name: givenName,
                last_name: familyName,
                email,
                client_id: id,
                type,
            })
            .then(async (response) => {
                // if (res.code === 201) {
                //     console.log('response', res)
                //     showLoadingSpinner(false)
                //     navigation.navigate('RegisterUserData', {
                //         user: res?.data,
                //     })
                // } else if (res.code === 200) {
                //     console.log('response login', res.data)
                //     setUserInfo(res?.data)
                // } else {
                //     showLoadingSpinner(false)
                //     alert(res.message)
                // }
                // return res
                const responseData = response.data
                if (responseData.code === 201) {
                    console.log('', responseData)
                    showLoadingSpinner(false)
                    navigation.navigate('RegisterUserData', {
                        user: responseData?.data,
                        emailFlag: true,
                    })
                } else if (responseData.code === 200) {
                    console.log('response login', responseData.data)
                    const socialData = responseData.data
                    if (
                        socialData?.phone === 123456 ||
                        socialData?.phone === '123456'
                    ) {
                        showLoadingSpinner(false)
                        navigation.goBack()
                        navigation.navigate('RegisterUserData', {
                            user: responseData?.data,
                            emailFlag: true,
                        })
                    } else {
                        setUserInfo(responseData?.data)
                    }
                } else {
                    showLoadingSpinner(false)
                    alert(responseData.message)
                }
                // return res
                // if (response.data.data?.type == 2) {
                //     Global.UserType = 'Teacher'
                // }
                // if (response.data.data.type == 3) {
                //     Global.UserType = 'Student'
                // }
                // if (response.data.data.type == 4) {
                //     Global.UserType = 'Parent'
                // }
                // Global.LoggedIn = true
                // if (
                //     response.data.data.phone === '123456' ||
                //     response.data.data.phone === 123456
                // ) {
                //     const responseData = response?.data?.data
                //     Global.AuthenticationToken =
                //         responseData?.remember_token
                //     AsyncStorage.setItem(
                //         'token',
                //         Global.AuthenticationToken
                //     )
                //     console.log(responseData, 'social login')
                //     navigation.navigate('CompleteProfile', {
                //         userData: responseData,
                //     })
                // } else {
                //     // replace('Main');
                //     setUserInfo(response.data.data)
                // }
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
            const firstName = appleAuthRequestResponse?.fullName?.givenName;
            const lastName = appleAuthRequestResponse?.fullName?.familyName;
            const email = appleAuthRequestResponse?.email;
            const id = appleAuthRequestResponse?.user;
            const type = 'APPLE'
            socialAuthApi(
                firstName,
                lastName,
                email,
                id,
                type
            )
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
            } = await GoogleSignin.signIn();
            console.log('what came back', givenName, familyName)
            const firstName = givenName;
            const lastName = familyName;
            const type = 'GMAIL'
            socialAuthApi(
                firstName,
                lastName,
                email,
                id,
                type
            )
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

    const submitLogin = async (values) => {
        console.log('login clicked', values)
        showLoadingSpinner(true)
        const payload = {
            phone: values.phone,
        }
        try {
            const res = await HomePageService.login(payload)
            console.log('response', res)
            navigation.goBack()
            if (res.code === 200) {
                showLoadingSpinner(false)
                navigation.navigate('OtpVerification', {
                    phoneNumber: values.phone,
                })
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
        console.log('social login', userData)
        showLoadingSpinner(false)
        Global.AuthenticationToken = userData.remember_token
        AsyncStorage.setItem('token', Global.AuthenticationToken)
        Global.Image = userData?.image
        Global.UserName = userData?.first_name + userData?.last_name
        Global.phone = userData?.phone
        Global.email = userData?.email
        Global.UserId = userData?.id
        Global.UserType = userData.type
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
                                source={{ uri: defaultUri }}
                            />
                            {Platform.OS === 'ios' && <AppleButton />}
                            <LoginForm
                                submitLogin={submitLogin}
                                signInGoogle={signInGoogle}
                                onAppleButtonPress={onAppleButtonPress}
                            />
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
})

export default Login
