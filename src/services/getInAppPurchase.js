import { Platform } from 'react-native';

import * as RNIap from 'react-native-iap';

export const subSkus = Platform.select({
  ios: [
    'com.newtouch.newvisions_one_lesson',
    'com.newtouch.newvisions_curriculum',
    'com.newtouch.newvisions_multi_package',
    'com.newtouch.newvisions_multi_package_1',
    'com.newtouch.newvisions_multi_package_2',
    'com.newtouch.newvisions_multi_package_3',
  ],
  android: [''],
});


export const getInAppPurchaseProducts = () => {
  RNIap.getProducts(subSkus)
    .then((res) => {
      console.log(res, 'get in app successful');
    })
    .catch((error) => {
      console.log(error, 'get in app failed');
    });
};
