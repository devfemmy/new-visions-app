import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackActions, useNavigation } from '@react-navigation/native'
import I18n from 'i18n-js'
import Teachers from '../screens/Teachers'
import Calendar from '../screens/Calendar'
import Home from '../screens/Home/Home'
import colors from '../helpers/colors'
import { widthp } from '../utils/responsiveDesign'
import LogoIcon from '../assets/img/logo_new.svg'
import MenuIcon from '../assets/img/menu.svg'
import NotificationIcon from '../assets/img/notification.svg'
import BackIcon from '../assets/img/back.svg'
import ForwardIcon from '../assets/img/forward.svg'
import Subject from '../screens/Subject'
import Profile from '../screens/Profile/Profile'
import ParentProfile from '../screens/Parent/Profile'
import ParentProfileNavigator from '../navigation/ParentProfileNavigator'
import { AppContext, AppState } from '../context/AppState'
import Global from '../../Global'
import Conversation from '../screens/Messages/Conversations'
import HomeNavigation from './HomeNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SubjectDetails from '../screens/SubjectDetails'

const RootBottomTab = createBottomTabNavigator()
let session: ''
export const RootBottomTabNavigator = () => {
    const { lang, user } = useContext(AppContext)
    const navigation = useNavigation()
    const HeaderLeft = () => (
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
                marginHorizontal: 16,
            }}
        >
            <View
                style={{
                    transform: [{ rotate: lang === 'ar' ? '180deg' : '0deg' }],
                }}
            >
                <MenuIcon width={20} height={20} />
            </View>
        </TouchableOpacity>
    )
    const LogoTitle = () => <LogoIcon width={100} height={30} />
    const HeaderRight = () => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{
                marginHorizontal: 16,
            }}
        >
            <NotificationIcon width={20} height={20} />
        </TouchableOpacity>
    )
    const backRight = () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
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
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('<<<<<tabs Refreshed>>>>>>')
            getData()
        })
        return unsubscribe
    }, [navigation])
    const getData = async () => {
        const dataFromAsync = await AsyncStorage.getItem('user')
        session = JSON.parse(dataFromAsync)
        console.log('data in the async storage', session)
    }
    return (
        <RootBottomTab.Navigator
            screenOptions={({ route }) => ({
                headerTitleStyle: {
                    fontWeight: '500',
                    fontSize: widthp(12),
                },
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = ''
                    if (route.name === 'HomePage') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline'
                    } else if (
                        route.name === I18n.t('Profile') ||
                        route.name === I18n.t('Sons')
                    ) {
                        iconName = focused ? 'ios-person' : 'ios-person-outline'
                    } else if (route.name === I18n.t('Subjects')) {
                        iconName = focused ? 'ios-book' : 'ios-book-outline'
                    } else if (route.name === I18n.t('Messages')) {
                        iconName = focused ? 'ios-mail' : 'ios-mail-outline'
                    } else if (route.name === I18n.t('Teachers')) {
                        iconName = focused ? 'ios-people' : 'ios-people-outline'
                    } else if (route.name === I18n.t('Calendar')) {
                        iconName = focused
                            ? 'ios-videocam'
                            : 'ios-videocam-outline'
                    } else if (route.name === I18n.t('Subscriptions')) {
                        iconName = focused
                            ? 'ios-receipt'
                            : 'ios-receipt-outline'
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    )
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarHideOnKeyboard: true,
            })}
        >
            <RootBottomTab.Screen
                name={'HomePage'}
                component={HomeNavigation}
                options={{
                    headerTitle: (props) => <LogoTitle {...props} />,
                    headerLeft: HeaderLeft,
                    headerRight: HeaderRight,
                    headerShown: true,
                    title: I18n.t('Home'),
                }}
            />

            <RootBottomTab.Screen
                options={{
                    headerShown: true,
                    headerLeft: backRight,
                    unmountOnBlur: true,
                }}
                name={I18n.t('Subjects')}
                component={SubjectDetails}
            />
            {user && (
                <RootBottomTab.Screen
                    options={{
                        headerShown: true,
                        headerLeft: backRight,
                        unmountOnBlur: true,
                    }}
                    name={I18n.t('Teachers')}
                    component={Teachers}
                />
            )}
            {/* {session?.type == 3 && (
                <RootBottomTab.Screen
                    options={{
                        headerShown: true,
                        headerLeft: backRight,
                        unmountOnBlur: true,
                    }}
                    name={I18n.t('LiveNow')}
                    component={Calendar}
                />
            )} */}
            {/* {Global.UserType == 3 &&
        <RootBottomTab.Screen name={I18n.t("Subscriptions")} component={HomeNavigation} />
      } */}
            {session?.type == 3 && (
                <RootBottomTab.Screen
                    options={{
                        headerShown: true,
                        headerLeft: backRight,
                        unmountOnBlur: true,
                    }}
                    name={I18n.t('Messages')}
                    component={Conversation}
                />
            )}
            {user && (
                <RootBottomTab.Screen
                    options={{
                        headerShown: true,
                        headerLeft: backRight,
                        unmountOnBlur: true,
                    }}
                    name={I18n.t('Calendar')}
                    component={Calendar}
                />
            )}
            {user && (
                <RootBottomTab.Screen
                    options={{
                        headerShown: false,
                        headerLeft: backRight,
                        unmountOnBlur: true,
                    }}
                    name={
                        session?.type == 3 ? I18n.t('Profile') : I18n.t('Sons')
                    }
                    component={
                        session?.type == 3 ? ParentProfileNavigator : Profile
                    }
                />
            )}
        </RootBottomTab.Navigator>
    )
}
