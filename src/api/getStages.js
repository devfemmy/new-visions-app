import axios from 'axios';
import Global from '../../Global';

export const getStages = ({ setIsLoading, setStages }) => {
  setIsLoading(true);
  axios
    .post(
      'https://newvisions.sa/api/getStages', // URL
      {},
      {
        // config
        headers: {
          'Content-Type': 'application/json',
          'Acess-Control-Allow-Origin': '*',
          // Authorization: `Bearer ${Global.AuthenticationToken}`,
          Accept: 'application/json',
        },
      }
    )
    .then((res) => {
      if (res.data.code === 200) {
        setStages(res.data.data);
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      // alert(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
