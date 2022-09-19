import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {uselang} from '../hooks/useLang';

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'ar', label: 'Arabic'},
];

const Selector = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {setLang} = uselang();

  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/img/BG-Dark.png')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>{t('common:languageSelector')}</Text>
            <Ionicons color="#444" size={28} name="ios-language-outline" />
          </View>
          {LANGUAGES.map(language => {
            const selectedLanguage = language.code === selectedLanguageCode;

            return (
              <Pressable
                key={language.code}
                style={styles.buttonContainer}
                disabled={selectedLanguage}
                onPress={() => {
                  setLanguage(language.code);
                  setLang(language.code);
                  navigation.goBack();
                }}>
                <Text
                  style={[
                    selectedLanguage ? styles.selectedText : styles.text,
                  ]}>
                  {language.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#444',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
});

export default Selector;
