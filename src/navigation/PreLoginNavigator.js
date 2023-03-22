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
import RegisterUserData from '../screens/newAuthentication/RegisterUserData'
import RegisterStages from '../screens/newAuthentication/RegisterStages'
import { AuthStackNavigator } from './AuthStackNavigator'
import HomeSubject from '../screens/Home/NewSubject'
//

import DrawerNavigator from './DrawerNavigator'
import Notification from '../screens/Notification/Notification'
import SubjectDetails from '../screens/SubjectDetails'
import DisplaySubject from '../screens/DisplaySubject'
import SubjectTeachers from '../screens/SubjectTeachers'
import FullLessonSubscription from '../screens/FullLessonSubscription'
import SubscriptionSuccess from '../screens/FullLessonSubscription/SuccessfulSub'
import Attendance from '../screens/Parent/Attendance'
import Subscriptions from '../screens/Parent/Subscriptions'
import Profile from '../screens/Parent/Profile'
import Teachers from '../screens/Teachers'
import Calendar from '../screens/Calendar'
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
import LiveNowQuizResult from '../screens/LiveNowQuizResult'
import AttendanceResult from '../screens/AttendanceResult'
import TeacherCourse from '../screens/Teachers/TeacherCourse'
import ParentSubscription from '../screens/ParentSubscription'
import FazaPackagesStage from '../screens/Faza/FazaPackages'
import FazaEducationalStage from '../screens/Faza/FazaEducationalStage'
import FazaReviewCourses from '../screens/Faza/FazaReviewCourses'
import FazaSubscription from '../screens/Faza/FazaSubscription'
import FreeLessons from '../screens/FreeLessons'
import StudentGuide from '../screens/StudentGuide'
import ChooseStudyDate from '../screens/StudentGuide/ChooseDate'
import GuideQuestionnaire from '../screens/StudentGuide/GuideQuestionnaire'
import AllMeasurementQuiz from '../screens/AllMeasurementQuiz'
import AllMeasurementQuizQuestion from '../screens/AllMeasurementQuiz/AllMeasurementQuizQuestion'
import AllMeasurementStage from '../screens/AllMeasurementQuiz/AllMeasurementStage'
import GuideProfile from '../screens/StudentGuide/GuideProfile'
import { faListSquares } from '@fortawesome/free-solid-svg-icons'

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
                <BackIcon width={20} height={20} />
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
                name="LoginModal"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
            <Stack.Screen
                name="RegisterUserData"
                component={RegisterUserData}
                options={() => ({
                    headerShown: true,
                    title: '',
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="RegisterStages"
                component={RegisterStages}
                options={() => ({
                    headerShown: true,
                    title: '',
                    headerLeft: backRight,
                })}
            />
            {/* <Stack.Screen
                name="HomePage"
                component={AuthStackNavigator}
                options={() => ({
                    headerShown: false,
                })}
            /> */}
            <Stack.Screen
                name="Home"
                component={DrawerNavigator}
                options={() => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Notification"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="CompleteProfile"
                component={CompleteProfile}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('Profile'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="SubjectDetails"
                component={SubjectDetails}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('Subjects'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="Teachers"
                component={Teachers}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('Teachers'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="Calendar"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="MeasurementQuiz"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="MeasurementTestResults"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="JointCourses"
                component={MultiPackagesStage}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('EducationalLevel'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('Settings'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="WhoWeAre"
                component={WhoWeAre}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('WhoWeAre'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="DeleteMembership"
                component={DeleteMembership}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('WhoWeAre'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="Exit"
                component={Exit}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('WhoWeAre'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="EducationalStage"
                component={EducationalStage}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('EducationalLevel'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="TeacherProfile"
                component={TeacherProfile}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="TeacherCourse"
                component={TeacherCourse}
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="DisplaySubject"
                component={DisplaySubject}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="ChatScreen"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="SubjectTeachers"
                component={SubjectTeachers}
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="FullLesson"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="PrivateSubjectSubscribe"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="PrivateLesson"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="SuccessSub"
                component={SubscriptionSuccess}
                options={({ route }) => ({
                    headerShown: false,
                    title: '',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="WebView"
                component={WebViewComponent}
                options={{
                    title: '',
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="EditProfile"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />

            <Stack.Screen
                name="PackagesList"
                component={PackagesList}
                options={{
                    title: I18n.t('Packages'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />
            <Stack.Screen
                name="PackagesStage"
                component={PackagesStage}
                options={{
                    title: I18n.t('EducationalLevel'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />

            <Stack.Screen
                name="MultiPackagesList"
                component={MultiPackagesList}
                options={{
                    title: I18n.t('MultiPackages'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />

            <Stack.Screen
                name="MultiPackagesStage"
                component={MultiPackagesStage}
                options={{
                    title: I18n.t('EducationalLevel'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />

            <Stack.Screen
                name="MultiPackageDetails"
                component={MultiPackageDetails}
                options={{
                    title: I18n.t('Details'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />
            <Stack.Screen
                name="ParentSub"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                options={{
                    title: I18n.t('Subscriptions'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
                name={'Subscriptions'}
                component={Subscriptions}
            />
            <Stack.Screen
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
                name={'Attendance'}
            />
            <Stack.Screen
                options={{
                    title: I18n.t('QuizResults'),
                    headerShown: true,
                    headerLeft: backRight,
                }}
                name={'AttendanceResult'}
                component={AttendanceResult}
            />
            <Stack.Screen
                name={'LiveNowQuiz'}
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name={'LiveNowQuizResult'}
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="FazaPackagesStage"
                component={FazaPackagesStage}
                options={{
                    title: I18n.t('EducationalLevel'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />
            <Stack.Screen
                name="FazaEducationalStage"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="FazaReviewCourses"
                component={FazaReviewCourses}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('EducationalLevel'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="FazaSubscription"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="FreeLessons"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="StudentGuide"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="ChooseStudyDate"
                component={ChooseStudyDate}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('ChooseDay'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="GuideQuestionnaire"
                component={GuideQuestionnaire}
                options={() => ({
                    headerShown: true,
                    title: I18n.t('GuideQuestionnaire'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name={'AllMeasurementQuizQuestion'}
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="AllMeasurementQuiz"
                component={Login}
                options={() => ({
                    headerShown: false,
                    presentation: 'modal',
                    title: I18n.t('StudyGuide'),
                    headerLeft: backRight,
                })}
            />
            <Stack.Screen
                name="AllMeasurementStage"
                component={AllMeasurementStage}
                options={{
                    title: I18n.t('EducationalLevel'),
                    headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                    headerLeft: backRight,
                }}
            />
            <Stack.Screen
                name="GuideProfile"
                component={GuideProfile}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerLeft: backRight,
                })}
            />

            <Stack.Screen
                name="HomeSubject"
                component={HomeSubject}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
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
