import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import colors from '../../helpers/colors'
import Global from '../../../Global'
import IconText from '../../components/IconText'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../helpers/globalStyles'
import I18n from 'i18n-js'
import { heightp } from '../../utils/responsiveDesign'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../context/AppState'
import FastImage from 'react-native-fast-image'
import { IMAGEURL } from '../../utils/functions'

export default function ProfileHeader() {
    const navigation = useNavigation()
    const { user } = useContext(AppContext)
    return (
        <View style={styles.outContainer}>
            <View style={styles.container}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('EditProfile')
                    }}
                    style={{
                        backgroundColor: 'inherit',
                        width: '100%',
                        opacity: 0.8,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        paddingHorizontal: 20,
                        // paddingBottom: 20,
                    }}
                >
                    <IconText
                        style={styles.textAlign}
                        text={I18n.t('Edit')}
                        textColor={colors.white}
                        children={
                            <Ionicons
                                name="create-outline"
                                size={28}
                                color={'#fff'}
                            />
                        }
                    />
                </Pressable>
                <Image
                    style={styles.BG}
                    source={require('../../assets/img/profileHeader.png')}
                ></Image>
            </View>
            <View style={styles.avatar}>
                {user?.image === null || user?.image === '' || !user?.image ? (
                    <Image
                        source={require('../../assets/img/default-profile-picture.jpeg')}
                    ></Image>
                ) : (
                    <FastImage
                        style={{
                            width: heightp(150),
                            height: heightp(150),
                            borderRadius: heightp(150),
                        }}
                        source={{
                            uri: `${IMAGEURL}/${user?.image}`,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                )}
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
    textAlign: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.white,
    },
})
