import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { reqInterceptor } from './request-interceptor'
import { resInterceptor } from './response-interceptor'

const axiosInstance = axios.create({
    baseURL: 'https://newvisions.sa/api', // https://newvisions.sa/api/
})
axiosInstance.interceptors.request.use(reqInterceptor, (err) =>
    console.log(err)
)

export default axiosInstance
