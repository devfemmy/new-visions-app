import React, { useContext, useState } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { Button, Text } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView'
import { TextInput } from 'react-native-paper'
import i18n from 'i18n-js'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { heightp } from '../../utils/responsiveDesign'
import defaultStyles from '../../helpers/styles'
import colors from '../../helpers/colors'
import { StackActions } from '@react-navigation/native'
import { AppContext } from '../../context/AppState'

export default function VerifyEnterEmail({ navigation }) {
    // const {t, i18n} = useTranslation();
    const [loading, setLoading] = useState(false)
    const [InputValue, onChangeInput] = useState('')
    const { lang } = useContext(AppContext)
    const ForgetPasswordAPI = () => {
        setLoading(true)
        axios
            .post('https://newvisions.sa/api/forgetPassword', {
                phone: InputValue,
            })
            .then(function (response) {
                console.log('response.data', response.data)
                if (JSON.stringify(response.data.code) == 200) {
                    setLoading(false)
                    navigation.navigate('VerifyCode', {
                        email: InputValue,
                        phone: InputValue,
                    })
                    console.log('Clicked')
                } else {
                    alert(JSON.stringify(response.data.message))
                    setLoading(false)
                    console.log('Failed')
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
                imageStyle={{ tintColor: 'rgba(155,186,82,1)' }}
                style={styles.backgroundImage}
            >
                <View style={{ flex: 0.2 }} />
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
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={20}
                            color={colors.white}
                            style={{
                                transform:
                                    lang === 'ar'
                                        ? [{ rotate: '180deg' }]
                                        : [{ rotate: '0deg' }],
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#fff',
                                height: heightp(15),
                                width: heightp(15),
                                borderRadius: heightp(15),
                                marginHorizontal: heightp(2),
                            }}
                        />
                        <View
                            style={{
                                backgroundColor: 'rgba(186, 216, 116, 1)',
                                height: heightp(15),
                                width: heightp(15),
                                borderRadius: heightp(15),
                                borderWidth: heightp(1),
                                borderColor: '#fff',
                                marginHorizontal: heightp(2),
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flex: 4,
                        marginHorizontal: 20,
                    }}
                >
                    <View
                        style={{ alignSelf: 'center', marginTop: heightp(40) }}
                    >
                        <Icon
                            style={styles.icon}
                            color="white"
                            type="fontisto"
                            name="unlocked"
                            size={90}
                        />
                        <Text
                            style={[
                                styles.textbold,
                                { marginTop: heightp(10) },
                            ]}
                        >
                            {`${i18n.t('ForgotPassword')}`}
                        </Text>
                        <Text
                            style={[
                                styles.textbold,
                                { fontSize: heightp(12), marginBottom: 0 },
                            ]}
                        >
                            {i18n.t('SendVerificationCodeByPhoneNew')}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 15,
                                marginBottom: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // width: '90%',
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
                                    borderRadius: 5,
                                    // borderBottomColor: 'white',
                                    width: '100%',
                                }}
                                keyboardType={'decimal-pad'}
                                returnKeyType="done"
                                onChangeText={onChangeInput}
                                value={InputValue}
                                right={
                                    <TextInput.Icon
                                        color={colors.primary}
                                        name="phone"
                                    />
                                }
                            />
                        </View>

                        <View
                            style={{
                                // alignItems: 'stretch',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 0.1,
                            }}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: '#fff' },
                                ]}
                                onPress={() => {
                                    ForgetPasswordAPI()
                                }}
                            >
                                <Text style={styles.buttontext}>{`${i18n.t(
                                    'SendVerificationCode'
                                )}`}</Text>
                            </TouchableOpacity>
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
        tintColor: '#9BBA52',
    },
    input: {
        marginTop: 30,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    textbold: {
        color: colors.white,
        marginVertical: 5,
        textAlign: 'center',
        fontSize: heightp(16),
        fontWeight: '700',
        fontFamily: defaultStyles.text.fontFamily,
        // lineHeight: heightp(16),
    },
    button: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '85%',
        borderRadius: 40,
        height: 50,
    },
    buttontext: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Cairo-Regular',
    },
})
