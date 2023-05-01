import React, { useContext, useState } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import { Icon } from 'react-native-elements'
import { Button, Text } from 'react-native-elements'
import i18n from 'i18n-js'
import { TextInput } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { heightp } from '../../utils/responsiveDesign'
import colors from '../../helpers/colors'
import defaultStyles from '../../helpers/styles'
import { StackActions } from '@react-navigation/native'
import { AppContext } from '../../context/AppState'

export default function VerifyConfirmPassword({ route, navigation }) {
    // const {t, i18n} = useTranslation();
    const [loading, setLoading] = useState(false)
    const [CodeInput, onChangeCode] = useState('')
    const { lang } = useContext(AppContext)
    const VerifyAPI = () => {
        setLoading(true)
        axios
            .post('https://newvisions.sa/api/verifyForgetPassword', {
                phone:
                    route.params.phone != undefined ? route.params.phone : null,
                code: CodeInput,
            })
            .then(function (response) {
                if (JSON.stringify(response.data.code) == 200) {
                    setLoading(false)
                    alert(i18n.t('VerifyComplete'))
                    navigation.navigate('ResetPassword', {
                        phone:
                            route.params.phone != undefined
                                ? route.params.phone
                                : null,
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
    //alert(JSON.stringify(route.params));

    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={loading}
                style={loading ? styles.loading : { display: 'none' }}
                size="large"
                color="#9bba52"
            />
            <ImageBackground
                source={require('../../assets/img/BG.png')}
                style={styles.backgroundImage}
                imageStyle={{ tintColor: 'rgba(155,186,82,1)' }}
            >
                <View style={{ flex: 0.15 }} />

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
                                backgroundColor: 'rgba(186, 216, 116, 1)',
                                height: heightp(15),
                                width: heightp(15),
                                borderRadius: heightp(15),
                                borderWidth: heightp(1),
                                borderColor: '#fff',
                                marginHorizontal: heightp(2),
                            }}
                        />
                        <View
                            style={{
                                backgroundColor: '#fff',
                                height: heightp(15),
                                width: heightp(15),
                                borderRadius: heightp(15),
                                marginHorizontal: heightp(2),
                            }}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <Icon
                        style={styles.icon}
                        color="white"
                        type="font-awesome"
                        name="paper-plane"
                        size={90}
                    />
                    <Text
                        style={[
                            styles.textbold,
                            {
                                textAlign: 'center',
                            },
                        ]}
                    >
                        {' '}
                        {i18n.t('PleaseEnterTheCodeNew')}{' '}
                    </Text>
                    {/* <Text
                        style={[
                            styles.textbold,
                            { fontSize: heightp(12), marginBottom: 0 },
                        ]}
                    >
                        {
                            'If You Did Not Receive The Verification Code, You Can '
                        }
                    </Text>
                    <Text
                        style={[
                            styles.textbold,
                            { fontSize: heightp(12), marginVertical: 0 },
                        ]}
                    >
                        {'Resend the verification code again'}
                    </Text> */}
                    <Text
                        style={
                            (styles.text,
                            {
                                marginTop: 20,
                                paddingVertical: 10,
                                color: '#fff',
                                textAlign: 'center',
                            })
                        }
                    >
                        {i18n.t('PleaseEnterTheCode')}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 5,
                            alignItems: 'center',
                            // width: '90%',
                        }}
                    >
                        <TextInput
                            activeUnderlineColor="#fff"
                            style={{
                                marginHorizontal: 10,
                                marginBottom: 50,
                                height: 50,
                                backgroundColor: '#fff',
                                opacity: 1,
                                borderBottomColor: 'white',
                                width: '100%',
                            }}
                            keyboardType="decimal-pad"
                            returnKeyType="done"
                            onChangeText={onChangeCode}
                            value={CodeInput}
                            right={
                                <TextInput.Icon color="white" name="phone" />
                            }
                        />
                    </View>
                    <View
                        style={{
                            alignItems: 'stretch',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            // flex: 1,
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#fff' }]}
                            onPress={() => {
                                VerifyAPI()
                            }}
                        >
                            <Text style={styles.buttontext}>{`Enter ${i18n.t(
                                'Verify'
                            )}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
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
    container: { flex: 1 },
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
