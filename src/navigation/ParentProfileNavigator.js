import { View, Text } from 'react-native'
import React from 'react'
import Sons from '../screens/Parent/Sons';
import Subscriptions from '../screens/Parent/Subscriptions';
import Attendance from '../screens/Parent/Attendance';
import I18n from 'i18n-js';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Parent/Profile';
const stack = createStackNavigator();


export default function ParentProfileNavigator() {
  return (
    <stack.Navigator 
    initialRouteName="Profile" headerMode="none">
      <stack.Screen name={"Profile"} component={Profile} />
      <stack.Screen name={"Subscriptions"} component={Subscriptions} />
      <stack.Screen name={"Attendance"} component={Attendance} />

    </stack.Navigator>
  )
}