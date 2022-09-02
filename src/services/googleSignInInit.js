import { Config } from 'react-native-config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleSignInInit = () => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false,
    iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
  });
};
