import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/login'
import UserType from '../screens/Landing/UserType'
import WelcomeStep from '../screens/Landing/WelcomeStep'
import Registration from '../screens/auth/SignUp'
import VerifyAccount from '../screens/auth/VerifyAccount'
import VerifyEnterEmail from '../screens/auth/SendVerificationCodeByEmail'
import VerifyConfirmPassword from '../screens/auth/VerifyCode'
import ResetPassword from '../screens/auth/ResetPassword'
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator()

const PreLoginNavigator = () => {
    useEffect(() => {
        SplashScreen.hide()
    }, [])
    return (
        <Stack.Navigator initialRouteName="UserType" headerMode="none">
            <Stack.Screen
                name="UserType"
                component={UserType}
                options={{
                    title: 'UserType',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <Stack.Screen
                name="WelcomeStep"
                component={WelcomeStep}
                options={{
                    title: 'WelcomeStep',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Login',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={Registration}
                options={{
                    title: 'SignUp',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
                }}
            />
            <Stack.Screen
                name="VerifyAccount"
                component={VerifyAccount}
                options={{
                    title: 'VerifyAccount',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
                }}
            />
            <Stack.Screen
                name="VerifyEnterEmail"
                component={VerifyEnterEmail}
                options={{
                    title: 'VerifyEnterEmail',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
                }}
            />
            <Stack.Screen
                name="VerifyCode"
                component={VerifyConfirmPassword}
                options={{
                    title: 'VerifyCode',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
                }}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                    title: 'ResetPassword',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
                }}
            />
        </Stack.Navigator>
    )
}

export default PreLoginNavigator
