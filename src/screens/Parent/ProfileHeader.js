import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../../helpers/colors'
import Global from '../../../Global'

export default function ProfileHeader() {
    return (
        <View style={styles.outContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.BG}
                    source={require('../../assets/img/profileHeader.png')}
                ></Image>
            </View>
            <View style={styles.avatar}>
                <Image source={require('../../assets/img/default-profile-picture.jpeg')}></Image>
            </View>
            <Text style={styles.MainText}>{Global.UserName}</Text>
            <Text style={styles.subText}>{Global.email}</Text>
            <Text style={styles.subText}>{Global.phone}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    outContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flex: 0.59,
    },
    container: {
        height: 200,
        backgroundColor: colors.primary,
        width: '100%',
    },
    BG: { opacity: 0.2 },
    avatar: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 15,
        borderColor: colors.white,
        marginTop: -90,
        overflow: 'hidden',
        marginBottom: 10,
    },
    MainText: {
        fontSize: 21,
        fontFamily: 'Cairo',
        color: colors.black,
        fontWeight: '700',
    },
    subText: {
        fontSize: 12,
        fontFamily: 'Cairo',
        color: colors.black,
    },
})
