import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { Caption } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import * as yup from 'yup';
import I18n from 'i18n-js';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';

import Global from '../../../Global';
// import { EditProfileSchema } from '../../constants/schema';
import { Loader } from '../../components/Loader';
import layout from '../../utils/layout.ts';
import { updateProfile } from '../../api/updateProfile';
import { AppContext } from '../../context/AppState';
import { SafeAreaView } from '../../components/common';
import HomePageService from '../../services/userServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../helpers/globalStyles';
import { heightp } from '../../utils/responsiveDesign';

export function CompleteProfile() {
  const { t } = useTranslation();
  const { lang, onLogin, showLoadingSpinner } = useContext(AppContext);
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState(0);
  const route = useRoute();
  const {userData} = route?.params;

  const viewAlign = lang === 'ar' ? 'row-reverse' : 'row';
  const textAlign = lang === 'ar' ? 'right' : 'left';

  const EditProfileSchema = yup.object().shape({
    firstName: yup.string().required(I18n.t('FirstName')),
    lastName: yup.string().required(I18n.t('LastName')),
    phone: yup.string().required(I18n.t('PhoneNumber')),
    birthday: yup.string(),
  });

  const updateUserProfile = async (data) => {
    setIsLoading(true)
    const payload = {
        type: data?.type.toString(),
        phone: data.phone,
        gender: data.gender,
    }
    try {
        const res = await HomePageService.upDateUserProfile(payload)
        if (res.code === 200) {
            setIsLoading(false)
            navigation.navigate('Login')
            setUserInfo();

        } else {
            console.log('failed', res)
            setIsLoading(false)
            Alert.alert(res?.message)
        }
        return res
    } catch (err) {
      console.log(err, 'err')
      setIsLoading(false)
    }
  }

  const setUserInfo = () => {
    showLoadingSpinner(false)
    Global.AuthenticationToken = userData.remember_token
    AsyncStorage.setItem('token', Global?.AuthenticationToken)

    Global.Image = userData?.image
    Global.UserName = userData?.first_name + userData?.last_name
    Global.phone = userData?.phone
    Global.email = userData?.email
    Global.UserId = userData?.id
    onLogin(userData, true)
}

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      firstName: userData?.first_name,
      lastName: userData?.last_name,
      password: '',
      phone: '',
      birthday: '',
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      const { firstName, lastName, phone } = values;
      const data = {
        first_name: firstName,
        last_name: lastName,
        phone,
        // nationality_id: '1',
        type: userData?.type,
        gender: gender ? 2 : 1,
        // birthday,
        // password,
      };
      updateUserProfile(data);
      // updateProfile({ data, setIsLoading });
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.Background}
    >
      <SafeAreaView>
      {isLoading ? <Loader visible /> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: layout.pixelSizeHorizontal(15) }}
      >
        <Text
          style={{
            fontFamily: 'Cairo-Regular',
            paddingVertical: layout.pixelSizeVertical(15),
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
          }}
        >
          {' '}
          {I18n.t('EnterAccountInfo')}
        </Text>
        <View style={styles.formContainer}>
            <View style={globalStyles.rowBetween}>
                <Text style={styles.inputTitle}>
                    {I18n.t('FirstName')}
                </Text>
                <Ionicons
                    name="create-outline"
                    size={20}
                    color={'rgba(70, 79, 84, 1)'}
                />
            </View>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                // defaultValue={firstname}
                placeholderTextColor="#000000"
                editable={false}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
            />
            {errors.firstName ? (
            <Caption style={{ color: 'red', paddingTop: layout.pixelSizeVertical(5), textAlign }}>
              {errors.firstName}
            </Caption>
          ) : null}
        </View>
        <View style={styles.formContainer}>
            <View style={globalStyles.rowBetween}>
                <Text style={styles.inputTitle}>
                  {I18n.t('LastName')}
                </Text>
                <Ionicons
                    name="create-outline"
                    size={20}
                    color={'rgba(70, 79, 84, 1)'}
                />
            </View>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                // defaultValue={firstname}
                placeholderTextColor="#000000"
                editable={false}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={!!(touched.lastName && errors?.lastName)}
            />
            {errors.lastName ? (
            <Caption style={{ color: 'red', paddingTop: layout.pixelSizeVertical(5), textAlign }}>
              {errors.lastName}
            </Caption>
          ) : null}
        </View>
        <View style={styles.formContainer}>
            <View style={globalStyles.rowBetween}>
                <Text style={styles.inputTitle}>
                  {I18n.t('PhoneNumber')}
                </Text>
                <Ionicons
                    name="create-outline"
                    size={20}
                    color={'rgba(70, 79, 84, 1)'}
                />
            </View>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                // defaultValue={firstname}
                placeholderTextColor="#000000"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={!!(touched.phone && errors?.phone)}
            />
            {errors.phone ? (
            <Caption style={{ color: 'red', paddingTop: layout.pixelSizeVertical(5), textAlign }}>
              {errors.phone}
            </Caption>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: viewAlign,
          }}
        >
          <View
            style={{
              flexDirection: viewAlign,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckBox
              checked={!gender}
              onPress={() => {
                setGender(!gender);
              }}
            />
            <Text>{I18n.t('Male')}</Text>
          </View>

          <View
            style={{
              flexDirection: viewAlign,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckBox
              checked={gender}
              onPress={() => {
                setGender(!gender);
              }}
            />
            <Text>{I18n.t('Female')}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSubmit}
        style={{
          marginBottom: layout.pixelSizeVertical(20),
          marginHorizontal: layout.pixelSizeHorizontal(15),
          paddingHorizontal: 7,
          paddingVertical: layout.pixelSizeVertical(20),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'yellowgreen',
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white' }}>{I18n.t('Save')}</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputTitle: {
    fontSize: heightp(13),
    fontWeight: '700',
    color: 'rgba(70, 79, 84, 1)',
    fontFamily: 'Cairo-Regular',
},
input: {
    width: '100%',
    fontSize: heightp(14),
    height: 35,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(70, 79, 84, 1)',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
},

formContainer: {
    borderWidth: 1,
    borderColor: 'rgba(70, 79, 84, 0.091)',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginBottom: 15,
    height: 65,
    backgroundColor: 'rgba(70, 79, 84, 0.091)',
},

icon: {
    position: 'absolute',
    right: 153,
    bottom: 3,
    paddingHorizontal: 7.5,
    paddingVertical: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(70, 79, 84, 1)',
    borderRadius: 20,
},
});
