import AsyncStorage from '@react-native-async-storage/async-storage';

export const reqInterceptor = async (req) => {
  const token = await AsyncStorage.getItem("token");

  
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers.version = '2';
    req.headers.lang = 'ar';

  }
  // req.headers['content-type'] = 'application/json';
  // req.headers.Accept = 'application/json';
  return req;
  };