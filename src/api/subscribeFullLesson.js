import axios from 'axios';
import Global from '../../Global';

export const subscribeFullLesson = async ({ subscribeData, setLoading }) => {
  setLoading(true);
  try {
    const response = await axios.post(
      'https://newvisions.sa/api/subscribeToFullCourse',
      subscribeData,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Global.AuthenticationToken}`,
        },
      }
    );
    console.log('data received', response);
    if (response && response?.data && response.data.code !== 200) {
      // alert(response.data?.message || 'Unexpected error occured');
    }
  } catch (error) {
    console.log('error', error);
    alert(error?.message || error);
  } finally {
    setLoading(false);
  }
};
