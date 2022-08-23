import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {Button, Text} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function VerifyConfirmPassword({route, navigation}) {
  const {t, i18n} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [CodeInput, onChangeCode] = useState('');
  const VerifyAPI = () => {
    setLoading(true);
    axios
      .post('https://www.newvisions.sa/api/verifyForgetPassword', {
        email: route.params.email != undefined ? route.params.email : null,
        phone: route.params.phone != undefined ? route.params.phone : null,
        code: CodeInput,
      })
      .then(function (response) {
        if (JSON.stringify(response.data.code) == 200) {
          setLoading(false);
          alert(t('VerifyComplete'));
          navigation.navigate('ResetPassword', {
            phone: route.params.phone != undefined ? route.params.phone : null,
            email: route.params.email != undefined ? route.params.email : null,
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
  //alert(JSON.stringify(route.params));

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
            {t('CodeConfirmation')}
          </Text>
          <View></View>
        </View>
        <View style={styles.content}>
          <Icon
            style={styles.icon}
            color="white"
            type="font-awesome"
            name="paper-plane"
            size={90}
          />
          <Text style={(styles.text, {marginTop: 20, color: 'gray'})}>
            {t('PleaseEnterTheCode')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15,
              marginBottom: 5,
              alignItems: 'center',
              width: '90%',
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
              onChangeText={onChangeCode}
              value={CodeInput}
              right={<TextInput.Icon color="white" name="lock-question" />}
            />
          </View>
          <View style={{alignItems: 'stretch', flexDirection: 'row', flex: 1}}>
            <Button
              buttonStyle={[
                {
                  backgroundColor: 'white',
                  borderRadius: 20,
                  width: 350,
                },
              ]}
              titleStyle={{fontSize: 20, color: 'rgb(62,72,84)'}}
              title={t('Verify')}
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
    alignItems: 'center',
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
    fontSize: 14,
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
