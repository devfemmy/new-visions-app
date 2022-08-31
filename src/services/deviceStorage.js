import AsyncStorage from '@react-native-async-storage/async-storage';

export const deviceStorage = {
  saveDataToDevice: async ({ key, value }) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  },
  getSavedDataFromDevice: async ({ key }) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  },
  deleteDeviceData: async ({ key }) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
};
