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
import { heightp } from '../../utils/responsiveDesign'
import Toast from 'react-native-toast-message'

export default function UserType({ navigation }) {
    const { changeLang, lang, showLoadingSpinner } = useContext(AppContext)
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
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/img/BG1.png')}
                    style={styles.backgroundImage}
                    // imageStyle={{ tintColor: 'rgba(255, 255, 255, 1)' }}
                >
                    <View style={styles.screen}>
                        <TouchableOpacity
                            style={styles.touchLang}
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

                        <Text style={styles.textLbl2}>Testing apk</Text>

                        <View style={styles.content}>
                            <Image
                                style={styles.logo}
                                source={{
                                    uri: 'https://firebasestorage.googleapis.com/v0/b/newvisions-9f9ef.appspot.com/o/logo-light.png?alt=media&token=f2a1976b-f286-4cc1-bfab-fe0e33c4146c',
                                }}
                            />
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
                                                focusSt
                                                    ? colors.white
                                                    : colors.dark
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
                                        color={colors.dark}
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
            <Toast />
        </>
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
        backgroundColor: colors.primary,
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
        marginRight: '35%',
        color: colors.white,
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
        borderColor: colors.dark,
        width: 70,
        height: 40,
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
    logo: {
        height: 75,
        width: '55%',
        resizeMode: 'stretch',
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
