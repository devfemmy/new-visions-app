import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import { Platform } from 'react-native'

export const reqInterceptor = async (req) => {
    const token = await AsyncStorage.getItem('token')

    // console.log(I18n.locale, '======> token for inside the interceptor', token)

    req.headers['content-type'] = 'application/json'
    req.headers.Accept = 'application/json'
    req.headers.lang = I18n.locale
    req.headers.version = 5
    req.headers.platform = Platform.OS === 'ios' ? 'IOS' : 'Android'
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
}
