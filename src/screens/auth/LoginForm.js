import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import AppForm from '../../components/forms/Form'
import AppFormField from '../../components/forms/FormField'
import SubmitButton from '../../components/forms/SubmitButton'
import i18n from 'i18n-js'
import { AppContext } from '../../context/AppState'
import { useNavigation } from '@react-navigation/native'
import colors from '../../helpers/colors'
import { heightp } from '../../utils/responsiveDesign'
import AppButton from '../../components/Button'
import { Text } from '../../components/common'
import { Text as OtherText } from 'react-native-elements'
import defaultStyles from '../../helpers/styles'
import { SocialButtons } from './SocialButtons'

const validateLoginForm = Yup.object().shape({
    email: Yup.string().email().required('البريد الالكتروني الزامي'),
    password: Yup.string().required('كلمة المرور الزامية'),
})

function LoginForm({ submitLogin, onAppleButtonPress, signInGoogle }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <AppForm
                initialValues={{ email: '', password: '' }}
                validationSchema={validateLoginForm}
                onSubmit={(values) => submitLogin(values, navigation)}
            >
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
                    password={true}
                    labelName={i18n.t('Password')}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ResetPassword')
                    }}
                >
                    <OtherText
                        style={[
                            styles.textbold,
                            {
                                fontSize: heightp(12),
                                marginBottom: 0,
                                textAlign: 'right',
                            },
                        ]}
                    >
                        {`${i18n.t('ForgotPassword')}`}
                    </OtherText>
                </TouchableOpacity>

                <View style={{ height: heightp(40) }}></View>
                <SubmitButton style={styles.LoginBtn} title={i18n.t('login')} />
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#434854',
                        borderTopWidth: 1,
                        marginVertical: heightp(15),
                        marginHorizontal: heightp(90),
                    }}
                />
                <View style={styles.socialLogin}>
                    {/* <AppleButton /> */}
                    <SocialButtons
                        onAppleButtonPress={onAppleButtonPress}
                        signInGoogle={signInGoogle}
                    />
                    {/* <AppleButton />  */}
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: heightp(90),
                        marginBottom: heightp(20),
                        borderColor: '#434854',
                        borderTopWidth: 1,
                    }}
                >
                    <Text
                        style={styles.ratingsText}
                        text={i18n.t('DontHaveAnAccount')}
                    />
                    <AppButton
                        title={i18n.t('CreateANewAccount')}
                        onPress={() => navigation.navigate('SignUp')}
                    />
                </View>
            </AppForm>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
    },
    ratingsText: {
        color: colors.black,
        fontSize: heightp(13),
        fontFamily: defaultStyles.text.fontFamily,
        lineHeight: heightp(16),
        paddingTop: heightp(10),
    },
    textbold: {
        color: colors.black,
        marginVertical: 5,
        textAlign: 'center',
        fontSize: heightp(16),
        fontWeight: '700',
        fontFamily: defaultStyles.text.fontFamily,
        // lineHeight: heightp(16),
    },
    socialLogin: {
        paddingHorizontal: heightp(25),
    },
})

export default LoginForm
