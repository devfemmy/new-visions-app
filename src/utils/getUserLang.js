import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserLang = async () => {
  const lang = await AsyncStorage.getItem('user-language');
  return lang || 'ar';
};
