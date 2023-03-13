import React, { useContext, useState } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Linking,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { TextInput } from 'react-native-paper'
import { Input, Button, Text, CheckBox, Icon } from 'react-native-elements'
import i18n from 'i18n-js'
// import { useTranslation } from 'react-i18next'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StackActions } from '@react-navigation/native'
import * as Yup from 'yup'
import { useFormikContext } from 'formik'
import colors from '../../helpers/colors'
import defaultStyles from '../../helpers/styles'
import { heightp } from '../../utils/responsiveDesign'
import AppForm from '../../components/forms/Form'
import AppFormField from '../../components/forms/FormField'
import SubmitButton from '../../components/forms/SubmitButton'
import { AppContext } from '../../context/AppState'

function Registration({ navigation }) {
    const [loading, setLoading] = useState(false)
    const { lang } = useContext(AppContext)

    const validateLoginForm = Yup.object().shape({
        email: Yup.string().email().required('البريد الالكتروني الزامي'),
        password: Yup.string().required('كلمة المرور الزامية'),
        confirmPassword: Yup.string().required('كلمة المرور الزامية'),
    })

    const [formValues, setFormValues] = useState({})
    const [FirstNameInput, onChangeFirstNameInput] = useState('')
    const [LastNameInput, onChangeLastNameInput] = useState('')
    const [EmailInput, onChangeEmailInput] = useState('')
    const [PasswordInput, onChangePasswordInput] = useState('')
    const [PasswordConfrimInput, onChangePasswordConfrimInput] = useState('')
    const [PhoneInput, onChangePhoneInput] = useState('')
    const [eye, seteye] = useState('eye-off')
    const [termsAndServices, setTermsAndServices] = useState(false)
    const [gender, setGender] = useState(0)
    const [showhide, setshowhide] = useState(true)
    const showPassword = () => {
        if (eye === 'eye-off') {
            seteye('eye')
            setshowhide(false)
        } else {
            seteye('eye-off')
            setshowhide(true)
        }
    }

    const SignupAPI = (values) => {
        setLoading(true)
        axios
            .post('https://www.newvisions.sa/api/signup', {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
                password_confirmation: values.confirmPassword,
                phone: values.phoneNumber,
                gender: 1,
                type: 3,
            })
            .then(function (response) {
                console.log('yoooo', response.data)
                if (JSON.stringify(response.data.code) == 200) {
                    console.log('Clicked')
                    //   alert('Success, please verify via email');
                    setLoading(false)
                    navigation.navigate('VerifyAccount', {
                        phone: values.phoneNumber,
                    })
                } else {
                    alert(JSON.stringify(response.data.message))
                    console.log('Failed')
                    setLoading(false)
                }
            })
            .catch(function (error) {
                alert(error)
                setLoading(false)
            })
    }

    const RenderButton = () => {
        const { handleSubmit } = useFormikContext()

        return (
            <Button
                disabled={!termsAndServices}
                iconPosition="right"
                icon={
                    <Icon
                        style={{
                            marginLeft: 120,
                        }}
                        type="font-awesome"
                        name="angle-right"
                        size={30}
                        color="white"
                    />
                }
                buttonStyle={[
                    {
                        backgroundColor: 'black',
                        borderRadius: 20,
                        marginHorizontal: 10,
                        marginVertical: 20,
                    },
                ]}
                titleStyle={{
                    fontSize: 18,
                    marginLeft: 140,
                    marginRight: 20,
                }}
                title={i18n.t('Next')}
                onPress={handleSubmit}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
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
                <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{
                        flex: 1,
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.content}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                marginVertical: 30,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
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
                                    style={{
                                        paddingRight: 5,
                                        transform:
                                            lang === 'ar'
                                                ? [{ rotate: '180deg' }]
                                                : [{ rotate: '0deg' }],
                                    }}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'black',
                                    fontFamily: 'Tajawal-Regular',
                                }}
                            >
                                {i18n.t('Registration')}
                            </Text>
                            <View></View>
                        </View>
                        <View>
                            <AppForm
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    phoneNumber: '',
                                }}
                                validationSchema={validateLoginForm}
                                onSubmit={(values) => {
                                    SignupAPI(values)
                                }}
                            >
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    AntDesignIcon="user"
                                    name="firstName"
                                    keyboardType="default"
                                    labelName={i18n.t('FirstName')}
                                />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    AntDesignIcon="user"
                                    name="lastName"
                                    keyboardType="default"
                                    labelName={i18n.t('LastName')}
                                />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    AntDesignIcon="mail"
                                    name="email"
                                    keyboardType="email-address"
                                    labelName={i18n.t('Email')}
                                />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    AntDesignIcon="lock"
                                    name="password"
                                    secureTextEntry
                                    labelName={i18n.t('Password')}
                                />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    AntDesignIcon="lock"
                                    name="confirmPassword"
                                    secureTextEntry
                                    labelName={i18n.t('ConfirmPassword')}
                                />
                                <AppFormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    AntDesignIcon="phone"
                                    name="phoneNumber"
                                    keyboardType="numeric"
                                    labelName={i18n.t('PhoneNumber')}
                                />
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        paddingHorizontal: heightp(10),
                                    }}
                                >
                                    <CheckBox
                                        checked={termsAndServices}
                                        onPress={() => {
                                            setTermsAndServices(
                                                !termsAndServices
                                            )
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: colors.black,
                                            fontSize: heightp(12),
                                            fontFamily:
                                                defaultStyles.text.fontFamily,
                                            fontWeight: '700',
                                            lineHeight: heightp(16),
                                            // textAlign: 'center',
                                        }}
                                    >
                                        <Text>
                                            {i18n.t('IHaveReadAndAgreedToThe')}
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'yellowgreen',
                                                fontFamily: 'Tajawal-Medium',
                                                textAlign: 'center',
                                            }}
                                            onPress={() => {
                                                Linking.openURL(
                                                    'https://mo.visionsplus.net/terms_and_conditions'
                                                )
                                            }}
                                        >
                                            {i18n.t('TermsOfService')}
                                        </Text>
                                    </Text>
                                </View>

                                <RenderButton />
                            </AppForm>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Registration

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
        flex: 1,
    },
    input: {
        marginTop: 30,
        justifyContent: 'space-between',
    },
    content: {
        marginHorizontal: 15,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 5,
    },
    labelAr: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 5,
    },
})
