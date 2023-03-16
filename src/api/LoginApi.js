import axios from 'axios';
//import analytics from '@react-native-firebase/analytics';

import Global from '../../Global';

export const LoginAPI = ({ email, password, navigation }) => {
  axios
    .post('https://mo.visionsplus.net/api/login', {
      email,
      password,
    })
    .then(async (response) => {
      if (JSON.stringify(response.data.code) == 200) {
        Global.AuthenticationToken = response.data.data.remember_token;
        Global.UserName = response.data.data.first_name;
        Global.lastName = response.data.data.last_name;
        Global.phone = response.data.data.phone;
        Global.email = response.data.data.email;
        Global.Image = response.data.data.image;
        if (response.data.data.type === 2) {
          Global.UserType = 'Teacher';
        }
        if (response.data.data.type === 3) {
          Global.UserType = 'Student';
        }
        if (response.data.data.type === 4) {
          Global.UserType = 'Parent';
        }
        Global.LoggedIn = true;
        await analytics().logLogin({
          method: 'email',
        });
        navigation.replace('Main');
      } else {
        alert(JSON.stringify(response.data.message));
      }
    })
    .catch((error) => {
      alert(error);
    });
};
