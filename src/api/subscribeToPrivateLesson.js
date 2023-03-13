import axios from 'axios';
import Global from '../../Global';

export const subscribeToPrivateLesson = async ({ id, setLoading }) => {
  setLoading(true);
  try {
    const response = await axios.post(
      'https://mo.visionsplus.net/api/subscribeToPrivateCourse',
      {
        subject_id: id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Global.AuthenticationToken}`,
        },
      }
    );
    if (response.data.code !== 200) {
      alert(response.data?.message || 'Unexpected error occured');
    } else {
      alert('Message sent successfully');
    }
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
