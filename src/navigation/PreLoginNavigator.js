import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Login from '../screens/auth/login'
import UserType from '../screens/Landing/UserType'
import WelcomeStep from '../screens/Landing/WelcomeStep'
import Registration from '../screens/auth/SignUp'
import VerifyAccount from '../screens/auth/VerifyAccount'
import VerifyEnterEmail from '../screens/auth/SendVerificationCodeByEmail'
import VerifyConfirmPassword from '../screens/auth/VerifyCode'
import ResetPassword from '../screens/auth/ResetPassword'
import SplashScreen from 'react-native-splash-screen'
import { CompleteProfile } from '../screens/auth/CompleteProfile'
import BackIcon from '../assets/img/back.svg'
import ForwardIcon from '../assets/img/forward.svg'
import Landing from '../screens/newAuthentication/Landing'
import { AppContext } from '../context/AppState'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { heightp } from '../utils/responsiveDesign'
import { CardStyleInterpolators } from '@react-navigation/stack'
import colors from '../helpers/colors'
import Login from '../screens/newAuthentication/login'
import OtpVerification from '../screens/newAuthentication/OtpVerification'

const Stack = createNativeStackNavigator()

const PreLoginNavigator = () => {
    const navigation = useNavigation()
    const { lang } = useContext(AppContext)
    const backRight = () => (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                marginHorizontal: 16,
            }}
        >
            {lang === 'ar' ? (
                <ForwardIcon width={20} height={20} />
            ) : (
                <BackIcon width={20} height={20} />
            )}
        </TouchableOpacity>
    )
    return (
        <Stack.Navigator
            initialRouteName="Landing"
            headerMode="none"
            screenOptions={() => ({
                headerShown: true,
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontWeight: '500',
                    fontSize: heightp(14),
                },
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: colors.black,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            })}
        >
            <Stack.Screen
                name="Landing"
                component={Landing}
                options={{
                    title: 'Landing',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={() => ({
                    headerShown: true,
                    title: '',
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="OtpVerification"
                component={OtpVerification}
                options={() => ({
                    headerShown: true,
                    title: '',
                    headerLeft: backRight,
                })}
            />
            {/* <Stack.Screen
            name="UserType"
            component={UserType}
            options={{
                title: 'UserType',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="WelcomeStep"
            component={WelcomeStep}
            options={{
                title: 'WelcomeStep',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="Login"
            component={Login}
            options={{
                title: 'Login',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="SignUp"
            component={Registration}
            options={{
                title: 'SignUp',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="VerifyAccount"
            component={VerifyAccount}
            options={{
                title: 'VerifyAccount',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="VerifyEnterEmail"
            component={VerifyEnterEmail}
            options={{
                title: 'VerifyEnterEmail',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="VerifyCode"
            component={VerifyConfirmPassword}
            options={{
                title: 'VerifyCode',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
                title: 'ResetPassword',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="CompleteProfile"
            component={CompleteProfile}
            options={{
                title: 'CompleteProfile',
                headerShown: false,
            }}
        /> */}
        </Stack.Navigator>
    )
}

export default PreLoginNavigator
