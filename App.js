import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import AppNavigator from './src/navigation/AppNavigator';
import {AppState} from './src/context/AppState';
import {initTranslate} from './translate/translate';
import 'react-native-gesture-handler';
import { setInterceptors } from './src/api/client';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import store from './src/redux/store';
import Global from './Global';
import { NotificationListener, requestUserPermission } from './utils/pushNotification';

initTranslate();
setInterceptors();
export default function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])
  return (
    <Provider store={store}>
      <AppState>
        <AppNavigator />
      </AppState>
    </Provider>
  );
}
