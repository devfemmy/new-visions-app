import axios from 'axios';
//import analytics from '@react-native-firebase/analytics';

import Global from '../../Global';
import { navigate, replace } from '../../Navigator';

export const socialAuthApi = ({ firstName, lastName, email, id, type }) => {
  axios
    .post('https://www.newvisions.sa/api/signupExternal', {
      first_name: firstName,
      last_name: lastName,
      email,
      client_id: id,
      type,
    })
    .then(async (response) => {
      if (response.data.code === 200) {
        console.log(response.data);
        Global.AuthenticationToken = response.data.data.remember_token;
        Global.UserName = response.data.data.first_name;
        Global.lastName = response.data.data.last_name;
        Global.phone = response.data.data.phone;
        Global.email = response.data.data.email;
        Global.Image = response.data.data?.image;
        if (response.data.data?.type === 2) {
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
          method: 'gmail',
        });

        console.log(response.data.data.phone === '123456');

        if (response.data.data.phone === '123456' || response.data.data.phone === 123456) {
          navigate('CompleteProfile');
        } else {
          replace('Main');
        }
      } else {
        alert(JSON.stringify(response.data.message));
      }
    })
    .catch((error) => {
      alert(error);
    });
};
