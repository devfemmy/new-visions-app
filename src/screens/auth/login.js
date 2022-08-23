import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import Screen from "../../components/Screen";
import colors from "../../helpers/colors";
import LoginForm from "./LoginForm";

import { AppContext } from "../../context/AppState";
import LoginApi from "../../api/Login/LoginApi";
import axios from "axios";
import Global from "../../../Global";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Login({ navigation }) {
  const { changeLang, lang, showLoadingSpinner, initUUID, onLogin } =
    useContext(AppContext);

  const submitLogin = (values) => {
    showLoadingSpinner(true);
    axios
      .post('https://mo.visionsplus.net/api/login', {
        email: values.email,
        password: values.password,
      })
      .then(response => {
        if (
          response != undefined &&
          response.data != undefined &&
          response.data.code != undefined
        ) {
          if (response.data.code == 200) {
            const data = response.data.data;
            setUserInfo(data);
          } else {
            showLoadingSpinner(false);
            alert(response.data.message);
          }
        }
      })
      .catch(error => {
        showLoadingSpinner(false);
        alert(error);
      });
  };

  const setUserInfo = userData => {
    showLoadingSpinner(false);
    Global.AuthenticationToken = userData.remember_token;
    AsyncStorage.setItem('token', Global.AuthenticationToken);
    Global.Image = userData.image;
    Global.UserName = userData.first_name + userData.last_name;
    Global.phone = userData.phone;
    Global.email = userData.email;
    onLogin(userData, true);
  };

  return (
    <Screen>
      <ImageBackground source={require('../../assets/img/BG.png')} style={styles.backgroundImage}>
      
      <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.center}>
      <Image style={styles.logo} source={require('../../assets/img/logo-light.png')}></Image>
        
      <LoginForm submitLogin={submitLogin} />
      </View>
      </ScrollView>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  backgroundImage:{
    resizeMode:'stretch',
    flex:1,
  },
  logo:{
    height:100,
    width:280,
    marginVertical:50,
    resizeMode:'stretch'
  },
  container: {
    flexDirection: "column",
  },
  incontainer: {
    alignSelf: "center",
    justifyContent:'center',
    alignItems:'center',
    flexDirection: "column",
    width:'90%'
  },
});

export default Login;
