import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import UserType from '../screens/Landing/UserType';
import WelcomeStep from '../screens/Landing/WelcomeStep';

const Stack = createNativeStackNavigator();

const PreLoginNavigator = () => (
    <Stack.Navigator initialRouteName="UserType" headerMode="none">
      <Stack.Screen 
      name="UserType"
      component={UserType}
      options={{
        title: 'UserType',
        headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
      }}
      />
      <Stack.Screen 
      name="WelcomeStep"
      component={WelcomeStep}
      options={{
        title: 'WelcomeStep',
        headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push',*/,
      }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false /*animationTypeForReplace: state.isSignout ? 'pop' : 'push', */,
        }}
      />
    </Stack.Navigator>
  );

export default PreLoginNavigator;
