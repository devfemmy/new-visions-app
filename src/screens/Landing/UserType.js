import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import React, { useContext, useState } from 'react'
import Screen from '../../components/Screen'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { color } from 'react-native-reanimated'
import { AppContext } from '../../context/AppState'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Global from '../../../Global'
import Toast from 'react-native-toast-message'
import { heightp } from '../../utils/responsiveDesign'

export default function UserType({ navigation }) {
    const { changeLang, lang, showLoadingSpinner } = useContext(AppContext)
    console.log(`UserType`, lang)
    const langTo = lang === 'ar' ? 'en' : 'ar'
    const [focusSt, setFocusSt] = useState(false)
    const [focusPar, setFocusPar] = useState(false)

    const stepOneClicked = () => {
        //alert(Global.UserType);
        if (focusPar === true || focusSt === true) {
            navigation.navigate('Login')
        } else {
            Toast.show({
                text1: 'Select Type',
                type: 'error',
                style: { color: colors.dark },
            })
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/img/BG-Dark.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.screen}>
                    <TouchableOpacity
                        style={styles.touchLang}
                        onPress={() => {
                            changeLang(langTo)
                            console.log(
                                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx langTo xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                                langTo
                            )
                        }}
                    >
                        <View style={styles.lang}>
                            <Text style={styles.langText}>
                                {I18n.t('Language')}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/img/logo-white.png')}
                        ></Image>
                        <Text style={styles.textLbl}>
                            {I18n.t('RegisterAs')}
                        </Text>
                        <View style={styles.UserType}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setFocusPar(true)
                                    setFocusSt(false)
                                    Global.UserType = '4'
                                }}
                            >
                                <View
                                    style={[
                                        styles.UserTypeContainer,
                                        focusPar
                                            ? styles.UserTypeContainerFocus
                                            : styles.UserTypeContainerBlure,
                                    ]}
                                >
                                    <FontAwesome
                                        name="group"
                                        size={50}
                                        color={
                                            focusPar
                                                ? colors.white
                                                : colors.dark
                                        }
                                    />
                                    <View
                                        style={[
                                            styles.HorizSeperator,
                                            {
                                                borderColor: focusPar
                                                    ? colors.white
                                                    : colors.dark,
                                            },
                                        ]}
                                    ></View>
                                    <Text
                                        style={
                                            focusPar
                                                ? styles.focusText
                                                : styles.blureText
                                        }
                                    >
                                        {I18n.t('Parent')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={[styles.Seperator, {}]}></View>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setFocusPar(false)
                                    setFocusSt(true)
                                    Global.UserType = '3'
                                }}
                            >
                                <View
                                    style={[
                                        styles.UserTypeContainer,
                                        focusSt
                                            ? styles.UserTypeContainerFocus
                                            : styles.UserTypeContainerBlure,
                                    ]}
                                >
                                    <Ionicons
                                        name="person-sharp"
                                        size={50}
                                        color={
                                            focusSt ? colors.white : colors.dark
                                        }
                                    />
                                    <View
                                        style={[
                                            styles.HorizSeperator,
                                            {
                                                borderColor: focusSt
                                                    ? colors.white
                                                    : colors.dark,
                                            },
                                        ]}
                                    ></View>
                                    <Text
                                        style={
                                            focusSt
                                                ? styles.focusText
                                                : styles.blureText
                                        }
                                    >
                                        {I18n.t('Student')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => stepOneClicked()}
                    >
                        <View style={styles.loginBtnView}>
                            <View style={styles.arrowCont}>
                                <MaterialIcons
                                    name={
                                        lang == 'ar'
                                            ? 'arrow-forward-ios'
                                            : 'arrow-back-ios'
                                    }
                                    size={20}
                                    color={colors.white}
                                />
                            </View>
                            <Text style={styles.loginText}>
                                {I18n.t('Next')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, height: '100%' },
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    loginBtn: {
        width: '80%',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    loginBtnView: {
        flex: 1,
        borderRadius: 40,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    arrowCont: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        backgroundColor: colors.dark,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: '35%',
        color: colors.black,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
    },
    touchLang: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingTop: heightp(20),
    },
    lang: {
        margin: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.white,
        width: 60,
        height: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    langText: {
        color: colors.white,
        fontSize: 20,
        fontFamily: 'Cairo-Regular',
        alignSelf: 'center',
    },
    logo: {
        height: 55,
        width: '40%',
        resizeMode: 'stretch',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLbl: {
        color: colors.white,
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
        borderColor: colors.white,
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
