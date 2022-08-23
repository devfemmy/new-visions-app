import axios from 'axios';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import Global from '../../Global';

// eslint-disable-next-line import/prefer-default-export
export const updateProfile = ({ data, setIsLoading }) => {
  setIsLoading(true);
  axios
    .post(
      'https://www.newvisions.sa/api/editUserProfile', // URL
      data,
      {
        // config
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${Global.AuthenticationToken}`,
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      if (response.data.code === 200) {
        if (Global.UserName) {
          alert('Your data has been updated Succssfully!');
        } else {
          Alert.alert(
            'Your data has been updated Succssfully!',
            'To synchronize your data we will need to restart the app',
            [
              {
                text: 'Ok',
                onPress: () => RNRestart.Restart(),
                style: 'cancel',
              },
            ],
            {
              cancelable: false,
            }
          );
        }
        // console.log(BroadcastData);
      } else if (response.data.code === -2) {
        alert(response.data.message);
      } else if (response.data.code !== 200) {
        console.log('request failed');
        console.log(response.data);
        // console.log(JSON.stringify(response.data.message));
      } else {
        console.log(response);
      }
    })
    .catch((error) => {
      alert(error);
    })
    .finally(() => setIsLoading(false));
};
