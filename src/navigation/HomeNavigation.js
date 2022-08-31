import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import MultiPackagesList from '../screens/MultiPackages/MultiPackagesList';
import MultiPackageDetails from '../screens/MultiPackages/MultiPackageDetails';
import I18n from 'i18n-js';
const stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <stack.Navigator 
    initialRouteName="Home" headerMode="none">
      <stack.Screen name={"Home"} component={Home} />
    </stack.Navigator>
  )
}