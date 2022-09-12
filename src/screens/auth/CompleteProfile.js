import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import { TextInput, Caption } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import * as yup from 'yup';
import I18n from 'i18n-js';

import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useRoute } from '@react-navigation/native';
import Global from '../../../Global';
// import { EditProfileSchema } from '../../constants/schema';
import { Loader } from '../../components/Loader';
import layout from '../../utils/layout.ts';
import { updateProfile } from '../../api/updateProfile';
import { AppContext } from '../../context/AppState';
import { SafeAreaView } from '../../components/common';
import HomePageService from '../../services/userServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CompleteProfile() {
  const { t } = useTranslation();
  const { lang, onLogin, showLoadingSpinner } = useContext(AppContext);
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
            setUserInfo(userData);

        } else {
            console.log('failed', res)
            setIsLoading(false)
            Alert.alert(res?.message)
        }
        return res
    } catch (err) {
      setIsLoading(false)
    }
  }

  const setUserInfo = (userData) => {
    showLoadingSpinner(false)
    Global.AuthenticationToken = userData.remember_token
    AsyncStorage.setItem('token', Global.AuthenticationToken)
    Global.Image = userData.image
    Global.UserName = userData.first_name + userData.last_name
    Global.phone = userData.phone
    Global.email = userData.email
    Global.UserId = userData.id
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
      {/* <SafeAreaView> */}
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
            textAlign,
          }}
        >
          {' '}
          {I18n.t('PleaseAnswerAll')}
        </Text>
        <View style={[styles.inputBox]}>
          <TextInput
            style={{ textAlign }}
            placeholder={I18n.t('FirstName')}
            fontSize={15}
            editable={false}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            error={!!(touched.firstName && errors?.firstName)}
          />
          {errors.firstName ? (
            <Caption style={{ color: 'red', paddingTop: layout.pixelSizeVertical(5), textAlign }}>
              {errors.firstName}
            </Caption>
          ) : null}
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={{ textAlign }}
            placeholder={I18n.t('LastName')}
            fontSize={15}
            value={values.lastName}
            editable={false}
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
        <View style={styles.inputBox}>
          <TextInput
            style={{ textAlign }}
            placeholder={I18n.t('PhoneNumber')}
            fontSize={15}
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
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: 'white',
  },
  margin: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 17,
    color: 'white',
  },
  divider: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    marginBottom: layout.pixelSizeVertical(20),
  },
});
