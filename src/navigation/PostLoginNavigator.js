/* eslint-disable arrow-body-style */
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import i18n from "i18n-js";

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../helpers/colors';
import { heightp } from '../utils/responsiveDesign';
import DrawerNavigator from './DrawerNavigator';
import Notification from '../screens/Notification/Notification';
import SubjectDetails from '../screens/SubjectDetails';
import DisplaySubject from '../screens/DisplaySubject';
import Teachers from '../screens/Teachers';
import SubjectTeachers from '../screens/SubjectTeachers';
import FullLessonSubscription from '../screens/FullLessonSubscription';
import SubscriptionSuccess from '../screens/FullLessonSubscription/SuccessfulSub';

import { useContext } from 'react';
import { AppState } from '../context/AppState';
import Attendance from '../screens/Parent/Attendance';
import Subscriptions from '../screens/Parent/Subscriptions';
import Profile from '../screens/Parent/Profile';
import Calendar from '../screens/Calendar';
import BackIcon from '../assets/img/back.svg';
import MessageScreen from '../screens/Messages/MessageScreen';
import PrivateLessonSubscription from '../screens/PrivateLessonSub';

const MainStack = createStackNavigator();

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
  );
  return (
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
      })}>
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
          title: i18n.t('Notification')
        })}
      />
      <MainStack.Screen
        name="SubjectDetails"
        component={SubjectDetails}
        options={() => ({
          headerShown: true,
          title: i18n.t('Subjects')
        })}
      />
      <MainStack.Screen
        name="Teachers"
        component={Teachers}
        options={() => ({
          headerShown: true,
          title: i18n.t('Teachers')
        })}
      />
        <MainStack.Screen
        name="Calendar"
        component={Calendar}
        options={() => ({
          headerShown: true,
          title: i18n.t('Calendar')
        })}
      />
      <MainStack.Screen
        name="DisplaySubject"
        component={DisplaySubject}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title
        })}
      />
      <MainStack.Screen
        name="ChatScreen"
        component={MessageScreen}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          headerLeft: backRight
        })}
      />
        <MainStack.Screen
        name="SubjectTeachers"
        component={SubjectTeachers}
        options={({route}) => ({
          headerShown: true,
          title: 'Subject Teachers'
        })}
      />
      <MainStack.Screen
        name="FullLesson"
        component={FullLessonSubscription}
        options={({route}) => ({
          headerShown: true,
          title: 'Full Lessons Subscription'
        })}
      />
      <MainStack.Screen
        name="PrivateLesson"
        component={PrivateLessonSubscription}
        options={({route}) => ({
          headerShown: true,
          title: 'Private Lessons Subscription'
        })}
      />
      <MainStack.Screen
        name="SuccessSub"
        component={SubscriptionSuccess}
        options={({route}) => ({
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: colors.primary,
          },
        })}
      />
      <MainStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
        }}
      />

<MainStack.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={{
          title: "Subscriptions",
          headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
        }}
      />

<MainStack.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: "Attendance",
          headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
        }}
      />
    </MainStack.Navigator>
  );
}
