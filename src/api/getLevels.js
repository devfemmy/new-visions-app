import axios from 'axios';
import Global from '../../Global';

export const getLevels = ({ activeStage, setLevelIsLoading, setLevels }) => {
  setLevelIsLoading(true);
  axios
    .post(
      'https://mo.visionsplus.net/api/getLevels', // URL
      {
        stage_id: activeStage?.id,
      },
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
      console.log(res.data);
      if (res.data.code === 200) {
        console.log(res.data.data);
        setLevels(res.data.data);
        setLevelIsLoading(false);
      } else {
        alert(res.data.message);
        setLevelIsLoading(false);
      }
    })
    .catch((err) => {
      // alert(err.message);
      console.log(err);
      setLevelIsLoading(false);
    });
};
