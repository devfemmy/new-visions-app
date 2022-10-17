import React, { useContext, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { Alert, Platform } from 'react-native'
import * as RNIap from 'react-native-iap'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging'
import AppNavigator from './src/navigation/AppNavigator'
import { AppContext, AppState } from './src/context/AppState'
import { initTranslate } from './translate/translate'
import 'react-native-gesture-handler'
import { setInterceptors } from './src/api/client'
import store from './src/redux/store'
import Global from './Global'
import {
    NotificationListener,
    requestUserPermission,
} from './utils/pushNotification'
import { usePlatform } from './src/utils/usePlatform'
import { deviceStorage } from './src/services/deviceStorage'
import { iapSkus } from './src/services/iap'
import { googleSignInInit } from './src/services/googleSignInInit'
import axios from 'axios'
import errorHandler from './src/components/Errorhandler'
import { GlobalStateProvider } from './src/context/GlobalStateProvider'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

initTranslate()
setInterceptors(axios)
function App() {
    const { onLogout, lang } = useContext(AppContext)
    const { isIOS } = usePlatform()
    const purchaseUpdateSubscription = useRef(null)
    const purchaseErrorSubscription = useRef(null)
    useEffect(() => {
        SplashScreen.hide()
        googleSignInInit()
        requestUserPermission()
        NotificationListener()
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            Alert.alert(
                JSON.stringify(remoteMessage?.notification?.title),
                JSON.stringify(remoteMessage?.notification?.body)
            )
            console.log('handle in foreground', remoteMessage)
            const { notification, messageId } = remoteMessage

            if (Platform.OS == 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: messageId,
                    body: notification?.body,
                    title: notification?.title,
                    sound: 'default',
                })
            } else {
                PushNotification.localNotification({
                    channelId: 'your-channel-id',
                    id: messageId,
                    body: notification?.body,
                    title: notification?.title,
                    soundName: 'default',
                    vibrate: true,
                    playSound: true,
                })
            }
        })

        return unsubscribe
    }, [])
    const iapInit = async () => {
        try {
            const res = (await RNIap?.initConnection?.()) || false
            if (res) {
                purchaseUpdateSubscription.current =
                    RNIap.purchaseUpdatedListener(async (purchase) => {
                        const receipt = purchase.transactionReceipt
                        if (receipt) {
                            deviceStorage
                                .getSavedDataFromDevice({
                                    key: 'subscriptionInfo',
                                })
                                .then((data) => {
                                    console.log('data', data)
                                })
                        } else {
                            purchaseErrorSubscription.current =
                                RNIap.purchaseErrorListener(
                                    (currentPurchaseError) => {
                                        if (
                                            currentPurchaseError?.code ===
                                            'E_USER_CANCELLED'
                                        ) {
                                            // do nothing here
                                        } else if (
                                            currentPurchaseError?.code ===
                                            'E_UNKNOWN'
                                        ) {
                                            // @todo
                                        } else {
                                            Alert.alert(
                                                'Purchase error',
                                                JSON.stringify(
                                                    currentPurchaseError?.message
                                                )
                                            )
                                        }
                                    }
                                )
                        }
                    })
                return
            }
            alert("Couldn't get in-app-purchase information")
        } catch {
            alert('Fail to get in-app-purchase information')
        }
    }
    useEffect(() => {
        if (isIOS) {
            iapInit()
        }
        return () => {
            if (purchaseUpdateSubscription && isIOS) {
                // purchaseUpdateSubscription.remove();
                // purchaseUpdateSubscription.current = null;
            }
            if (purchaseErrorSubscription && isIOS) {
                // purchaseErrorSubscription.remove();
                // purchaseErrorSubscription.current = null;
            }
        }
    }, [isIOS])

    useEffect(() => {
        if (isIOS) RNIap.getProducts(iapSkus)
    }, [isIOS])
    return (
        <Provider store={store}>
            <GlobalStateProvider>
                <AppState>
                    <AppNavigator />
                </AppState>
            </GlobalStateProvider>
        </Provider>
    )
}

export default App
