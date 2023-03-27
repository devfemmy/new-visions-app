import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native'
import React, { useContext, useState } from 'react'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { AppContext } from '../../context/AppState'
import Toast from 'react-native-toast-message'
import LandingImage from '../../assets/img/landing-img.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { heightp } from '../../utils/responsiveDesign'
const defaultUri =
    'https://firebasestorage.googleapis.com/v0/b/newvisions-9f9ef.appspot.com/o/logo-light.png?alt=media&token=68b6dab7-4a8e-4093-9b7a-994a951eda7a'

export default function Landing({ navigation }) {
    const { changeLang, lang, showLoadingSpinner } = useContext(AppContext)
    const langTo = lang === 'ar' ? 'en' : 'ar'
    const [focusSt, setFocusSt] = useState(false)
    const [focusPar, setFocusPar] = useState(false)

    const discoverClicked = () => {
        AsyncStorage.clear()
        navigation.replace('Home')
    }
    const createClicked = () => {
        AsyncStorage.clear()
        navigation.navigate('Login', { name: 'Login' })
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.screen}>
                    <View>
                        {Platform.OS === 'ios' && (
                            <TouchableOpacity
                                style={styles.touchLang2}
                                onPress={() => {
                                    changeLang(langTo)
                                }}
                            >
                                <View style={styles.lang}>
                                    <Text style={styles.langText}>
                                        {I18n.t('Language')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        <View style={styles.touchLang}>
                            <Image
                                style={styles.logo}
                                source={{ uri: defaultUri }}
                            />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <LandingImage />
                    </View>

                    <View
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => discoverClicked()}
                        >
                            <View style={styles.loginBtnView}>
                                <Text style={styles.loginText}>
                                    {I18n.t('DiscoverNewVisions')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => createClicked()}
                        >
                            <View style={styles.loginBtnView}>
                                <Text style={styles.loginText}>
                                    {I18n.t('CreateANewAccount2')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 50 : 75,
        paddingBottom: 50,
    },
    loginBtn: {
        width: '80%',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    loginBtnView: {
        flex: 1,
        borderRadius: 40,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 15,
    },
    arrowCont: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        backgroundColor: colors.white,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        // marginRight: '35%',
        color: colors.white,
    },
    touchLang: {
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 0,
    },
    touchLang2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // paddingTop: heightp(10),
    },
    lang: {
        margin: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.dark,
        width: 70,
        // height: 40,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: heightp(20)
    },
    langText: {
        color: colors.dark,
        fontSize: 20,
        fontFamily: 'Cairo-Regular',
        alignSelf: 'center',
    },
    // lang: {
    //     margin: 20,
    //     borderRadius: 30,
    //     borderWidth: 1,
    //     borderColor: colors.dark,
    //     width: 70,
    //     height: 40,
    //     alignSelf: 'flex-end',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // paddingVertical: heightp(20)
    // },
    // langText: {
    //     color: colors.dark,
    //     fontSize: 20,
    //     fontFamily: 'Cairo-Regular',
    //     alignSelf: 'center',
    // },
    logo: {
        height: 75,
        width: '55%',
        resizeMode: 'stretch',
        // tintColor: 'transparent',
    },
    landing: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        // tintColor: 'transparent',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLbl2: {
        color: colors.dark,
        fontFamily: 'Cairo-Bold',
        fontSize: 30,
        paddingTop: 10,
        textAlign: 'center',
    },
    textLbl: {
        color: colors.dark,
        fontFamily: 'Cairo-Bold',
        fontSize: 24,
        paddingTop: 10,
    },
    UserType: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    UserTypeContainer: {
        width: 130,
        height: 180,
        borderWidth: 2,
        borderColor: colors.dark,
        borderRadius: 30,

        justifyContent: 'center',
        alignItems: 'center',
    },
    UserTypeContainerFocus: {
        backgroundColor: colors.primary,
    },
    UserTypeContainerBlure: {
        backgroundColor: colors.white,
    },
    Seperator: {
        width: 1,
        height: 120,
        borderWidth: 0.5,
        borderColor: colors.white,
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    HorizSeperator: {
        width: 80,
        height: 2,
        borderWidth: 1,
        marginVertical: 20,
        alignSelf: 'center',
    },
    blureText: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: 'Cairo-Regular',
        fontWeight: 'bold',
    },
    focusText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Cairo-Regular',
        fontWeight: 'bold',
    },
})
