import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../context/AppState'
import { ImageBackground, Platform } from 'react-native'
import Screen from '../components/Screen'
import Global from '../../Global'

const image = require('../assets/img/splash.png')
function LoadingScreen() {
    const { initState, lang: newLang } = useContext(AppContext)

    const initAppState = async () => {
        AsyncStorage.multiGet(['user', 'lang'], async (error, results) => {
            const user =
                JSON.parse(results[0][1]) !== null
                    ? JSON.parse(results[0][1])
                    : null
            const iOSLang = results[1][1] !== null ? results[1][1] : newLang
            // const lang =  await AsyncStorage.getItem('lang');
            const lang = Platform.OS === 'android' ? 'ar' : iOSLang
            Platform.OS === 'android' &&
                (await AsyncStorage.setItem('lang', lang))
            console.log('user ==>', user)
            console.log('lang ==>', lang)
            Global.UserType = user?.type
            Global.UserName = user?.first_name + ' ' + user?.last_name
            Global.email = user?.email
            Global.phone = user?.phone
            initState(user, lang)
        })
    }
    useEffect(() => {
        // AsyncStorage.setItem('lang', newLang);
        initAppState()
        console.log('I AM CALLED', newLang)
    }, [])
    return (
        <Screen>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ flex: 1 }}
            />
        </Screen>
    )
}

export default LoadingScreen
