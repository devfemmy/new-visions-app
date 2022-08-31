import { Config } from 'react-native-config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleSignInInit = () => {
  GoogleSignin.configure({
    webClientId: '1081535237014-s09kl46to5to3rvu497g2i93ue5e0h52.apps.googleusercontent.com',
    androidClientId:'1081535237014-s09kl46to5to3rvu497g2i93ue5e0h52.apps.googleusercontent.com',
    offlineAccess: false,
    iosClientId: '1081535237014-46l37b1ur4k1j4hnmf41i0pgdh93fo2c.apps.googleusercontent.com',
    forceCodeForRefreshToken:true
  });
};
