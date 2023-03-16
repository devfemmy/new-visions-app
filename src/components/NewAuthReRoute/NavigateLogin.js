import React from 'react'
import I18n from 'i18n-js'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text as RNText,
} from 'react-native'
import { Text } from '../common'
import { useNavigation } from '@react-navigation/native'
import colors from '../../helpers/colors'

function NavigateLogin(props) {
    const navigation = useNavigation()

    const login = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={styles.center}>
            <Text
                text={I18n.t('DontHaveAnAccount')}
                style={{ color: 'rgba(67, 72, 84, 1)' }}
            />
            <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
                <View style={styles.loginBtnView}>
                    <RNText style={styles.loginText}>{I18n.t('Create')}</RNText>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        // paddingTop: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtn: {
        width: '60%',
        flexDirection: 'row',
        height: 47.5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 25,
    },
    loginBtnView: {
        flex: 1,
        borderRadius: 40,
        backgroundColor: 'rgba(67, 72, 84, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 15,
    },
    loginText: {
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        // marginRight: '35%',
        color: colors.white,
    },
})

export default NavigateLogin
