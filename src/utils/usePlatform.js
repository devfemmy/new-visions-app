import { Platform } from 'react-native';

export const usePlatform = () => ({
  isAndroidDevice: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
});
