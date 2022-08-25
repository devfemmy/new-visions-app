import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

async function getFcmToken() {
  console.log('I AM HERE NOW')
  let fcmToken = await AsyncStorage.getItem("fcmtoken");
  console.log('I AM HERE NOW old', fcmToken)
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', fcmToken)
        console.log(fcmToken, 'fcmtoken')
      }else {
        console.log('COULD NOT GET TOKEN')
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    }
  });
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'remote message foreground')
  })
}