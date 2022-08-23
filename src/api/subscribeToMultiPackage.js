import axios from 'axios';
import Global from '../../Global';

export const subscribeToMultiPackage = async ({ subscribeData, setLoading }) => {
  setLoading(true);
  try {
    const response = await axios.post(
      'https://newvisions.sa/api/subscribeToMultiPackage',
      subscribeData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Global.AuthenticationToken}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.code !== 200) {
      alert(response.data?.message || 'Unexpected error occured');
    }
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
