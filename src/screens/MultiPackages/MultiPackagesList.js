import {
    View,
    ImageBackground,
    FlatList,
    Text as RNText,
    StyleSheet,
} from 'react-native'
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
import { heightp } from '../../utils/responsiveDesign'

export default function MultiPackagesList({ route, navigation }) {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)

    const [multiPackages, setMultiPackages] = useState([])
    function getMultiPackages(params) {
        axios
            .post(
                'https://newvisions.sa/api/getMultiPackages',
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
                        console.log(multiPackages)
                    } else if (response.data.code == 403) {
                        console.log('account is logged in another device')
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
        navigation.navigate('MultiPackageDetails', {
            item,
            packageType: 'multi',
        })
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
                <>
                    <RNText
                        style={[
                            styles.subItemText2,
                            {
                                // color: colors.primary,
                                textAlign: 'center',
                                paddingTop: heightp(10),
                                paddingBottom: heightp(20),
                            },
                        ]}
                    >
                        {I18n.t('PackagesNew')}
                    </RNText>
                    <FlatList
                        data={multiPackages}
                        extraData={multiPackages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </>
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

const styles = StyleSheet.create({
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})
