import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Text,
    Pressable,
    Alert,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import I18n from 'i18n-js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightp, widthp } from '../../utils/responsiveDesign'
import Lottie from '../../components/Lottie'
import { AppContext } from '../../context/AppState'
import HomePageService from '../../services/userServices'
import colors from '../../helpers/colors'
import AppTextInput from '../../components/TextInput'

function RegisterUserData() {
    const { showLoadingSpinner, loadingSpinner } = useContext(AppContext)
    const sourceLot = require('../../assets/Lottie/green-dots-loader.json')
    let emailFlag = false
    const navigation = useNavigation()
    const route = useRoute()
    const { user } = route.params
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [accountType, setAccountType] = useState('student')
    const [gender, setGender] = useState('male')

    // console.log('the data here in the RegisterUserData', firstName, lastName)

    const registerUserDataFunc = async () => {
        if (
            firstName !== '' &&
            lastName !== '' &&
            emailAddress !== '' &&
            accountType !== '' &&
            gender !== ''
        ) {
            navigation.navigate('RegisterStages', {
                user,
                firstName,
                emailAddress,
                lastName,
                accountType,
                gender,
            })
        } else if (firstName === '' && lastName === '') {
            Alert.alert(
                `${I18n.t('Account')}`,
                `${I18n.t('EnterAccountInfo')}`,
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            console.log('onLogout => ')
                        },
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: false,
                }
            )
        }
    }

    return (
        <>
            {!loadingSpinner && (
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={{
                            flex: 1,
                        }}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.center}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../assets/img/logo-New.png')}
                                />
                                {/* input */}
                                <View
                                    style={{
                                        flex: 1,
                                        paddingHorizontal: widthp(20),
                                        paddingTop: heightp(10),
                                    }}
                                >
                                    <AppTextInput
                                        onChangeText={setFirstName}
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: heightp(20),
                                            fontSize: heightp(20),
                                            color: '#000',
                                        }}
                                        //
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        name="firstName"
                                        keyboardType="default"
                                        labelName={I18n.t('FirstName')}
                                    />
                                    <AppTextInput
                                        onChangeText={setLastName}
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: heightp(20),
                                            fontSize: heightp(20),
                                            color: '#000',
                                        }}
                                        //
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        name="lastName"
                                        keyboardType="default"
                                        labelName={I18n.t('LastName')}
                                    />
                                    <AppTextInput
                                        onChangeText={setEmailAddress}
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: heightp(20),
                                            fontSize: heightp(20),
                                            color: '#000',
                                        }}
                                        //
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        name="emailAddress"
                                        keyboardType="default"
                                        labelName={
                                            !emailFlag
                                                ? I18n.t('Email')
                                                : I18n.t('PhoneNumber')
                                        }
                                    />
                                    {/* account type */}
                                    <View
                                        style={{ flex: 1, marginVertical: 10 }}
                                    >
                                        <Text style={styles.label}>
                                            {I18n.t('AccountType')}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                height: 45,
                                            }}
                                        >
                                            <Pressable
                                                style={
                                                    accountType === 'student'
                                                        ? styles.checkedContainer
                                                        : styles.uncheckedContainer
                                                }
                                                onPress={() => {
                                                    setAccountType('student')
                                                }}
                                            >
                                                {accountType === 'student' ? (
                                                    <View
                                                        style={
                                                            styles.checkedDot
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.checkWhite
                                                            }
                                                        />
                                                    </View>
                                                ) : (
                                                    <View
                                                        style={
                                                            styles.uncheckedDot
                                                        }
                                                    />
                                                )}
                                                <Text
                                                    style={[
                                                        styles.label,
                                                        {
                                                            color:
                                                                accountType ===
                                                                'student'
                                                                    ? 'rgba(255, 255, 255, 1)'
                                                                    : 'rgba(67, 72, 84, 1)',
                                                        },
                                                    ]}
                                                >
                                                    {I18n.t('Student')}
                                                </Text>
                                                <View />
                                            </Pressable>
                                            <Pressable
                                                style={
                                                    accountType === 'parent'
                                                        ? styles.checkedContainer
                                                        : styles.uncheckedContainer
                                                }
                                                onPress={() => {
                                                    setAccountType('parent')
                                                }}
                                            >
                                                {accountType === 'parent' ? (
                                                    <View
                                                        style={
                                                            styles.checkedDot
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.checkWhite
                                                            }
                                                        />
                                                    </View>
                                                ) : (
                                                    <View
                                                        style={
                                                            styles.uncheckedDot
                                                        }
                                                    />
                                                )}
                                                <Text
                                                    style={[
                                                        styles.label,
                                                        {
                                                            color:
                                                                accountType ===
                                                                'parent'
                                                                    ? 'rgba(255, 255, 255, 1)'
                                                                    : 'rgba(67, 72, 84, 1)',
                                                        },
                                                    ]}
                                                >
                                                    {I18n.t('Parent')}
                                                </Text>
                                                <View />
                                            </Pressable>
                                        </View>
                                    </View>
                                    {/* gender type */}
                                    <View
                                        style={{ flex: 1, marginVertical: 10 }}
                                    >
                                        <Text style={styles.label}>
                                            {I18n.t('Gender')}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                height: 45,
                                            }}
                                        >
                                            <Pressable
                                                style={
                                                    gender === 'male'
                                                        ? styles.checkedContainer
                                                        : styles.uncheckedContainer
                                                }
                                                onPress={() => {
                                                    setGender('male')
                                                }}
                                            >
                                                {gender === 'male' ? (
                                                    <View
                                                        style={
                                                            styles.checkedDot
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.checkWhite
                                                            }
                                                        />
                                                    </View>
                                                ) : (
                                                    <View
                                                        style={
                                                            styles.uncheckedDot
                                                        }
                                                    />
                                                )}
                                                <Text
                                                    style={[
                                                        styles.label,
                                                        {
                                                            color:
                                                                gender ===
                                                                'male'
                                                                    ? 'rgba(255, 255, 255, 1)'
                                                                    : 'rgba(67, 72, 84, 1)',
                                                        },
                                                    ]}
                                                >
                                                    {I18n.t('Male')}
                                                </Text>
                                                <View />
                                            </Pressable>
                                            <Pressable
                                                style={
                                                    gender === 'female'
                                                        ? styles.checkedContainer
                                                        : styles.uncheckedContainer
                                                }
                                                onPress={() => {
                                                    setGender('female')
                                                }}
                                            >
                                                {gender === 'female' ? (
                                                    <View
                                                        style={
                                                            styles.checkedDot
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.checkWhite
                                                            }
                                                        />
                                                    </View>
                                                ) : (
                                                    <View
                                                        style={
                                                            styles.uncheckedDot
                                                        }
                                                    />
                                                )}
                                                <Text
                                                    style={[
                                                        styles.label,
                                                        {
                                                            color:
                                                                gender ===
                                                                'female'
                                                                    ? 'rgba(255, 255, 255, 1)'
                                                                    : 'rgba(67, 72, 84, 1)',
                                                        },
                                                    ]}
                                                >
                                                    {I18n.t('Female')}
                                                </Text>
                                                <View />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.loginBtn}
                                    onPress={() => registerUserDataFunc()}
                                >
                                    <View style={styles.loginBtnView}>
                                        <Text style={styles.loginText}>
                                            {I18n.t('Next')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                </View>
            )}

            {loadingSpinner && <Lottie fileSource={sourceLot} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: {
        paddingTop: 15,
        alignItems: 'center',
    },
    logo: {
        height: 75,
        width: '55%',
        resizeMode: 'stretch',
        marginVertical: 25,
    },
    loginBtn: {
        width: '60%',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: heightp(50),
        marginBottom: heightp(50),
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
        color: colors.white,
    },
    label: {
        color: 'rgba(67, 72, 84, 1)',
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
    },
    checkedContainer: {
        backgroundColor: 'rgba(155, 186, 82, 1)',
        height: '100%',
        width: '45%',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: heightp(10),
        paddingVertical: heightp(10),
    },
    checkedDot: {
        width: 30,
        height: 30,
        borderRadius: 50,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    checkWhite: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: 'rgba(155, 186, 82, 1)',
    },
    uncheckedContainer: {
        backgroundColor: 'rgba(67, 72, 84, 0.05)',
        height: '100%',
        width: '45%',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: heightp(10),
        paddingVertical: heightp(10),
    },
    uncheckedDot: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: 'rgba(217, 217, 217, 1)',
    },
})

export default RegisterUserData
