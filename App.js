import React from 'react';
import { Provider } from "react-redux";
import AppNavigator from './src/navigation/AppNavigator';
import {AppState} from './src/context/AppState';
import {initTranslate} from './translate/translate';
import 'react-native-gesture-handler';
import { setInterceptors } from './src/api/client';
import store from './src/redux/store';
import Global from './Global';

initTranslate();
setInterceptors();
export default function App() {
  return (
    <Provider store={store}>
      <AppState>
        <AppNavigator />
      </AppState>
    </Provider>
  );
}
