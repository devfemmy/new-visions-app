// eslint-disable-next-line import/no-unresolved
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { socialAuthApi } from './socialAuthApi';

export const signInGoogle = async () => {
  // It will prompt google Signin Widget
  try {
    await GoogleSignin.hasPlayServices({
      // Check if device has Google Play Services installed
      // Always resolves to true on iOS
      showPlayServicesUpdateDialog: true,
    });
    const {
      user: { givenName, familyName, id, email },
    } = await GoogleSignin.signIn();
    socialAuthApi({
      firstName: givenName,
      lastName: familyName,
      email,
      id,
      type: 'GMAIL',
    });
  } catch (error) {
    console.log('Message', JSON.stringify(error));
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // alert('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('Play Services Not Available or Outdated');
    } else {
      alert(error.message);
    }
  }
};

export async function onAppleButtonPress() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  console.log('appleAuthRequestResponse ', appleAuthRequestResponse);

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    socialAuthApi({
      firstName: appleAuthRequestResponse.fullName.givenName,
      lastName: appleAuthRequestResponse.fullName.familyName,
      email: appleAuthRequestResponse.email,
      id: appleAuthRequestResponse.user,
      type: 'APPLE',
    });
  }
}
