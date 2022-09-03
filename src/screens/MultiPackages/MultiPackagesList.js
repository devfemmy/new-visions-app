import { View, ImageBackground, FlatList } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'

import { AppContext } from '../../context/AppState'
import { useContext } from 'react'
import axios from 'axios'
import MultiPackagesListItem from './MultiPackagesListItem'
import { useLayoutEffect } from 'react'
import { Share } from 'react-native'
import Toast from 'react-native-toast-message'
import Screen from '../../components/Screen'
import { Text } from '../../components/common'

export default function MultiPackagesList({ route, navigation }) {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)

    const [multiPackages, setMultiPackages] = useState([])
    function getMultiPackages(params) {
        axios
            .post('https://newvisions.sa/api/getMultiPackages', {
                stage_id: route.params.stage_id,
            })
            .then((response) => {
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data.data
                        console.log('multi Packages: ' + data)
                        setMultiPackages(data)
                        showLoadingSpinner(false)
                        console.log(multiPackages)
                    } else if (response.data.code == 403) {
                        onLogout()
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        alert(response.data.message)
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                alert(error)
            })
    }

    useEffect(() => {
        getMultiPackages()
    }, [])

    useLayoutEffect(() => {
        showLoadingSpinner(true)
    }, [])

    function openDetails(item) {
        navigation.navigate('MultiPackageDetails', item)
    }

    const shareDetails = async (item) => {
        try {
            const result = await Share.share({
                url: 'https://newvisions.sa/multi_package/' + item.id,
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
        <MultiPackagesListItem
            title={item.title}
            number_of_students={item.number_of_students}
            price={item.price}
            uri={item.image}
            detailsClicked={() => {
                openDetails(item)
            }}
            shareClicked={() => {
                shareDetails(item)
            }}
        />
    )
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
                    <Text text="No Data" />
                </View>
            )}
        </Screen>
    )
}
