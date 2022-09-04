import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import { Button, Text } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView'
import { TextInput } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function VerifyEnterEmail({ navigation }) {
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [InputValue, onChangeInput] = useState('')
    const ForgetPasswordAPI = () => {
        setLoading(true)
        axios
            .post('https://www.newvisions.sa/api/forgetPassword', {
                phone: InputValue,
            })
            .then(function (response) {
                if (JSON.stringify(response.data.code) == 200) {
                    setLoading(false)
                    navigation.navigate('VerifyCode', { phone: InputValue })
                } else {
                    alert(JSON.stringify(response.data.message))
                    setLoading(false)
                }
            })
            .catch(function (error) {
                alert(error)
                setLoading(false)
            })
    }

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <ActivityIndicator
                animating={loading}
                style={loading ? styles.loading : { display: 'none' }}
                size="large"
                color="#9bba52"
            />
            <ImageBackground
                source={require('../../assets/img/BG.png')}
                style={styles.backgroundImage}
            >
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.dispatch(StackActions.pop(1))
                        }}
                    >
                        <MaterialIcons name="arrow-back-ios" size={20} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: 'Tajawal-Regular',
                            textAlign: 'center',
                        }}
                    >
                        {t('SendVerificationCodeByPhone')}
                    </Text>
                    <View></View>
                </View>
                <View
                    style={{
                        flex: 4,
                        marginHorizontal: 20,
                    }}
                >
                    <View style={{ alignSelf: 'center' }}>
                        <Icon
                            style={styles.icon}
                            color="white"
                            type="font-awesome"
                            name="lock"
                            size={90}
                        />
                    </View>
                    <View style={styles.input}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 15,
                                marginBottom: 5,
                                alignItems: 'center',
                                width: '90%',
                                paddingHorizontal: '2%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                    width: '100%',
                                }}
                            >
                                {t('EnterYourPhoneToRestYourPassword')}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 15,
                                marginBottom: 5,
                                alignItems: 'center',
                                width: '90%',
                            }}
                        >
                            <TextInput
                                activeUnderlineColor="#fff"
                                style={{
                                    marginHorizontal: 10,
                                    marginBottom: 15,
                                    height: 50,
                                    backgroundColor: '#fff',
                                    opacity: 1,
                                    borderBottomColor: 'white',
                                    width: '100%',
                                }}
                                onChangeText={onChangeInput}
                                value={InputValue}
                                right={
                                    <TextInput.Icon
                                        color="white"
                                        name="phone"
                                    />
                                }
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '10%',
                            }}
                        >
                            <Button
                                buttonStyle={[
                                    {
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        width: 300,
                                    },
                                ]}
                                title={t('SendVerificationCode')}
                                titleStyle={{
                                    color: 'rgb(62,72,84)',
                                    fontSize: 20,
                                }}
                                onPress={() => ForgetPasswordAPI()}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
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
        height: '100%',
        width: '100%',
        flex: 1,
    },
    input: {
        marginTop: 30,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
})
