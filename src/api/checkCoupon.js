import { Alert } from 'react-native';
import axios from 'axios';
import Global from '../../Global';

export const checkCoupon = ({ code, setCouponIsLoading, setCouponData }) => {
  setCouponIsLoading(true);
  axios
    .post(
      'https://newvisions.sa/api/checkCoupon', // URL
      {
        code,
      },
      {
        // config
        headers: {
          'Content-Type': 'application/json',
          'Acess-Control-Allow-Origin': '*',
          Authorization: `Bearer ${Global.AuthenticationToken}`,
          Accept: 'application/json',
        },
      }
    )
    .then((res) => {
      if (res.data.code === 200) {
        setCouponData(res.data.data);
        setCouponIsLoading(false);
        // alert('Coupon added successfully');
      } else {
        setCouponIsLoading(false);
        alert(res.data.message);
      }
    })
    .catch((err) => {
      // alert(err.message);
      console.log(err);
      setCouponIsLoading(false);
    });
};
