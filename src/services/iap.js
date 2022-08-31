/* eslint-disable no-param-reassign */
import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';

export const requestPurchase = async ({ sku }) => {
  console.log('sku', sku)
  try {
    await RNIap.requestPurchase(sku, false);
  } catch (err) {
    // alert(err.message);
    console.log(err.message, 'error')
  }
};

export const restorePurchase = async () => {};

export const iapSkus = Platform.select({
  ios: [
    'com.newtouch.newvisions_one_lesson',
    'com.newtouch.newvisions_full_course',
    'com.newtouch.newvisions_multi_package',
  ],
  android: [''],
});

