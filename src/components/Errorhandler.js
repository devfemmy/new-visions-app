import React, { useContext, Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import { AppContext } from '../context/AppState'

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        static contextType = AppContext
        state = {
            error: null,
            errorDisplayMessage: 'Something went wrong!',
        }
        logUserOut = async () => {
            await AsyncStorage.clear() // to clear the token
            this.context.onLogout() //context signout
        }
        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use(
                async (config) => {
                    const authToken = await AsyncStorage.getItem('token')
                    if (authToken != null) {
                        config.headers.Authorization = 'Bearer ' + authToken
                    }
                    debugger
                    config.baseURL = API_URL_Prod
                    config.headers.version = '2'
                    config.headers.platform =
                        Platform.OS === 'ios' ? 'IOS' : 'Android'
                    config.headers['content-type'] = 'application/json'
                    config.headers.Accept = 'application/json'
                    config.headers.lang = I18n.locale
                    return config
                },
                (error) => Promise.reject(error)
            )
            this.resInterceptors = axios.interceptors.response.use(
                function (response) {
                    console.log('in the interceptor message', response)
                    if (
                        response != undefined &&
                        response.data != undefined &&
                        response.data.code != undefined
                    ) {
                        if (response.data.code == 403) {
                            alert(
                                'This Account is Logged in from another Device.'
                            )
                            return response
                        } else if (response.data.code == 402) {
                            alert(
                                'kindly update mobile application to be able to use it'
                            )
                            //onLogout();
                        } else if (response.data.code == 406) {
                            alert(
                                'This Account is missing some Data. Please filled the missing information'
                            )
                            // replace('EditDataForm');
                        } else if (response.data.code == 407) {
                            Alert.alert(
                                `${I18n.t('Account')}`,
                                `${I18n.t('Error407Display')}`,
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            this.context.onLogout()
                                            console.log('onLogout => ')
                                        },
                                        style: 'cancel',
                                    },
                                ],
                                {
                                    cancelable: false,
                                }
                            )
                        } else {
                            return response
                        }
                    } else {
                        console.log('in the ress resss ress', response)
                        alert('حدث خطأ ما يرجى المحاولة لاحقا')
                        return
                    }
                },
                function (error) {
                    if (error.toJSON().message == 'Network Error') {
                        // alert('يرجى التأكد من الاتصال بالانترنت')
                    } else {
                        // alert('خطأ ما يرجى المحاولة لاحقا')
                    }
                    return Promise.reject(error)
                }
            )
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }
        removeErrorHandler = () => {
            this.setState({ error: null })
        }
        render() {
            const { signOut } = this.context
            return (
                <>
                    <Modal
                        // onBackdropPress={() => this.setState({error: false})}
                        isVisible={this.state.error}
                    >
                        <View style={styles.modalContainer}>
                            <Text
                                style={styles.modalText}
                                onPress={() => this.setState({ error: false })}
                            >
                                {I18n.t('Error407Display')}
                            </Text>
                        </View>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}
const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontFamily: 'Cairo-Medium',
        fontSize: 13,
        fontWeight: '500',
        color: 'rgba(34, 45, 51, 1)',
    },
})

export default errorHandler
