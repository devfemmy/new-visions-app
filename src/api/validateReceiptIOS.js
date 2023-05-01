import axios from 'axios';
import * as RNIap from 'react-native-iap';

import Global from '../../Global';
import { replace } from '../../Navigator';
import { deviceStorage } from '../services/deviceStorage';
import { subscribeFullLesson } from './subscribeFullLesson';
import { subscribeOneLesson } from './subscribeOneLesson';
import { subscribeToMultiPackage } from './subscribeToMultiPackage';

export const validateReceiptIOS = async ({ purchase, subscriptionInfo, setIsLoading }) => {
  try {
    const response = await axios.post(
      'https://newvisions.sa/api/verifySubscription',
      { receipt: purchase.transactionReceipt },

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Global.AuthenticationToken}`,
        },
      }
    );
    if (response.data?.code === 200 && response.data?.message === 'Success') {
      if (subscriptionInfo?.paymentFor === 'MultiPackage') {
        const subscribeData = {
          package_id: subscriptionInfo.packageId,
          bill_number: subscriptionInfo.billNumber,
          ios_token: purchase.transactionReceipt,
        };
        subscribeToMultiPackage({ subscribeData, setLoading: setIsLoading }).then(() => {
          RNIap.finishTransaction(purchase, false).then(() =>
            deviceStorage
              .deleteDeviceData({ key: 'subscriptionInfo' })
              .then(() => replace('subscriptions'))
          );
        });
      } else if (subscriptionInfo?.paymentFor === 'OneLesson') {
        const subscribeData = {
          subject_id: subscriptionInfo.subjectId,
          lesson_id: subscriptionInfo.lessonId,
          bill_number: subscriptionInfo.billNumber,
          ios_token: purchase.transactionReceipt,
        };
        subscribeOneLesson({ subscribeData, setLoading: setIsLoading }).then(() => {
          RNIap.finishTransaction(purchase, false).then(() =>
            deviceStorage
              .deleteDeviceData({ key: 'subscriptionInfo' })
              .then(() => replace('subscriptions'))
          );
        });
      } else if (subscriptionInfo?.paymentFor === 'FullLesson') {
        const subscribeData = {
          subject_id: subscriptionInfo.subjectId,
          bill_number: subscriptionInfo.billNumber,
          ios_token: purchase.transactionReceipt,
        };
        subscribeFullLesson({ subscribeData, setLoading: setIsLoading }).then(() => {
          RNIap.finishTransaction(purchase, false).then(() =>
            deviceStorage
              .deleteDeviceData({ key: 'subscriptionInfo' })
              .then(() => replace('subscriptions'))
          );
        });
      } else if (subscriptionInfo?.paymentFor === 'PrivateLesson') {
        // @ Todo
      } else {
        // @ Todo
        alert('Empty');
      }
      // await RNIap.finishTransaction(purchase, false);
    } else {
      alert(response.data?.message || 'Error occured');
    }
  } catch (error) {
    alert(error?.message);
  }
};
