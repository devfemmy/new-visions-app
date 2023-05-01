import axios from 'axios';
import * as RNIap from 'react-native-iap';

import Global from '../../Global';

export const restoreSubscription = async ({ billNumber, setIsLoading }) => {
  setIsLoading(true);
  RNIap.getAvailablePurchases()
    .then(() => {
      axios
        .post(
          'https://newvisions.sa/api/restoreSubscription',
          { bill_number: billNumber },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              // Authorization: `Bearer ${Global.AuthenticationToken}`,
            },
          }
        )
        .then((response) => {
          if (response.data?.code === 200 && response.data?.message === 'Success') {
            alert('Purchase restored successfully');
          } else {
            alert(response.data?.message || 'Error occured');
          }
        })
        .catch((error) => {
          alert(error?.message);
        });
    })
    .catch((error) => {
      console.log('getAvailablePurchases', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
