import React from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';

import { Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useTranslation } from 'react-i18next';
import layout from '../../utils/layout.js';
import { signInGoogle, onAppleButtonPress } from '../api/socialAuth';
import { uselang } from '../hooks/useLang';

export function SocialButtons() {
  const { t } = useTranslation();
  const { lang } = uselang();
  const isIOS = Platform.OS === 'ios';

  return (
    <View style={{ marginVertical: layout.pixelSizeVertical(15) }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.socialBtn,
          {
            marginBottom: layout.pixelSizeVertical(15),
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
          },
        ]}
        onPress={signInGoogle}
      >
        <View style={{ marginLeft: layout.pixelSizeHorizontal(20) }}>
          <AntDesign name="google" color="#DB4437" size={20} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', color: '#000' }}>
            {t('common:ContinueWithGoogle')}
          </Text>
        </View>
      </TouchableOpacity>
      {isIOS ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.socialBtn, { flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }]}
          onPress={onAppleButtonPress}
        >
          <View style={{ marginLeft: layout.pixelSizeHorizontal(20) }}>
            <AntDesign name="apple1" color="#000" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', color: '#000' }}>
              {t('common:ContinueWithApple')}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  socialBtn: {
    padding: layout.pixelSizeVertical(15),
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    // backgroundColor: '#fff',
  },
});
