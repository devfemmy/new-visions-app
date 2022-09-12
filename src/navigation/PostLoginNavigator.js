/* eslint-disable arrow-body-style */
import React from 'react'
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack'
import i18n from 'i18n-js'

import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../helpers/colors'
import { heightp } from '../utils/responsiveDesign'
import DrawerNavigator from './DrawerNavigator'
import Notification from '../screens/Notification/Notification'
import SubjectDetails from '../screens/SubjectDetails'
import DisplaySubject from '../screens/DisplaySubject'
import SubjectTeachers from '../screens/SubjectTeachers'
import FullLessonSubscription from '../screens/FullLessonSubscription'
import SubscriptionSuccess from '../screens/FullLessonSubscription/SuccessfulSub'

import { useContext } from 'react'
import { AppState } from '../context/AppState'
import Attendance from '../screens/Parent/Attendance'
import Subscriptions from '../screens/Parent/Subscriptions'
import Profile from '../screens/Parent/Profile'
import Teachers from '../screens/Teachers'
import Calendar from '../screens/Calendar'
import BackIcon from '../assets/img/back.svg'
import MessageScreen from '../screens/Messages/MessageScreen'
import PrivateLessonSubscription from '../screens/PrivateLessonSub'
import I18n from 'i18n-js'
import MultiPackageDetails from '../screens/MultiPackages/MultiPackageDetails'
import PackagesList from '../screens/Packages/PackagesList'
import MultiPackagesList from '../screens/MultiPackages/MultiPackagesList'
import EducationalStage from '../screens/EducationalStages'
import TeacherProfile from '../screens/Teachers/TeacherProfile'
import MeasurementQuiz from '../screens/MeasurementQuiz'
import MeasurementTestResults from '../screens/MeasurementTestResults'
import JointCourses from '../screens/JointCourses'
import Settings from '../screens/Settings'
import WhoWeAre from '../screens/WhoWeAre'
import DeleteMembership from '../screens/DeleteMembership'
import Exit from '../screens/Exit'
import PackagesStage from '../screens/Packages/PackagesStage'
import MultiPackagesStage from '../screens/MultiPackages/MultiPackagesStage'
import EditProfile from '../screens/Parent/EditProfile'
import LiveNowQuiz from '../screens/LiveNowQuiz'
import WebViewComponent from '../screens/WebView'
import PrivateSubjectSubscribe from '../screens/PrivateSubjectSubscribe'
import { Loader } from '../components/Loader'
import { useAppSelector } from '../redux/hooks'
import { CompleteProfile } from '../screens/auth/CompleteProfile'
const MainStack = createStackNavigator()

export const PostLoginNavigator = () => {
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
    const {loading} = useAppSelector(state => state.app)
    return (
        <>
        {/* <Loader visible={loading}/> */}
                <MainStack.Navigator
            initialRouteName="Home"
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
            <MainStack.Screen
                name="Home"
                component={DrawerNavigator}
                options={() => ({
                    headerShown: false,
                })}
            />
            <MainStack.Screen
                name="Notification"
                component={Notification}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('Notification'),
                })}
            />
            <MainStack.Screen
                name="CompleteProfile"
                component={CompleteProfile}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('Profile'),
                })}
            />
            <MainStack.Screen
                name="SubjectDetails"
                component={SubjectDetails}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('Subjects'),
                })}
            />
            <MainStack.Screen
                name="Teachers"
                component={Teachers}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('Teachers'),
                })}
            />
            <MainStack.Screen
                name="Calendar"
                component={Calendar}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('Calendar'),
                })}
            />
            <MainStack.Screen
                name="MeasurementQuiz"
                component={MeasurementQuiz}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('MeasurementQuiz'),
                })}
            />
            <MainStack.Screen
                name="MeasurementTestResults"
                component={MeasurementTestResults}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('MeasurementTestResults'),
                })}
            />
            <MainStack.Screen
                name="JointCourses"
                component={JointCourses}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('JointCourses'),
                })}
            />
            <MainStack.Screen
                name="Settings"
                component={Settings}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('Settings'),
                })}
            />
            <MainStack.Screen
                name="WhoWeAre"
                component={WhoWeAre}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('WhoWeAre'),
                })}
            />
            <MainStack.Screen
                name="DeleteMembership"
                component={DeleteMembership}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('WhoWeAre'),
                })}
            />
            <MainStack.Screen
                name="Exit"
                component={Exit}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('WhoWeAre'),
                })}
            />
            <MainStack.Screen
                name="EducationalStage"
                component={EducationalStage}
                options={() => ({
                    headerShown: true,
                    title: i18n.t('EducationalLevel'),
                })}
            />
            <MainStack.Screen
                name="TeacherProfile"
                component={TeacherProfile}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                })}
            />
            <MainStack.Screen
                name="DisplaySubject"
                component={DisplaySubject}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                })}
            />
            <MainStack.Screen
                name="ChatScreen"
                component={MessageScreen}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerLeft: backRight,
                })}
            />
            <MainStack.Screen
                name="SubjectTeachers"
                component={SubjectTeachers}
                options={({ route }) => ({
                    headerShown: true,
                    title: i18n.t('SubjectTeachers'),
                })}
            />
            <MainStack.Screen
                name="FullLesson"
                component={FullLessonSubscription}
                options={({ route }) => ({
                    headerShown: true,
                    title: i18n.t('FullLessonSubscription'),
                })}
            />
            <MainStack.Screen
                name="PrivateSubjectSubscribe"
                component={PrivateSubjectSubscribe}
                options={({ route }) => ({
                    headerShown: true,
                    headerLeft: backRight,
                    title: i18n.t('PrivateSubjectSubscribe'),
                })}
            />
            <MainStack.Screen
                name="PrivateLesson"
                component={PrivateLessonSubscription}
                options={({ route }) => ({
                    headerShown: true,
                    title: i18n.t('PrivateLessonsSubscriptions'),
                })}
            />
            <MainStack.Screen
                name="SuccessSub"
                component={SubscriptionSuccess}
                options={({ route }) => ({
                    headerShown: false,
                    title: '',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                })}
            />
            <MainStack.Screen
                name="WebView"
                component={WebViewComponent}
                options={{
                    title: '',
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <MainStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Profile',
                    headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <MainStack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    title: I18n.t('EditProfile'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />

            <MainStack.Screen
                name="PackagesList"
                component={PackagesList}
                options={{
                    title: I18n.t('Packages'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <MainStack.Screen
                name="PackagesStage"
                component={PackagesStage}
                options={{
                    title: I18n.t('EducationalLevel'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />

            <MainStack.Screen
                name="MultiPackagesList"
                component={MultiPackagesList}
                options={{
                    title: I18n.t('MultiPackages'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />

            <MainStack.Screen
                name="MultiPackagesStage"
                component={MultiPackagesStage}
                options={{
                    title: I18n.t('EducationalLevel'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />

            <MainStack.Screen
                name="MultiPackageDetails"
                component={MultiPackageDetails}
                options={{
                    title: I18n.t('Details'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <MainStack.Screen
                options={{
                    title: I18n.t('Subscriptions'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
                name={'Subscriptions'}
                component={Subscriptions}
            />
            <MainStack.Screen
                options={{
                    title: I18n.t('Attendance'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
                name={'Attendance'}
                component={Attendance}
            />
            <MainStack.Screen
                name={'LiveNowQuiz'}
                component={LiveNowQuiz}
                options={{
                    title: I18n.t('MeasurementQuiz'),
                    headerShown: true,
                    headerLeft: backRight,
                }}
            />
        </MainStack.Navigator>
        </>
    )
}
