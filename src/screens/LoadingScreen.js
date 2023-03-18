import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../context/AppState'
import { ImageBackground } from 'react-native'
import Screen from '../components/Screen'
import Global from '../../Global'

const image = require('../assets/img/splash.png')
function LoadingScreen() {
    const { initState } = useContext(AppContext)

    const initAppState = () => {
        AsyncStorage.multiGet(['user', 'lang'], (error, results) => {
            const user =
                JSON.parse(results[0][1]) !== null
                    ? JSON.parse(results[0][1])
                    : null
            const lang = results[1][1] !== null ? results[1][1] : 'ar'
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
        initAppState()
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
