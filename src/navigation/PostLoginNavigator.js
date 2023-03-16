/* eslint-disable arrow-body-style */
import React from 'react'
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack'
import i18n from 'i18n-js'

import { TouchableOpacity } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
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
import { AppContext, AppState } from '../context/AppState'
import Attendance from '../screens/Parent/Attendance'
import Subscriptions from '../screens/Parent/Subscriptions'
import Profile from '../screens/Parent/Profile'
import Teachers from '../screens/Teachers'
import Calendar from '../screens/Calendar'
import BackIcon from '../assets/img/back.svg'
import ForwardIcon from '../assets/img/forward.svg'
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
import HomeSubject from '../screens/Home/NewSubject'
const MainStack = createStackNavigator()

export const PostLoginNavigator = () => {
    const navigation = useNavigation()
    const { lang } = useContext(AppContext)
    const popAction = StackActions.pop(0)
    const backRight = () => (
        <TouchableOpacity
            onPress={() => {
                // navigation.goBack()
                navigation.dispatch(popAction)
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
    const { loading } = useAppSelector((state) => state.app)
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
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
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
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="CompleteProfile"
                    component={CompleteProfile}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('Profile'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="SubjectDetails"
                    component={SubjectDetails}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('Subjects'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="Teachers"
                    component={Teachers}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('Teachers'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="Calendar"
                    component={Calendar}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('Calendar'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="MeasurementQuiz"
                    component={MeasurementQuiz}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('MeasurementQuiz'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="MeasurementTestResults"
                    component={MeasurementTestResults}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('QuizzesResults'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="JointCourses"
                    component={MultiPackagesStage}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('EducationalLevel'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="Settings"
                    component={Settings}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('Settings'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="WhoWeAre"
                    component={WhoWeAre}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('WhoWeAre'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="DeleteMembership"
                    component={DeleteMembership}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('WhoWeAre'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="Exit"
                    component={Exit}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('WhoWeAre'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="EducationalStage"
                    component={EducationalStage}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('EducationalLevel'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="TeacherProfile"
                    component={TeacherProfile}
                    options={({ route }) => ({
                        headerShown: true,
                        title: route.params.title,
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="TeacherCourse"
                    component={TeacherCourse}
                    options={({ route }) => ({
                        headerShown: true,
                        title: i18n.t('TeacherCourse'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="DisplaySubject"
                    component={DisplaySubject}
                    options={({ route }) => ({
                        headerShown: true,
                        title: route.params.title,
                        headerLeft: backRight,
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
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="FullLesson"
                    component={FullLessonSubscription}
                    options={({ route }) => ({
                        headerShown: true,
                        title: i18n.t('FullLessonSubscription'),
                        headerLeft: backRight,
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
                        headerLeft: backRight,
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
                        headerLeft: backRight,
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
                        headerLeft: backRight,
                    }}
                />

                <MainStack.Screen
                    name="PackagesList"
                    component={PackagesList}
                    options={{
                        title: I18n.t('Packages'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    name="PackagesStage"
                    component={PackagesStage}
                    options={{
                        title: I18n.t('EducationalLevel'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />

                <MainStack.Screen
                    name="MultiPackagesList"
                    component={MultiPackagesList}
                    options={{
                        title: I18n.t('MultiPackages'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />

                <MainStack.Screen
                    name="MultiPackagesStage"
                    component={MultiPackagesStage}
                    options={{
                        title: I18n.t('EducationalLevel'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />

                <MainStack.Screen
                    name="MultiPackageDetails"
                    component={MultiPackageDetails}
                    options={{
                        title: I18n.t('Details'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    name="ParentSub"
                    component={ParentSubscription}
                    options={{
                        title: I18n.t('Subscribefor'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    options={{
                        title: I18n.t('Subscriptions'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                    name={'Subscriptions'}
                    component={Subscriptions}
                />
                <MainStack.Screen
                    options={{
                        title: I18n.t('Attendance'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                    name={'Attendance'}
                    component={Attendance}
                />
                <MainStack.Screen
                    options={{
                        title: I18n.t('QuizResults'),
                        headerShown: true,
                        headerLeft: backRight,
                    }}
                    name={'AttendanceResult'}
                    component={AttendanceResult}
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
                <MainStack.Screen
                    name={'LiveNowQuizResult'}
                    component={LiveNowQuizResult}
                    options={{
                        title: I18n.t('QuizzesResults'),
                        headerShown: true,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    name="FazaPackagesStage"
                    component={FazaPackagesStage}
                    options={{
                        title: I18n.t('EducationalLevel'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    name="FazaEducationalStage"
                    component={FazaEducationalStage}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('EducationalLevel'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="FazaReviewCourses"
                    component={FazaReviewCourses}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('EducationalLevel'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="FazaSubscription"
                    component={FazaSubscription}
                    options={() => ({
                        headerShown: true,
                        title: '',
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="FreeLessons"
                    component={FreeLessons}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('FreeLive'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="StudentGuide"
                    component={StudentGuide}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('StudyGuide'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="ChooseStudyDate"
                    component={ChooseStudyDate}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('ChooseDay'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="GuideQuestionnaire"
                    component={GuideQuestionnaire}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('GuideQuestionnaire'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name={'AllMeasurementQuizQuestion'}
                    component={AllMeasurementQuizQuestion}
                    options={{
                        title: I18n.t('AllMeasurementQuesion'),
                        headerShown: true,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    name="AllMeasurementQuiz"
                    component={AllMeasurementQuiz}
                    options={() => ({
                        headerShown: true,
                        title: i18n.t('AllMeasurementQuiz'),
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="AllMeasurementStage"
                    component={AllMeasurementStage}
                    options={{
                        title: I18n.t('EducationalLevel'),
                        headerShown: true /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
                        headerLeft: backRight,
                    }}
                />
                <MainStack.Screen
                    name="GuideProfile"
                    component={GuideProfile}
                    options={({ route }) => ({
                        headerShown: true,
                        title: route.params.title,
                        headerLeft: backRight,
                    })}
                />
                <MainStack.Screen
                    name="HomeSubject"
                    component={HomeSubject}
                    options={({ route }) => ({
                        headerShown: true,
                        title: route.params.title,
                        headerLeft: backRight,
                    })}
                />
            </MainStack.Navigator>
        </>
    )
}
