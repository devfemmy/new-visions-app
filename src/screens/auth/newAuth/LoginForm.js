import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import i18n from 'i18n-js'
import { useNavigation, useRoute } from '@react-navigation/native'
//
import colors from '../../../helpers/colors'
import defaultStyles from '../../../helpers/styles'
import { Text as OtherText } from 'react-native-elements'
import AppForm from '../../../components/forms/Form'
import AppFormField from '../../../components/forms/FormField'
import SubmitButton from '../../../components/forms/SubmitButton'
import { SocialButtons } from '../SocialButtons'
import { Text } from '../../../components/common'
import AppButton from '../../../components/Button'
import { heightp } from '../../../utils/responsiveDesign'

const validateLoginForm = Yup.object().shape({
    phone: Yup.string().required('كلمة المرور الزامية'),
})

function LoginForm({ submitLogin, onAppleButtonPress, signInGoogle }) {
    const navigation = useNavigation();
    const route = useRoute();
    const {name} = route.params;
    console.log('name', name);
    return (
        <View style={styles.container}>
            <AppForm
                initialValues={{ phone: '' }}
                validationSchema={validateLoginForm}
                onSubmit={(values) => submitLogin(values, navigation)}
            >
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="phone"
                    name="phone"
                    keyboardType="phone-pad"
                    labelName={i18n.t('PhoneNumber')}
                />

                <View style={{ height: heightp(40) }}></View>
                <SubmitButton style={styles.LoginBtn} title={i18n.t('login')} />

                <View style={styles.socialLogin}>
                    {/* <AppleButton /> */}
                    <SocialButtons
                        onAppleButtonPress={onAppleButtonPress}
                        signInGoogle={signInGoogle}
                    />
                    {/* <AppleButton />  */}
                </View>
            </AppForm>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingTop: 50,
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
        paddingTop: heightp(40),
    },
    LoginBtn: {
        width: '55%',
        flexDirection: 'row',
        height: 47.5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: colors.primary,
    },
})

export default LoginForm
