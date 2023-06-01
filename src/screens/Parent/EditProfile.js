import React, { Component } from 'react'
import {
    View,
    Pressable,
    TextInput,
    Image,
    Text as RNText,
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
import { heightp, widthp } from '../../utils/responsiveDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions'
import Global from '../../../Global'
import axios from 'axios'
import { Alert } from 'react-native'
import RNRestart from 'react-native-restart'
import { replace } from '../../../Navigator'
import HomePageService from '../../services/userServices'
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from '../../components/common'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

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
            bio: '',
            phone: '',
            email: '',
            place: '',
            dateOfBirth: '',
            organization: '',
            avatarUrl: null,
            avatar: null,
            loading: false,
            select: false,
            id: '',
            toggleTypePicker: false,
            stageOption: {},
            error: false,
            //
            stagesArray: [],
            isVisibleStage: false,
            currentIndex: null,
            currentStage: {},
            levelsArray: [],
            isVisibleLevel: false,
            currentIndexLevel: null,
            currentLevel: '',
        }
    }
    async componentDidMount() {
        await this.getSession()
        await this.getStages()
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
        this.getStages()
    }

    updateProfile = ({ data, lang, onLogin }) => {
        console.log('data', data, 'lang', lang)
        const { user } = this.context
        // setIsLoading(true)
        axios
            .post(
                'https://newvisions.sa/api/editUserProfile', // URL
                data,
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json;',
                        // 'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${user?.remember_token}`,
                        Accept: 'application/json',
                        lang: lang,
                        version: 5,
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 200) {
                    if (Global?.UserName) {
                        this.setState({ loading: false })
                        alert('Your data has been updated Successfully!')
                        replace('Main')
                        this.getUpdatedProfile({ lang, onLogin })
                        // return response.data.code
                    } else {
                        this.setState({ loading: false })
                        Alert.alert(
                            'Your data has been updated Successfully!',
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
                        // return response.data.code
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
                    this.setState({ loading: false })
                    console.log('request failed')
                    console.log(response.data)
                    alert(response.data.message)
                    return response.data.code

                    // console.log(JSON.stringify(response.data.message));
                } else {
                    console.log(response)
                    this.setState({ loading: false })
                    alert(response.data.message)
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
        const { user } = this.context

        axios
            .post(
                'https://newvisions.sa/api/getUserProfile', // URL
                // data,
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json;',
                        // 'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${user?.remember_token}`,
                        Accept: 'application/json',
                        lang: lang,
                        version: 5,
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 200) {
                    if (Global.UserName) {
                        console.log('response', response?.data)
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
                console.log(
                    'error in the response getUpdatedProfile =======>',
                    error
                )
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
                bio,
                phone,
                email,
                avatarUrl,
                toggleTypePicker,
                currentLevel,
            } = this.state
            const { user, lang, onLogin } = this.context
            this.setState({ loading: true })

            console.log(
                avatarUrl,
                currentLevel,
                '<<<==========PHOTO================>>>',
                photo
            )
            const data = new FormData()
            data.append('first_name', firstname)
            data.append('last_name', lastname)
            data.append('phone', phone)
            data.append('bio', bio)
            if (photo) {
                data.append('image', photo ? photo : null)
            }
            // if (user?.gender) {
            data.append('gender', user?.gender ? user?.gender : 1)
            // }
            data.append(
                'level_id',
                currentLevel ? currentLevel : user?.level_id
            )

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
            bio: user.bio,
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

    getStages = async () => {
        const { user } = this.context
        // showLoadingSpinner(true)
        try {
            const res = await HomePageService.getStages()
            const data = res?.data
            if (res.code === 200) {
                // showLoadingSpinner(false)
                this.setState({
                    stagesArray: data,
                })
                const userToken = user?.remember_token
                if (userToken === '' || userToken === null || !user) {
                    const defaultFilterObject = {
                        id: 3,
                        image: '/stages/secondary.png',
                        name: i18n.t('FirstSecondary'),
                        package_image: '/package_stages/secondary.png',
                    }
                    this.setState({
                        stageOption: defaultFilterObject,
                    })
                } else {
                    const result = data.filter(
                        (res) => res?.id === stageFromAsync
                    )
                    // setFilterOption(result[0])
                    console.log('result[0]', result)
                    this.setState({
                        stageOption: result[0],
                    })
                }
                // data.map((item) => {
                //     if (item?.id === user?.level_id) {
                //         this.setState({
                //             stageOption: item,
                //         })
                //         console.log('item returned xxxxxxxxxxxxxx', item)
                //         return item
                //     } else if (item?.id === user?.stage_id) {
                //         this.setState({
                //             stageOption: item,
                //         })
                //         console.log('item returned xxxxxxxxxxxxxx', item)
                //         return item
                //     } else {
                //         const userToken = Global.AuthenticationToken
                //         if (userToken === '' || userToken === null) {
                //             const defaultFilterObject = {
                //                 id: 3,
                //                 image: '/stages/secondary.png',
                //                 name: I18n.t('FirstSecondary'),
                //                 package_image: '/package_stages/secondary.png',
                //             }
                //             this.setState({
                //                 stageOption: defaultFilterObject,
                //             })
                //         }
                //         return null
                //     }
                // })
            } else {
                // showLoadingSpinner(false)
                // console.log('account is logged in another device')
            }
            return res
        } catch (err) {
            // showLoadingSpinner(false)
        }
    }

    getSubjectLevels = async () => {
        this.setState({ loading: true })

        const payload = {
            stage_id: this.state.currentStage?.id,
        }
        try {
            const res = await HomePageService.getLevels(payload)
            const data = res?.data
            if (res.code === 200) {
                this.setState({ loading: false })
                this.setState({
                    levelsArray: data,
                    isVisibleLevel: !this.state.isVisibleLevel,
                })
            } else {
                // console.log('account is logged in another device')
                // onLogout()
                // return
            }
            return res
        } catch (err) {
            this.setState({ loading: false })
        }
    }

    render() {
        const {
            firstname,
            lastname,
            bio,
            email,
            phone,
            toggleTypePicker,
            stageOption,
            isVisibleStage,
            currentIndex,
            currentStage,
            levelsArray,
            isVisibleLevel,
            currentIndexLevel,
            currentLevel,
            stagesArray,
            loading,
        } = this.state
        const { user, lang } = this.context
        // console.log('this.context.user', user)
        return (
            <>
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
                                                toggleTypePicker:
                                                    !toggleTypePicker,
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
                                <RNText
                                    style={[
                                        styles.inputTitle,
                                        {
                                            fontWeight: '700',
                                            fontSize: heightp(16),
                                        },
                                    ]}
                                >
                                    {`${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
                                </RNText>
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
                                            <RNText style={styles.inputTitle}>
                                                {I18n.t('FirstName')}
                                            </RNText>
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
                                            <RNText style={styles.inputTitle}>
                                                {I18n.t('LastName')}
                                            </RNText>
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
                                            <RNText style={styles.inputTitle}>
                                                {I18n.t('Bio')}
                                            </RNText>
                                            <Ionicons
                                                name="create-outline"
                                                size={20}
                                                color={'rgba(70, 79, 84, 1)'}
                                            />
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            autoCapitalize="none"
                                            defaultValue={bio}
                                            placeholderTextColor="#000000"
                                            onChangeText={(lastname) =>
                                                this.setState({ bio })
                                            }
                                        />
                                    </View>

                                    <View style={styles.formContainer}>
                                        <View style={globalStyles.rowBetween}>
                                            <RNText style={styles.inputTitle}>
                                                {I18n.t('Email')}
                                            </RNText>
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
                                            <RNText style={styles.inputTitle}>
                                                {I18n.t('PhoneNumber')}
                                            </RNText>
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
                                    <Pressable
                                        style={styles.formContainer}
                                        onPress={() => {
                                            this.setState({
                                                isVisibleStage: !isVisibleStage,
                                            })
                                        }}
                                    >
                                        <View style={globalStyles.rowBetween}>
                                            <RNText style={styles.inputTitle}>
                                                {I18n.t('ChooseYourClass')}
                                            </RNText>
                                            <Ionicons
                                                name="create-outline"
                                                size={20}
                                                color={'rgba(70, 79, 84, 1)'}
                                            />
                                        </View>
                                        <RNText
                                            style={{
                                                width: '100%',
                                                fontSize: heightp(14),
                                                height: 50,
                                                fontFamily: 'Cairo-Regular',
                                                color: 'rgba(70, 79, 84, 1)',
                                                // textAlign:
                                                //     lang === 'ar'
                                                //         ? 'right'
                                                //         : 'left',
                                            }}
                                        >
                                            {this.state.stageOption?.name}
                                        </RNText>
                                    </Pressable>
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
                <Modal
                    onBackdropPress={() => {
                        this.setState({
                            isVisibleStage: !isVisibleStage,
                        })
                    }}
                    isVisible={isVisibleStage}
                >
                    <View style={styles.modal}>
                        <View style={globalStyles.rowBetween}>
                            <View />
                            <Text
                                style={{
                                    color: 'rgba(0, 0, 0, 1)',
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    // paddingHorizontal: widthp(2.5),
                                }}
                                text={`${
                                    isVisibleLevel
                                        ? I18n.t('ChooseYourClass')
                                        : I18n.t('ChooseYourStageOfStudy')
                                }`}
                                fontSize={heightp(11)}
                            />
                            <Pressable
                                onPress={() => {
                                    {
                                        isVisibleLevel
                                            ? this.setState({
                                                  isVisibleLevel:
                                                      !isVisibleLevel,
                                              })
                                            : this.setState({
                                                  isVisibleStage:
                                                      !isVisibleStage,
                                              })
                                    }
                                }}
                                style={{
                                    backgroundColor: 'rgba(250, 250, 249, 1)',
                                    borderRadius: 20,
                                    padding: 5,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={20}
                                    color={'#000'}
                                />
                            </Pressable>
                        </View>
                        {isVisibleLevel ? (
                            <>
                                <View
                                    style={[
                                        globalStyles.rowBetween,
                                        {
                                            flexDirection: 'column',
                                        },
                                    ]}
                                >
                                    {levelsArray?.map((item, index) => {
                                        return (
                                            <Pressable
                                                style={styles.levelContainer}
                                                onPress={() => {
                                                    this.setState({
                                                        currentIndexLevel:
                                                            index,
                                                        currentLevel: item?.id,
                                                    })
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'rgba(0, 0, 0, 1)',
                                                        fontWeight: '500',
                                                        textAlign: 'center',
                                                        paddingHorizontal:
                                                            widthp(5),
                                                    }}
                                                    text={`${item?.name}`}
                                                    fontSize={heightp(12)}
                                                />
                                                {index === currentIndexLevel ? (
                                                    <View
                                                        style={styles.check}
                                                    />
                                                ) : (
                                                    <View
                                                        style={styles.uncheck}
                                                    />
                                                )}
                                            </Pressable>
                                        )
                                    })}
                                </View>
                                {loading ? (
                                    <ContentLoader
                                        viewBox="0 0 380 70"
                                        backgroundColor={colors.darkGray}
                                        foregroundColor={colors.gray}
                                        height={100}
                                        speed={1}
                                    >
                                        <Rect
                                            x="80"
                                            y="17"
                                            rx="4"
                                            ry="4"
                                            width="200"
                                            height="13"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <Pressable
                                        style={styles.nextBtn}
                                        onPress={() => {
                                            // homePage()
                                            this.setState({
                                                isVisibleStage: false,
                                                isVisibleLevel: false,
                                            })
                                        }}
                                    >
                                        <View style={styles.nextBtnView}>
                                            <MaterialIcons
                                                name={
                                                    lang == 'ar'
                                                        ? 'arrow-forward-ios'
                                                        : 'arrow-back-ios'
                                                }
                                                size={20}
                                                color={colors.white}
                                            />

                                            <RNText style={styles.nextText}>
                                                {I18n.t('Apply')}
                                            </RNText>
                                        </View>
                                    </Pressable>
                                )}
                            </>
                        ) : (
                            <>
                                <View style={globalStyles.rowBetween}>
                                    {stagesArray?.map((item, index) => {
                                        const uri = `${IMAGEURL2}/${item?.image}`
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'column',
                                                    marginVertical: heightp(10),
                                                }}
                                            >
                                                <Pressable
                                                    style={{
                                                        marginTop: heightp(10),
                                                        backgroundColor:
                                                            'rgba(155, 186, 82, 1)',
                                                        borderRadius: 20,
                                                        padding: 10,
                                                        width: heightp(90),
                                                        height: heightp(90),
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}
                                                    onPress={() => {
                                                        this.setState({
                                                            currentIndex: index,
                                                            currentStage: item,
                                                            stageOption: item,
                                                        })
                                                    }}
                                                >
                                                    <FastImage
                                                        style={{
                                                            width: heightp(70),
                                                            height: heightp(70),
                                                            borderRadius: 10,
                                                            // marginRight: heightp(20),
                                                        }}
                                                        source={{
                                                            uri,
                                                            priority:
                                                                FastImage
                                                                    .priority
                                                                    .normal,
                                                        }}
                                                        resizeMode={
                                                            FastImage.resizeMode
                                                                .contain
                                                        }
                                                    />
                                                </Pressable>
                                                <Pressable
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                        marginVertical:
                                                            heightp(5),
                                                    }}
                                                    onPress={() => {
                                                        this.setState({
                                                            currentIndex: index,
                                                            currentStage: item,
                                                        })
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: 'rgba(0, 0, 0, 1)',
                                                            fontWeight: '500',
                                                            textAlign: 'center',
                                                            paddingHorizontal:
                                                                widthp(5),
                                                        }}
                                                        text={`${item?.name}`}
                                                        fontSize={heightp(12)}
                                                    />
                                                    {index === currentIndex ? (
                                                        <View
                                                            style={styles.check}
                                                        />
                                                    ) : (
                                                        <View
                                                            style={
                                                                styles.uncheck
                                                            }
                                                        />
                                                    )}
                                                </Pressable>
                                            </View>
                                        )
                                    })}
                                </View>
                                {loading ? (
                                    <ContentLoader
                                        viewBox="0 0 380 70"
                                        backgroundColor={colors.darkGray}
                                        foregroundColor={colors.gray}
                                        height={100}
                                        speed={1}
                                    >
                                        <Rect
                                            x="80"
                                            y="17"
                                            rx="4"
                                            ry="4"
                                            width="200"
                                            height="13"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <Pressable
                                        style={styles.nextBtn}
                                        onPress={() => {
                                            loading
                                                ? null
                                                : this.getSubjectLevels()
                                        }}
                                    >
                                        <View style={styles.nextBtnView}>
                                            <MaterialIcons
                                                name={
                                                    lang == 'ar'
                                                        ? 'arrow-forward-ios'
                                                        : 'arrow-back-ios'
                                                }
                                                size={20}
                                                color={colors.white}
                                            />

                                            <RNText style={styles.nextText}>
                                                {I18n.t('Next')}
                                            </RNText>
                                        </View>
                                    </Pressable>
                                )}
                            </>
                        )}
                    </View>
                </Modal>
            </>
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
    //
    modal: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
    },
    nextBtn: {
        width: '80%',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: heightp(10),
    },
    nextBtnView: {
        flex: 1,
        borderRadius: 40,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    nextText: {
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colors.white,
        paddingHorizontal: widthp(10),
    },
    uncheck: {
        width: heightp(20),
        height: heightp(20),
        borderRadius: heightp(20 / 2),
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderWidth: 1,
        borderColor: 'rgba(202, 202, 202, 1)',
    },
    check: {
        width: heightp(20),
        height: heightp(20),
        borderRadius: heightp(20 / 2),
        backgroundColor: 'rgba(155, 186, 82, 1)',
        borderWidth: 1,
        borderColor: 'rgba(155, 186, 82, 0.53)',
    },
    levelContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: widthp(15),
        borderRadius: 20,
        // alignSelf: 'center',
        marginVertical: heightp(5),
        backgroundColor: 'rgba(250, 250, 249, 1)',
    },
})
