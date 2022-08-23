import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {TextInput} from 'react-native-paper';
import {Input, Button, Text, CheckBox, Icon} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StackActions} from '@react-navigation/native';

export default function Registration({navigation}) {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const [loading, setLoading] = useState(false);


  // const [FirstNameInput, onChangeFirstNameInput] = useState('Ebrahim');
  // const [LastNameInput, onChangeLastNameInput] = useState('Hanna');
  // const [EmailInput, onChangeEmailInput] = useState('ebha@gmail.com');
  // const [PasswordInput, onChangePasswordInput] = useState('123456789');
  // const [PasswordConfrimInput, onChangePasswordConfrimInput] =
  //   useState('123456789');
  // const [PhoneInput, onChangePhoneInput] = useState('12345678911');


  const [FirstNameInput, onChangeFirstNameInput] = useState('');
  const [LastNameInput, onChangeLastNameInput] = useState('');
  const [EmailInput, onChangeEmailInput] = useState('');
  const [PasswordInput, onChangePasswordInput] = useState('');
  const [PasswordConfrimInput, onChangePasswordConfrimInput] =
    useState('');
  const [PhoneInput, onChangePhoneInput] = useState('');
  const [eye, seteye] = useState('eye-off');
  const [termsAndServices, setTermsAndServices] = useState(false);
  const [gender, setGender] = useState(0);
  const [showhide, setshowhide] = useState(true);
  const showPassword = () => {
    if (eye === 'eye-off') {
      seteye('eye');
      setshowhide(false);
    } else {
      seteye('eye-off');
      setshowhide(true);
    }
  };

  const SignupAPI = () => {
    setLoading(true);
    axios
      .post('https://www.newvisions.sa/api/signup', {
        first_name: FirstNameInput,
        last_name: LastNameInput,
        email: EmailInput,
        password: PasswordInput,
        password_confirmation: PasswordConfrimInput,
        phone: PhoneInput,
        gender: gender ? 2 : 1,
        type: 3,
      })
      .then(function (response) {
        if (JSON.stringify(response.data.code) == 200) {
          //   alert('Success, please verify via email');
          setLoading(false);
          navigation.navigate('VerifyAccount', {
            email: EmailInput,
          });
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

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator
        animating={loading}
        style={loading ? styles.loading : {display: 'none'}}
        size="large"
        color="#9bba52"
      />
      <ImageBackground
        source={require('../../assets/img/BG.png')}
        style={styles.backgroundImage}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(StackActions.pop(1));
              }}>
              <MaterialIcons
                name="arrow-back-ios"
                size={20}
                style={{paddingRight: 5}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'Tajawal-Regular',
              }}>
              {t('Registration')}
            </Text>
            <View></View>
          </View>
          <View>
            <View style={[lang === 'ar' ? styles.labelAr : styles.label]}>
              <Icon
                name="user"
                type="font-awesome"
                style={{paddingRight: 5, paddingLeft: 5}}
              />
              <Text style={{fontSize: 16}}>{t('FirstName')}</Text>
            </View>
            <Input
              textAlign={lang == 'ar' ? 'right' : 'left'}
              style={{backgroundColor: 'white', borderRadius: 10}}
              onChangeText={onChangeFirstNameInput}
              value={FirstNameInput}
            />
            <View style={[lang === 'ar' ? styles.labelAr : styles.label]}>
              <Icon
                name="user"
                type="font-awesome"
                style={{paddingRight: 5, paddingLeft: 5}}
              />
              <Text style={{fontSize: 16}}>{t('LastName')}</Text>
            </View>
            <Input
              textAlign={lang == 'ar' ? 'right' : 'left'}
              style={{backgroundColor: 'white', borderRadius: 10}}
              onChangeText={onChangeLastNameInput}
              value={LastNameInput}
            />

            <View style={[lang === 'ar' ? styles.labelAr : styles.label]}>
              <Icon
                name="envelope"
                type="font-awesome"
                style={{paddingRight: 5, paddingLeft: 5}}
              />
              <Text style={{fontSize: 16}}>{t('Email')}</Text>
            </View>
            <Input
              textAlign={lang == 'ar' ? 'right' : 'left'}
              style={{backgroundColor: 'white', borderRadius: 10}}
              keyboardType="email-address"
              onChangeText={onChangeEmailInput}
              value={EmailInput}
            />

            <View
              style={{
                flexDirection: lang == 'ar' ? 'row-reverse' : 'row',
                marginHorizontal: 15,
                marginBottom: 5,
              }}>
              <Icon name="lock" color="#000000" style={{paddingRight: 5}} />
              <Text style={{fontSize: 16}}>{t('Password')}</Text>
            </View>
            {lang == 'ar' ? (
              <TextInput
                activeUnderlineColor="rgb(255,255,255)"
                textAlign="right"
                style={{
                  textAlign: 'right',
                  marginHorizontal: 10,
                  marginBottom: 15,
                  height: 50,
                  backgroundColor: 'white',
                }}
                onChangeText={onChangePasswordInput}
                value={PasswordInput}
                secureTextEntry={showhide}
                left={
                  <TextInput.Icon
                    onPress={() => {
                      showPassword();
                    }}
                    name={eye}
                  />
                }
              />
            ) : (
              <TextInput
                activeUnderlineColor="rgb(255,255,255)"
                style={{
                  marginHorizontal: 10,
                  marginBottom: 15,
                  height: 50,
                  backgroundColor: 'white',
                }}
                onChangeText={onChangePasswordInput}
                value={PasswordInput}
                secureTextEntry={showhide}
                right={
                  <TextInput.Icon
                    onPress={() => {
                      showPassword();
                    }}
                    name={eye}
                  />
                }
              />
            )}

            <View
              style={{
                flexDirection: lang == 'ar' ? 'row-reverse' : 'row',
                marginHorizontal: 15,
                marginBottom: 5,
              }}>
              <Icon name="lock" color="#000000" style={{paddingRight: 5}} />
              <Text style={{fontSize: 16}}>{t('ConfirmPassword')}</Text>
            </View>

            {lang == 'ar' ? (
              <TextInput
                activeUnderlineColor="rgb(255,255,255)"
                textAlign="right"
                style={{
                  textAlign: 'right',
                  marginHorizontal: 10,
                  marginBottom: 15,
                  height: 50,
                  backgroundColor: 'white',
                }}
                onChangeText={onChangePasswordConfrimInput}
                value={PasswordConfrimInput}
                secureTextEntry={showhide}
                left={
                  <TextInput.Icon
                    onPress={() => {
                      showPassword();
                    }}
                    name={eye}
                  />
                }
              />
            ) : (
              <TextInput
                activeUnderlineColor="rgb(0,0,0)"
                style={{
                  marginHorizontal: 10,
                  marginBottom: 15,
                  height: 50,
                  backgroundColor: 'white',
                }}
                onChangeText={onChangePasswordConfrimInput}
                value={PasswordConfrimInput}
                secureTextEntry={showhide}
                right={
                  <TextInput.Icon
                    onPress={() => {
                      showPassword();
                    }}
                    name={eye}
                  />
                }
              />
            )}
            <View style={[lang === 'ar' ? styles.labelAr : styles.label]}>
              <Icon
                name="phone"
                type="font-awesome"
                style={{paddingRight: 5}}
              />
              <Text style={{fontSize: 16}}>{t('PhoneNumber')}</Text>
            </View>
            <Input
              textAlign={lang == 'ar' ? 'right' : 'left'}
              style={{backgroundColor: 'white', borderRadius: 10}}
              keyboardType="phone-pad"
              onChangeText={onChangePhoneInput}
              value={PhoneInput}
            />
            <View style={[lang === 'ar' ? styles.labelAr : styles.label]}>
              <Text style={{fontSize: 16, paddingHorizontal: 5}}>
                {t('Gender')} :
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    checked={!gender}
                    onPress={() => {
                      setGender(!gender);
                    }}
                  />
                  <Text>{t('Male')}</Text>
                  <Icon
                    name="male"
                    type="font-awesome"
                    style={{paddingRight: 5, paddingLeft: 5}}
                  />
                  <Text style={{paddingRight: 5, paddingLeft: 5}}>|</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    checked={gender}
                    onPress={() => {
                      setGender(!gender);
                    }}
                  />
                  <Text>{t('Female')}</Text>
                  <Icon
                    name="female"
                    type="font-awesome"
                    style={{paddingRight: 5, paddingLeft: 5}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                checked={termsAndServices}
                onPress={() => {
                  setTermsAndServices(!termsAndServices);
                }}
              />
              <Text style={{fontFamily: 'Tajawal-Medium', textAlign: 'center'}}>
                <Text>{t('IHaveReadAndAgreedToThe')}</Text>
                <Text
                  style={{
                    color: 'yellowgreen',
                    fontFamily: 'Tajawal-Medium',
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(
                      'https://newvisions.sa/terms_and_conditions',
                    );
                  }}>
                  {t('TermsOfService')}
                </Text>
                <Text> {t('And')} </Text>
                <Text
                  style={{
                    color: 'yellowgreen',
                    fontFamily: 'Tajawal-Medium',
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL('https://newvisions.sa/privacy_policy');
                  }}>
                  {t('PrivacyPolicy')}
                </Text>
              </Text>
            </View>

            <Button
              disabled={!termsAndServices}
              iconPosition="right"
              icon={
                <Icon
                  style={{
                    marginLeft: 120,
                  }}
                  type="font-awesome"
                  name="angle-right"
                  size={30}
                  color="white"
                />
              }
              buttonStyle={[
                {
                  backgroundColor: 'black',
                  borderRadius: 20,
                  marginHorizontal: 10,
                  marginVertical: 20,
                },
              ]}
              titleStyle={{fontSize: 18, marginLeft: 140, marginRight: 20}}
              title={t('Next')}
              onPress={() => {
                SignupAPI();
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
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
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  input: {
    marginTop: 30,
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 15,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 5,
  },
  labelAr: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 5,
  },
});
