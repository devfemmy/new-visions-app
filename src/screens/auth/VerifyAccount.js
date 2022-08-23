import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Icon, Button, Text} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyAccount({route, navigation}) {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const [loading, setLoading] = useState(false);
  const [CodeInput, setCodeInput] = React.useState('');

  const VerifyAPI = () => {
    setLoading(true);
    axios
      .post('https://www.newvisions.sa/api/verifyAccount', {
        email: route.params.email,
        code: CodeInput,
      })
      .then(response => {
        if (JSON.stringify(response.data.code) == 200) {
          const data = response.data.data;
          setUserInfo(data);
          setLoading(false);
          navigation.navigate('Home');
        } else {
          alert(JSON.stringify(response.data.message));
          setLoading(false);
        }
      })
      .catch(error => {
        alert(error);
        setLoading(false);
      });
  };
  const setUserInfo = async (userData) => {
    await AsyncStorage.setItem('token', userData.remember_token);
    await AsyncStorage.setItem('userId', userData.id.toString());
    await AsyncStorage.setItem('type', userData.id.toString());
  }
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
        <View style={{flex: 0.8}} />
        <View style={styles.content}>
          <Icon
            style={styles.icon}
            color="rgb(62,72,84)"
            type="font-awesome"
            name="paper-plane"
            size={90}
          />
          <Text style={styles.textbold}> {t('ConfrimCodeSend')} </Text>
          <Text style={(styles.text, {marginTop: 20, color: 'gray'})}>
            {t('VerificationCode')}
          </Text>
          <View style={{justifyContent: 'center'}}>
            <TextInput
              textAlign={lang === 'ar' ? 'right' : 'left'}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 50,
              }}
              onChangeText={input => setCodeInput(input)}
              value={CodeInput}
              activeOutlineColor="gray"
              underlineColor="gray"
              activeUnderlineColor="gray"
              underlineColorAndroid="gray"
            />
          </View>
          <View style={{alignItems: 'stretch', flexDirection: 'row', flex: 1}}>
            <Button
              buttonStyle={[
                {
                  backgroundColor: 'rgb(62,72,84)',
                  borderRadius: 20,
                  width: 350,
                },
              ]}
              titleStyle={{fontSize: 20}}
              title={t('Next')}
              onPress={() => VerifyAPI()}
            />
          </View>
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
    flex: 5,
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    marginBottom: 15,
  },
  textbold: {
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: 'yellowgreen',
  },

  underlineStyleBase: {
    // width: layout.widthPixel(38),
    // height: layout.heightPixel(40),
    borderWidth: 1,
    color: 'yellowgreen',
  },

  underlineStyleHighLighted: {
    // borderColor: 'yellowgreen',
  },
});
