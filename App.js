import React, { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { Alert } from 'react-native'
import * as RNIap from 'react-native-iap'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging'
import AppNavigator from './src/navigation/AppNavigator'
import { AppState } from './src/context/AppState'
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

initTranslate()
setInterceptors()
export default function App() {
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
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage)
            )
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
            <AppState>
                <AppNavigator />
            </AppState>
        </Provider>
    )
}
