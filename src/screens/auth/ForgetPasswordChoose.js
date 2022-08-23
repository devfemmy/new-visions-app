import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Button, Text} from 'react-native-elements';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function VerifyEnterEmail({navigation}) {
  const {t, i18n} = useTranslation();

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
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
              fontSize: 18,
              color: 'black',
              fontFamily: 'Tajawal-Regular',
            }}>
            {t('ForgotPassword')}
          </Text>
          <View></View>
        </View>
        <View
          style={{
            flex: 4,
            marginHorizontal: 20,
          }}>
          <View style={styles.input}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10%',
              }}>
              <Button
                buttonStyle={[
                  {
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: '90%',
                    marginVertical: 20,
                  },
                ]}
                title={t('SendVerificationCodeByEmail')}
                titleStyle={{color: 'rgb(62,72,84)', fontSize: 20}}
                onPress={() =>
                  navigation.navigate('SendVerificationCodeByEmail')
                }
              />
              <Button
                buttonStyle={[
                  {backgroundColor: 'white', borderRadius: 20, width: '90%'},
                ]}
                title={t('SendVerificationCodeByPhone')}
                titleStyle={{color: 'rgb(62,72,84)', fontSize: 20}}
                onPress={() =>
                  navigation.navigate('SendVerificationCodeByPhone')
                }
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  input: {
    marginTop: 30,
    justifyContent: 'space-between',
  },
});
