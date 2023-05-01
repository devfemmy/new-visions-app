import axios from 'axios'
import { Alert } from 'react-native'
import RNRestart from 'react-native-restart'
import Global from '../../Global'
import { replace } from '../../Navigator'

// eslint-disable-next-line import/prefer-default-export
export const updateProfile = ({ data, lang, onLogin }) => {
    console.log('data', data, 'lang', lang)
    // setIsLoading(true)
    axios
        .post(
            'https://newvisions.sa/api/editUserProfile', // URL
            data,
            {
                // config
                headers: {
                    'Content-Type': 'multipart/form-data;',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${Global.AuthenticationToken}`,
                    Accept: 'application/json',
                    lang: lang,
                    version: 2,
                },
            }
        )
        .then((response) => {
            if (response.data.code === 200) {
                if (Global.UserName) {
                    alert('Your data has been updated Succssfully!')
                    replace('Main')
                    getUpdatedProfile({ lang, onLogin })
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
                alert(response.data.message)
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
            alert(error)
        })
        .finally(() => {
            // setIsLoading(false)
            console.log('done')
        })
}

export const getUpdatedProfile = ({ lang, onLogin }) => {
    axios
        .post(
            'https://newvisions.sa/api/getUserProfile', // URL
            // data,
            {
                // config
                headers: {
                    'Content-Type': 'application/json;',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${Global.AuthenticationToken}`,
                    Accept: 'application/json',
                    lang: lang,
                    version: 2,
                },
            }
        )
        .then((response) => {
            if (response.data.code === 200) {
                if (Global.UserName) {
                    onLogin(response.data.data, true)
                } else {
                    console.log(response.data)
                    return response.data.code
                }
                // console.log(BroadcastData);
            } else if (response.data.code === -2) {
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
