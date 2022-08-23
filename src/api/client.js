import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import i18n from 'i18n-js';
//import { useContext } from 'react';
import { Platform } from 'react-native';
import { AppContext } from '../context/AppState';
import { API_URL_Prod } from "../helpers/common";

export const setInterceptors = ()=>{
    //const { onLogout, lang } = useContext(AppContext);

    axios.interceptors.request.use(
        async config => {
          const authToken = await AsyncStorage.getItem('token');
          if (authToken != null) {
            config.headers.Authorization = 'Bearer ' + authToken;
          }
          debugger
          config.baseURL = API_URL_Prod;
          config.headers.version = '2';
          config.headers.platform = Platform.OS === 'ios' ? 'IOS' : 'Android';
          config.headers['content-type'] = 'application/json';
          config.headers.Accept = 'application/json';
          config.headers.lang = i18n.locale;
          return config;
        },
        error => Promise.reject(error),
      );
      axios.interceptors.response.use(
        function (response) {
          if (
            response != undefined &&
            response.data != undefined &&
            response.data.code != undefined
          ) {
            if (response.data.code == 403) {
              alert('This Account is Logged in from another Device.');
              return response;
            } else if (response.data.code == 402) {
              alert('kindly update mobile application to be able to use it');
              //onLogout();
            } else if (response.data.code == 406) {
              alert(
                'This Account is missing some Data. Please filled the missing information',
              );
              // replace('EditDataForm');
            } else if (response.data.code == 407) {
              const {data} = response.data;
              
            } else {
              return response;
            }
          } else {
            console.log(response);
            alert('حدث خطأ ما يرجى المحاولة لاحقا');
            return;
          }
        },
        function (error) {
          if (error.toJSON().message == 'Network Error') {
            alert('يرجى التأكد من الاتصال بالانترنت');
          } else {
            alert('خطأ ما يرجى المحاولة لاحقا');
          }
          return Promise.reject(error);
        },
      );
};