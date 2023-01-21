import React, { Component } from 'react'
import {
    View,
    Pressable,
    TextInput,
    Image,
    Text,
    StatusBar,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
    Platform,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { AppContext } from '../../context/AppState'
import colors from '../../helpers/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../helpers/globalStyles'
import AppButton from '../../components/Button'
import I18n from 'i18n-js'
import { heightp } from '../../utils/responsiveDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { IMAGEURL } from '../../utils/functions'
import Global from '../../../Global'
import axios from 'axios'
import { Alert } from 'react-native'
import RNRestart from 'react-native-restart'
import { replace } from '../../../Navigator'

const Layout = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
}

let source = {}
let pickerResponse = ''

class EditProfile extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            place: '',
            dateOfBirth: '',
            organization: '',
            avatarUrl: '',
            avatar: null,
            loading: false,
            select: false,
            id: '',
            toggleTypePicker: false,
            error: false,
        }
    }
    async componentDidMount() {
        await this.getSession()
        this.props.navigation.addListener('focus', () => {
            this.onReload()
        })
    }
    toggle = () => {
        this.setState({ select: true })
    }

    selectFileTapped = async () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        }

        const result = await launchImageLibrary(options)
        console.log('response', result?.assets[0])
        if (result.didCancel) {
            console.log('User cancelled photo picker')
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error)
        } else {
            console.log('<<<PHOTO>>>sssssss', result?.assets[0])
            let response = result.assets[0]
            const uri = response.uri
            const type = response.type
            const name = response.fileName || response.uri.substring(-10)

            source = {
                uri,
                type,
                name,
            }
            console.log('<<<PHOTO>>>sssssss source', source)
            this.uploadAvatar(source)
        }
    }

    selectCameraTapped = async () => {
        console.log('selectCameraTapped')
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        }

        const result = await launchCamera(options)
        console.log('response', result)
        if (result.didCancel) {
            console.log('User cancelled photo picker')
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error)
        } else {
            console.log('<<<PHOTO>>>sssssss', result?.assets[0])
            let response = result.assets[0]
            const uri = response.uri
            const type = response.type
            const name = response.fileName || response.uri.substring(-10)

            source = {
                uri,
                type,
                name,
            }
            console.log('<<<PHOTO>>>sssssss source', source)
            this.uploadAvatar(source)
        }
    }

    onReload = () => {
        this.getSession()
    }

    updateProfile = ({ data, lang, onLogin }) => {
        console.log('data', data, 'lang', lang)
        // setIsLoading(true)
        axios
            .post(
                'https://www.newvisions.sa/api/editUserProfile', // URL
                data,
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json;',
                        // 'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                        lang: lang,
                        version: 3,
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 200) {
                    if (Global.UserName) {
                        alert('Your data has been updated Succssfully!')
                        replace('Main')
                        this.getUpdatedProfile({ lang, onLogin })
                        return response.data.code
                    } else {
                        Alert.alert(
                            'Your data has been updated Succssfully!',
                            'To synchronize your data we will need to restart the app',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => {
                                        RNRestart.Restart()
                                    },
                                    style: 'cancel',
                                },
                            ],
                            {
                                cancelable: false,
                            }
                        )
                        return response.data.code
                    }
                    // console.log(BroadcastData);
                } else if (response.data.code === -2) {
                    this.setState({ loading: false })
                    alert(response.data.message)
                    console.log(
                        response.data,
                        '<<<<<<<<<<DATA>>>>>>>>>>>>>>',
                        response.data.message
                    )
                    return response.data.code
                } else if (response.data.code !== 200) {
                    console.log('request failed')
                    console.log(response.data)
                    return response.data.code

                    // console.log(JSON.stringify(response.data.message));
                } else {
                    console.log(response)
                    return response.data.code
                }
            })
            .catch((error) => {
                alert(error)
            })
            .finally(() => {
                // setIsLoading(false)
                console.log('done')
            })
    }

    getUpdatedProfile = ({ lang, onLogin }) => {
        axios
            .get(
                'https://www.newvisions.sa/api/getUserProfile', // URL
                // data,
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json;',
                        // 'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                        lang: lang,
                        version: 3,
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 200) {
                    if (Global.UserName) {
                        onLogin(response.data.data, true)
                        this.onReload()
                        this.setState({ loading: false })
                    } else {
                        console.log(response.data)
                        return response.data.code
                    }
                    // console.log(BroadcastData);
                } else if (response.data.code === -2) {
                    this.setState({ loading: false })
                    console.log(
                        '<<<<<<<<<<DATA>>>>>>>>>>>>>>',
                        response.data.message
                    )
                    return response.data.code
                } else if (response.data.code !== 200) {
                    console.log('request failed')
                    console.log(response.data)
                    return response.data.code
                    // console.log(JSON.stringify(response.data.message));
                } else {
                    console.log(response)
                    return response.data.code
                }
            })
            .catch((error) => {
                // alert(error)
                console.log(error)
            })
            .finally(() => {
                // setIsLoading(false)
                console.log('done')
            })
    }

    uploadAvatar = async (photo) => {
        try {
            let {
                firstname,
                lastname,
                phone,
                email,
                avatarUrl,
                toggleTypePicker,
            } = this.state
            const { user, lang, onLogin } = this.context
            this.setState({ loading: true })

            console.log('<<<==========PHOTO================>>>', photo)
            const data = new FormData()
            data.append('first_name', firstname)
            data.append('last_name', lastname)
            data.append('phone', phone)
            data.append('image', photo ? photo : avatarUrl)
            data.append('gender', user?.gender)

            this.updateProfile({ data, lang, onLogin })
        } catch (error) {
            console.log('error', error)
        }
    }

    getSession = async () => {
        const { user } = this.context
        console.log('<<<<<<<<<<DATA>>>>>>>>>>>>>>', user)

        this.setState({
            firstname: user.first_name,
            lastname: user.last_name,
            phone: user.phone,
            email: user.email,
            avatarUrl: user.image,
        })
    }
    pix = () => {
        if (this.state.avatarUrl == null || this.state.avatarUrl == '') {
            return (
                <Image
                    source={require('../../assets/img/default-profile-picture.jpeg')}
                    style={{
                        width: heightp(150),
                        height: heightp(150),
                        borderRadius: heightp(150),
                        marginRight: heightp(16),
                        borderWidth: 3,
                        // overflow: "hidden",
                        borderColor: '#fff',
                    }}
                />
            )
        } else {
            return (
                <FastImage
                    style={{
                        width: heightp(150),
                        height: heightp(150),
                        borderRadius: heightp(150),
                        marginRight: heightp(16),
                        borderWidth: 3,
                        // overflow: "hidden",
                        borderColor: '#fff',
                    }}
                    source={{
                        uri: `${IMAGEURL}/${this.state.avatarUrl}`,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            )
        }
    }
    render() {
        const { firstname, lastname, email, phone, toggleTypePicker } =
            this.state
        const { user } = this.context
        console.log('this.context.user', user)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    translucent={false}
                    barStyle="dark-content"
                    backgroundColor={colors.white}
                />
                <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{
                        flex: 1,
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.content}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginVertical: 5,
                                }}
                            >
                                {this.pix()}
                                <Pressable
                                    style={styles.icon}
                                    onPress={() => {
                                        this.setState({
                                            toggleTypePicker: !toggleTypePicker,
                                        })
                                    }}
                                >
                                    <Ionicons
                                        name="camera"
                                        size={17}
                                        color={colors.white}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: heightp(5),
                            }}
                        >
                            <Text
                                style={[
                                    styles.inputTitle,
                                    {
                                        fontWeight: '700',
                                        fontSize: heightp(16),
                                    },
                                ]}
                            >
                                {`${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
                            </Text>
                        </View>
                        {toggleTypePicker && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginVertical: heightp(5),
                                    paddingHorizontal: heightp(150),
                                }}
                            >
                                <Pressable
                                    style={[
                                        {
                                            paddingHorizontal: 7.5,
                                            paddingVertical: 7.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor:
                                                'rgba(70, 79, 84, 1)',
                                            borderRadius: 20,
                                        },
                                    ]}
                                    onPress={() => {
                                        this.selectCameraTapped()
                                    }}
                                >
                                    <Ionicons
                                        name="camera"
                                        size={17}
                                        color={colors.white}
                                    />
                                </Pressable>
                                <Pressable
                                    style={[
                                        {
                                            paddingHorizontal: 7.5,
                                            paddingVertical: 7.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor:
                                                'rgba(70, 79, 84, 1)',
                                            borderRadius: 20,
                                        },
                                    ]}
                                    onPress={() => {
                                        this.selectFileTapped()
                                    }}
                                >
                                    <Ionicons
                                        name="folder-open"
                                        size={17}
                                        color={colors.white}
                                    />
                                </Pressable>
                            </View>
                        )}

                        <View style={styles.card}>
                            <View style={styles.form}>
                                <View style={styles.formContainer}>
                                    <View style={globalStyles.rowBetween}>
                                        <Text style={styles.inputTitle}>
                                            {I18n.t('FirstName')}
                                        </Text>
                                        <Ionicons
                                            name="create-outline"
                                            size={20}
                                            color={'rgba(70, 79, 84, 1)'}
                                        />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        defaultValue={firstname}
                                        placeholderTextColor="#000000"
                                        onChangeText={(firstname) =>
                                            this.setState({ firstname })
                                        }
                                    />
                                </View>
                                <View style={styles.formContainer}>
                                    <View style={globalStyles.rowBetween}>
                                        <Text style={styles.inputTitle}>
                                            {I18n.t('LastName')}
                                        </Text>
                                        <Ionicons
                                            name="create-outline"
                                            size={20}
                                            color={'rgba(70, 79, 84, 1)'}
                                        />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        defaultValue={lastname}
                                        placeholderTextColor="#000000"
                                        onChangeText={(lastname) =>
                                            this.setState({ lastname })
                                        }
                                    />
                                </View>

                                <View style={styles.formContainer}>
                                    <View style={globalStyles.rowBetween}>
                                        <Text style={styles.inputTitle}>
                                            {I18n.t('Email')}
                                        </Text>
                                        <Ionicons
                                            name="create-outline"
                                            size={20}
                                            color={'rgba(70, 79, 84, 1)'}
                                        />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        defaultValue={email}
                                        placeholderTextColor="#000000"
                                        onChangeText={(email) =>
                                            this.setState({ email })
                                        }
                                    />
                                </View>

                                <View style={styles.phoneContainer}>
                                    <View style={globalStyles.rowBetween}>
                                        <Text style={styles.inputTitle}>
                                            {I18n.t('PhoneNumber')}
                                        </Text>
                                        <Ionicons
                                            name="create-outline"
                                            size={20}
                                            color={'rgba(70, 79, 84, 1)'}
                                        />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        defaultValue={phone}
                                        placeholderTextColor="#000000"
                                        onChangeText={(phone) =>
                                            this.setState({ phone })
                                        }
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    marginTop: heightp(30),
                                }}
                            >
                                <AppButton
                                    color="primary"
                                    title={I18n.t('Save')}
                                    onPress={() => {
                                        console.log('hereee')
                                        this.uploadAvatar()
                                        // navigation.navigate('SignUp')
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
                {this.state.loading ? (
                    <View style={styles.popUp2}>
                        <ActivityIndicator
                            size="large"
                            color="rgba(70, 79, 84, 1)"
                        />
                    </View>
                ) : null}
            </SafeAreaView>
        )
    }
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(248, 250, 252, 1)',
    },

    headerTitle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 18,
    },

    card: {
        marginHorizontal: heightp(10),
        padding: 20,
        borderRadius: 5,
        marginBottom: 16,
    },
    inputTitle: {
        fontSize: heightp(13),
        fontWeight: '700',
        color: 'rgba(70, 79, 84, 1)',
        fontFamily: 'Cairo-Regular',
    },
    input: {
        width: '100%',
        fontSize: heightp(14),
        height: 50,
        fontFamily: 'Cairo-Regular',
        color: 'rgba(70, 79, 84, 1)',
    },

    formContainer: {
        borderWidth: 1,
        borderColor: 'rgba(70, 79, 84, 0.091)',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 2,
        marginBottom: 15,
        // height: 65,
        backgroundColor: 'rgba(70, 79, 84, 0.091)',
    },

    icon: {
        position: 'absolute',
        right: 153,
        bottom: 3,
        paddingHorizontal: 7.5,
        paddingVertical: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(70, 79, 84, 1)',
        borderRadius: 20,
    },
    button: {
        marginHorizontal: 5,
        backgroundColor: 'rgba(70, 79, 84, 1)',
        borderRadius: 5,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        borderRadius: 50,
    },
    b: {
        backgroundColor: 'rgba(70, 79, 84, 1)',
        width: '90%',
        alignItems: 'center',
        padding: 12,
        marginTop: '2%',
        marginBottom: '2%',
        borderRadius: 15,
    },
    b2: {
        borderWidth: 1,
        borderColor: 'rgba(70, 79, 84, 1)',
        width: '90%',
        alignItems: 'center',
        padding: 12,
        marginTop: '2%',
        marginBottom: '2%',
        borderRadius: 15,
    },
    popUp2: {
        position: 'absolute',
        width: '100%',
        height: '110%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popUp: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card2: {
        width: '80%',
        height: '40%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    //
    photoText: {
        color: colors.gray,
        textAlign: 'center',
        marginVertical: 5,
    },
    phoneContainer: {
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 9,
        marginBottom: 15,
        backgroundColor: 'rgba(70, 79, 84, 0.091)',
    },
    buttonStyles: {
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        width: '100%',
        marginVertical: 20,
    },
    buttonText: {
        fontFamily: 'Cairo-Regular',
    },
})
