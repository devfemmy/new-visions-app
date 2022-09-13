import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import PreLoginNavigator from './PreLoginNavigator'
import LoadingScreen from '../screens/LoadingScreen'
import SplashScreen from 'react-native-splash-screen'

import { AppContext } from '../context/AppState'
import navigationTheme from './navigationTheme'
import { PostLoginNavigator } from './PostLoginNavigator'
import Global from '../../Global'
import { navigationRef } from './RootNavigation'

export default function AppNavigator() {
    const { isLoading, user, initUUID, onLogout } = useContext(AppContext)

    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
            {user === null ? <PreLoginNavigator /> : <PostLoginNavigator />}
        </NavigationContainer>
    )
}
