import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserInfo = async (userData, navigation) => {
    await AsyncStorage.setItem('token', userData.remember_token);
    await AsyncStorage.setItem('userId', userData.id.toString());
    await AsyncStorage.setItem('type', userData.id.toString());
    //navigation.navigate('Home');
  };

export const LoginApi = (email,password,navigation, LoginCallBack)=> {
    debugger
    axios
    .post('/login', {
      email,
      password,
    })
    .then(response => {
        
      if (
        response != undefined &&
        response.data != undefined &&
        response.data.code != undefined
      ) {
        if (response.data.code == 200) {
          const data = response.data.data;
          setUserInfo(data, navigation);
          LoginCallBack(data);
        } else {
          alert(response.data.message);
          LoginCallBack(null)
        }
      }
    })
    .catch(error => {
      alert(error.toString());
    });

}