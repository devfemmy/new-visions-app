import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home/Home';
import colors from '../helpers/colors';
import { widthp } from '../utils/responsiveDesign';
import LogoIcon from '../assets/img/logo.svg';
import MenuIcon from '../assets/img/menu.svg';
import NotificationIcon from '../assets/img/notification.svg';
import BackIcon from '../assets/img/back.svg';
import Subject from '../screens/Subject';
import Profile from '../screens/Profile/Profile';
import ParentProfile from '../screens/Parent/Profile'
import ParentProfileNavigator from '../navigation/ParentProfileNavigator'
import { AppState } from '../context/AppState';
import Global from '../../Global';
import I18n from 'i18n-js';

const RootBottomTab = createBottomTabNavigator();

export const RootBottomTabNavigator = () => {
  const navigation = useNavigation();
  const HeaderLeft = () => (
      <TouchableOpacity
      onPress={() => navigation.openDrawer()}
        style={{
          marginLeft: 16,
        }}
      >
        <MenuIcon width={20} height={20} />
      </TouchableOpacity>
    );
  const LogoTitle = () => (
    <LogoIcon width={100} height={30} />
      )
  const HeaderRight = () => (
    <TouchableOpacity
    onPress={() => navigation.navigate('Notification')}
      style={{
        marginRight: 16,
      }}
    >
      <NotificationIcon width={20} height={20} />
    </TouchableOpacity>
  );
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
    <RootBottomTab.Navigator
      screenOptions={({route}) => ({
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: widthp(12),
        },
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name === I18n.t("Home")) {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === I18n.t("Profile")) {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === I18n.t('Subjects')) {
            iconName = focused ? 'ios-book' : 'ios-book-outline';
          } else if (route.name === I18n.t("Messages")) {
            iconName = focused ? 'ios-mail' : 'ios-mail-outline';
          } else if (route.name === I18n.t("Subscriptions")) {
            iconName = focused ? 'ios-receipt' : 'ios-receipt-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
      })}>
      <RootBottomTab.Screen name={I18n.t("Home")} component={Home} 
      options={{
        headerTitle:  (props) => <LogoTitle {...props} />,
        headerLeft: HeaderLeft,
        headerRight: HeaderRight,
        headerShown: true,
      }} 
      />
      <RootBottomTab.Screen options={{headerShown: true, headerLeft: backRight}} name={I18n.t('Subjects')} component={Subject} />
      <RootBottomTab.Screen name={I18n.t("Subscriptions")} component={Home} />
      {Global.UserType == 3 &&
        <RootBottomTab.Screen name={I18n.t("Messages")} component={Home} />
      }
      <RootBottomTab.Screen name={I18n.t("Profile")} component={(Global.UserType == 4 ? ParentProfileNavigator : Profile)} />
    </RootBottomTab.Navigator>
  );
}
