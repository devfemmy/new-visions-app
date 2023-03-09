import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'

export const reqInterceptor = async (req) => {
    const token = await AsyncStorage.getItem('token')

    req.headers['content-type'] = 'application/json'
    req.headers.Accept = 'application/json'
    req.headers.version = 4
    if (token) {
        console.log('token', token)
        req.headers.Authorization = `Bearer ${token}`
        req.headers.lang = I18n.locale
    }
    return req
}
