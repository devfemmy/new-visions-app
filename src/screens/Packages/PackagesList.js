import { View, ImageBackground, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'

import { AppContext } from '../../context/AppState'
import { useContext } from 'react'
import axios from 'axios'
import PackagesListItem from './PackagesListItem'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { Share } from 'react-native'
import Toast from 'react-native-toast-message'
import Screen from '../../components/Screen'
import { heightp } from '../../utils/responsiveDesign'
import { Text } from '../../components/common'

export default function PackagesList({ route, navigation }) {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)

    const [multiPackages, setMultiPackages] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    async function getPackages(params) {
        return await axios
            .post(
                'https://mo.visionsplus.net/api/getPackages',
                {
                    stage_id: route.params.stage_id,
                },
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        // Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                        lang: lang,
                        version: 4,
                    },
                }
            )
            .then((response) => {
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data.data
                        // console.log('multi Packages: ' + data)
                        setMultiPackages(data)
                        showLoadingSpinner(false)
                        return response
                    } else if (response.data.code == 403) {
                        console.log('account is logged in another device')
                        onLogout()
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        alert(response.data.message)
                    }
                }
                return response
            })
            .catch((error) => {
                showLoadingSpinner(false)
                alert(error)
            })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
            getPackages()
        })
        return unsubscribe
    }, [route.params.stage_id])

    useLayoutEffect(() => {
        showLoadingSpinner(true)
    }, [])

    function openDetails(item) {
        navigation.navigate('MultiPackageDetails', {
            item,
            packageType: 'single',
        })
    }

    const shareDetails = async (item) => {
        try {
            const result = await Share.share({
                url: 'https://mo.visionsplus.net/multi_package/' + item.id,
            })
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    Toast.show({
                        text1: 'Shared',
                        type: 'success',
                        style: { color: colors.dark },
                    })
                } else {
                    // shared
                    Toast.show({
                        text1: 'Shared',
                        type: 'success',
                        style: { color: colors.dark },
                    })
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    }

    const renderItem = ({ item }) => (
        <PackagesListItem
            uri={item?.image}
            title={item?.title}
            number_of_students={item?.number_of_students}
            price={item?.price}
            detailsClicked={() => {
                openDetails(item)
            }}
            shareClicked={() => {
                shareDetails(item)
            }}
        />
    )

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getPackages()
        console.log('response', res.data)
        if (res?.data?.code === 200) {
            setRefreshing(false)
        }
    }, [])

    return (
        <Screen>
            {multiPackages.length > 0 ||
            multiPackages === null ||
            multiPackages === undefined ? (
                <FlatList
                    data={multiPackages}
                    extraData={multiPackages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    // ListEmptyComponent={() => <Text text={I18n.t('NoData')} />}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text text={I18n.t('NoData')} />
                </View>
            )}
        </Screen>
    )
}
