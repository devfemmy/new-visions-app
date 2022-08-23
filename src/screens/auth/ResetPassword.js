import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Button, Text} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyConfirmPassword({route, navigation}) {
  const {t, i18n} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [PasswordInput, setPassword] = useState('');
  const [PasswordConfirmationInput, setPasswordConfirmation] = useState('');
  const VerifyAPI = () => {
    setLoading(true);
    axios
      .post('https://www.newvisions.sa/api/resetPassword', {
        email: route.params.email != undefined ? route.params.email : null,
        phone: route.params.phone != undefined ? route.params.phone : null,
        password: PasswordInput,
        password_confirmation: PasswordConfirmationInput,
      })
      .then(function (response) {
        if (JSON.stringify(response.data.code) == 200) {
          setLoading(false);
          alert(t('PasswordChangeComplete'));
          setUserInfo(response.data.data);
          navigation.navigate('Home');
        } else {
          alert(JSON.stringify(response.data.message));
          setLoading(false);
        }
      })
      .catch(function (error) {
        alert(error);
        setLoading(false);
      });
  };
  const setUserInfo = async userData => {
    await AsyncStorage.setItem('token', userData.remember_token);
    await AsyncStorage.setItem('userId', userData.id.toString());
    await AsyncStorage.setItem('type', userData.id.toString());
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={loading}
        style={loading ? styles.loading : {display: 'none'}}
        size="large"
        color="#9bba52"
      />
      <ImageBackground
        source={require('../../assets/img/BG.png')}
        style={styles.backgroundImage}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(StackActions.pop(1));
            }}>
            <MaterialIcons name="arrow-back-ios" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontFamily: 'Tajawal-Regular',
              textAlign: 'center',
            }}>
            {t('EnterNewPassword')}
          </Text>
          <View></View>
        </View>
        <View style={styles.content}>
          <Text
            style={(styles.text, {marginTop: 20, color: 'gray', fontSize: 18})}>
            {t('Password')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              alignItems: 'center',
              width: '100%',
            }}>
            <TextInput
              activeUnderlineColor="rgb(0,0,0)"
              style={{
                marginBottom: 15,
                height: 50,
                backgroundColor: 'rgb(72,82,94)',
                opacity: 0.5,
                borderBottomColor: 'white',
                width: '100%',
              }}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={PasswordInput}
              right={<TextInput.Icon color="white" name="lock" />}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={(styles.text, {color: 'gray', fontSize: 18})}>
            {t('ConfirmPassword')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              alignItems: 'center',
              width: '100%',
            }}>
            <TextInput
              activeUnderlineColor="rgb(0,0,0)"
              style={{
                marginBottom: 15,
                height: 50,
                backgroundColor: 'rgb(72,82,94)',
                opacity: 0.5,
                borderBottomColor: 'white',
                width: '100%',
              }}
              secureTextEntry={true}
              onChangeText={setPasswordConfirmation}
              value={PasswordConfirmationInput}
              right={<TextInput.Icon color="white" name="lock" />}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10%',
          }}>
          <Button
            buttonStyle={[
              {backgroundColor: 'white', borderRadius: 20, width: 150},
            ]}
            title={t('ChangePassword')}
            titleStyle={{color: 'rgb(62,72,84)', fontSize: 20}}
            onPress={() => VerifyAPI()}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc57',
  },
  container: {flex: 1},
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
  },
  icon: {
    marginBottom: 15,
  },
  textbold: {
    color: 'white',
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: 'yellowgreen',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'yellowgreen',
  },

  underlineStyleHighLighted: {
    borderColor: 'yellowgreen',
  },
});
