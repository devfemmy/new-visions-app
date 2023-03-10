/* eslint-disable react/prop-types */
import React from 'react'
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    Text,
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'

// import { signInGoogle, onAppleButtonPress } from '../../api/socialAuth';
import I18n from 'i18n-js'

export function SocialButtons({ signInGoogle, onAppleButtonPress }) {
    const { lang } = I18n.locale
    const isIOS = Platform.OS === 'ios'

    return (
        <View style={{ marginVertical: 15 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.socialBtn,
                    {
                        marginBottom: 15,
                        flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                    },
                ]}
                onPress={signInGoogle}
            >
                <View style={{ marginLeft: 20 }}>
                    <AntDesign name="google" color="rgba(255, 255, 255, 1)" size={20} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 1)' }}>
                        {I18n.t('ContinueWithGoogle')}
                    </Text>
                </View>
            </TouchableOpacity>
            {isIOS ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        styles.socialBtn,
                        {
                            flexDirection:
                                lang === 'ar' ? 'row-reverse' : 'row',
                        },
                    ]}
                    onPress={onAppleButtonPress}
                >
                    <View style={{ marginLeft: 20 }}>
                        <AntDesign name="apple1" color="rgba(255, 255, 255, 1)" size={20} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 1)' }}>
                            {I18n.t('ContinueWithApple')}
                        </Text>
                    </View>
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    socialBtn: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(67, 72, 84, 1)',
    },
})
