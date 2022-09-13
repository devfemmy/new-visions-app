import React, { useContext } from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { RootBottomTabNavigator } from './RootTabNavigator'
import Home from '../screens/Home/Home'
import BackIcon from '../assets/img/back.svg'
import Calendar from '../screens/Calendar'
import defaultStyles from '../helpers/styles'
// import { Text } from '../components/common'
import { WINDOW_HEIGHT } from '../helpers/common'
import colors from '../helpers/colors'
import MeasurementQuiz from '../screens/MeasurementQuiz'
import MeasurementTestResults from '../screens/MeasurementTestResults'
import Subscriptions from '../screens/Parent/Subscriptions'
import JointCourses from '../screens/JointCourses'
import Settings from '../screens/Settings'
import WhoWeAre from '../screens/WhoWeAre'
import DeleteMembership from '../screens/DeleteMembership'
import Exit from '../screens/Exit'
import { AppContext } from '../context/AppState'
import I18n from 'i18n-js'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const navigation = useNavigation()
    const backRight = () => (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                marginLeft: 16,
            }}
        >
            <BackIcon width={20} height={20} />
        </TouchableOpacity>
    )
    const CustomDrawerContent = (props) => {
        const { onLogout, user } = useContext(AppContext)
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView
                    {...props}
                    scrollEnabled={true}
                    contentContainerStyle={{
                        height: WINDOW_HEIGHT,
                        backgroundColor: colors.primary,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            paddingHorizontal: 20,
                            alignItems: 'flex-start',
                            height: WINDOW_HEIGHT * 0.1,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Cairo-Regular',
                                color: colors.white,
                                fontSize: 18,
                                fontWeight: '300',
                                paddingLeft: 5,
                                paddingTop: 25,
                                // backgroundColor: colors.green,
                            }}
                        >
                            {I18n.t('Welcome')}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Cairo-Regular',
                                color: colors.white,
                                fontSize: 18,
                                fontWeight: '600',
                                paddingLeft: 5,
                                lineHeight: 24,
                            }}
                        >
                            {user?.first_name}
                        </Text>
                    </View>
                    <View style={styles.itemList}>
                        <DrawerItemList {...props} />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('log out function')
                            onLogout()
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            paddingHorizontal: 20,
                            height: WINDOW_HEIGHT * 0.1,
                            backgroundColor: colors.white,
                        }}
                    >
                        <Ionicons
                            name={'log-out'}
                            size={20}
                            color={colors.primary}
                            // style={{ paddingRight: 15 }}
                        />
                        <Text
                            style={{
                                ...defaultStyles.text,
                                fontSize: 14,
                                color: colors.primary,
                                fontWeight: '700',
                                fontStyle: 'normal',
                                paddingRight: 35,
                            }}
                        >
                            {I18n.t('logout')}
                        </Text>
                    </TouchableOpacity>
                </DrawerContentScrollView>
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Drawer.Navigator
                drawerType="slide"
                useLegacyImplementation={true}
                screenOptions={{
                    // headerShown: false,
                    drawerActiveBackgroundColor: colors.gray,
                    drawerLabelStyle: {
                        ...defaultStyles.text,
                        fontSize: 14,
                        color: colors.primary,
                        fontWeight: '700',
                    },
                    drawerStyle: {
                        flex: 1,
                        width: '75%',
                    },
                }}
                overlayColor="transparent"
                sceneContainerStyle={{
                    backgroundColor: 'transparent',
                }}
                initialRouteName="Home"
                drawerContent={(props) => {
                    return <CustomDrawerContent {...props} />
                }}
            >
                <Drawer.Screen
                    name={I18n.t('Home')}
                    component={RootBottomTabNavigator}
                    options={{
                        headerShown: false,
                        headerTransparent: true,
                        headerTintColor: colors.white,
                        drawerIcon: () => (
                            <Ionicons
                                name={'ios-home'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name={I18n.t('Calendar')}
                    component={Calendar}
                    options={{
                        headerShown: true,
                        headerLeft: backRight,
                        unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <Ionicons
                                name={'calendar'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                />
                {/* <Drawer.Screen
                    name={I18n.t('MeasurementQuiz')}
                    component={MeasurementQuiz}
                    options={{
                        // headerShown: true,
                        // headerLeft: backRight,
                        // unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <Ionicons
                                name={'alarm'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                /> */}
                <Drawer.Screen
                    name={I18n.t('MeasurementTestResult')}
                    component={MeasurementTestResults}
                    options={{
                        // headerShown: true,
                        // headerLeft: backRight,
                        // unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <Ionicons
                                name={'bar-chart'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name={I18n.t('JointCourses')}
                    component={JointCourses}
                    options={{
                        // headerShown: true,
                        // headerLeft: backRight,
                        // unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <Ionicons
                                name={'albums'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                />

                {/* <Drawer.Screen
                    name={I18n.t('WhoWeAre')}
                    component={WhoWeAre}
                    options={{
                        // headerShown: true,
                        // headerLeft: backRight,
                        // unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <Ionicons
                                name={'information-circle'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                /> */}
                <Drawer.Screen
                    name={I18n.t('DeleteMembership')}
                    component={DeleteMembership}
                    options={{
                        // headerShown: true,
                        // headerLeft: backRight,
                        // unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <MaterialIcons
                                name={'delete'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name={I18n.t('AboutUs')}
                    component={Settings}
                    options={{
                        // headerShown: true,
                        // headerLeft: backRight,
                        // unmountOnBlur: true,
                        // headerTransparent: true,
                        headerTintColor: colors.black,
                        drawerIcon: () => (
                            <Ionicons
                                name={'help-circle'}
                                size={20}
                                color={colors.primary}
                            />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </View>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({
    itemList: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.white,
    },
})
