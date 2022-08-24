import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from 'i18n-js';
import { AppContext } from '../context/AppState';
import colors from '../helpers/colors';

const ChangeLanguage = ({lang, onPressHandler}) => {
  const changeLangHandler = ()=>{
    debugger;
onPressHandler();
  };
  return (
  <View 
    style={styles.row}>
    <TouchableOpacity onPress={()=>{changeLangHandler()}}>
      <Text style={styles.title}>{lang === 'en' ? i18n.t('Arabic') : i18n.t('English')}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'flex-end',
    padding: 15,
    width:100,
    height:50,
  },
  title: {
    fontFamily: 'Tajawal-Bold',
    fontWeight:'700'
  },
});
export default ChangeLanguage;
