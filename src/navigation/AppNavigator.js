import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import PreLoginNavigator from './PreLoginNavigator';
import LoadingScreen from '../screens/LoadingScreen';

import {AppContext} from '../context/AppState';
import navigationTheme from './navigationTheme';
import { PostLoginNavigator } from './PostLoginNavigator';
import Global from '../../Global';


export default function AppNavigator() {
  const {isLoading, user, initUUID} = useContext(AppContext);
  
  useEffect(() => {
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer theme={navigationTheme}>
      {user === null ? <PreLoginNavigator /> : <PostLoginNavigator />}
    </NavigationContainer>
  );
}
