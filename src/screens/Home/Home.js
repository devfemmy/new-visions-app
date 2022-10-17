import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Text } from '../../components/common'
import { globalStyles } from '../../helpers/globalStyles'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getHomePage } from '../../redux/action'
import { heightp } from '../../utils/responsiveDesign'
import HeaderTitle from '../../components/common/HeaderTitle'
import StageCard from '../../components/StageCard'
import TeachersCard from '../../components/TeachersCard'
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions'
import HomePageService from '../../services/userServices'
import Global from '../../../Global'
import { AppContext } from '../../context/AppState'
import axios from 'axios'
import colors from '../../helpers/colors'
const defaultUri =
    'https://firebasestorage.googleapis.com/v0/b/newvisions-9f9ef.appspot.com/o/HOME_BG_NEW.jpg?alt=media&token=0c48db74-5d80-4fb3-a43b-fea209a57225'

const Home = () => {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)

    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.homePage)
    const packagesArray = data?.homeData?.multi_packages
    const stagesArray = data?.homeData?.stages
    const teachersArray = data?.homeData?.teachers

    // console.log('packages on home page', data)

    const [packages, setPackages] = useState([])
    function getPackages(params) {
        axios
            .post('https://newvisions.sa/api/getPackages', {})
            .then((response) => {
                console.log('success message xxxxx', response)
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response?.data?.code == 200) {
                        const data = response?.data?.data?.data
                        // console.log('multi Packages: ' + data)
                        setPackages(data)
                        showLoadingSpinner(false)
                        console.log(packages)
                    } else if (response?.data?.code == 403) {
                        alert('This Account is Logged in from another Device.')
                        onLogout()
                        showLoadingSpinner(false)
                    } else if (response?.data?.code == 407) {
                        onLogout()
                        console.log('response 3')
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        console.log('response 1')
                        // alert(response.data.message)
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                console.log('response 2', error)
                // alert(error)
            })
    }

    useEffect(() => {
        dispatch(getHomePage())
        getPackages()
        // Send Notification Token

        async function postNotificationToken() {
            const fcmtoken = await AsyncStorage.getItem('fcmtoken')
            const payload = {
                token: fcmtoken,
            }
            console.log('e plemnty ooooo', payload)
            try {
                const res = await HomePageService.postNotificationData(payload)
                return res
            } catch (err) {
                console.log(err, 'error')
            }
        }
        postNotificationToken()
    }, [dispatch])
    const navigateTeacherProfile = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderTitle
                    pressed={() => navigation.navigate('PackagesStage')}
                    text={i18n.t('Packages')}
                />
                <View style={styles.containerFlex}>
                    <Pressable
                        onPress={() => navigation.navigate('PackagesStage')}
                    >
                        <FastImage
                            style={{
                                width: '100%',
                                height: heightp(180),
                                borderRadius: 10,
                            }}
                            source={{
                                uri: defaultUri,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </Pressable>
                </View>
                <View style={globalStyles.horizontal} />

                <HeaderTitle
                    pressed={() => navigation.navigate('MultiPackagesStage')}
                    text={i18n.t('MultiPackages')}
                />
                <View style={styles.containerFlex}>
                    <FlatList
                        horizontal
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.flatlistContent}
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text text={i18n.t('NoData')} />
                            </View>
                        )}
                        data={packagesArray}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => {
                            const uri = `${IMAGEURL}/${item.image}`
                            // navigation.navigate("MultiPackageDetails", item);
                            return (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate(
                                            'MultiPackageDetails',
                                            { item, packageType: 'multi' }
                                        )
                                    }
                                >
                                    <FastImage
                                        style={{
                                            width: heightp(210),
                                            height: heightp(130),
                                            borderRadius: 10,
                                            marginRight: heightp(20),
                                        }}
                                        source={{
                                            uri,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </Pressable>
                            )
                        }}
                    />
                </View>
                <View style={globalStyles.horizontal} />

                {Global.UserType == 3 && (
                    <>
                        <HeaderTitle
                            deleteIcon
                            pressed={() => navigation.navigate('Subjects')}
                            text={i18n.t('EducationalLevel')}
                        />
                        <View style={styles.containerFlex}>
                            <FlatList
                                horizontal
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.flatlistContent}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text text={i18n.t('NoData')} />
                                    </View>
                                )}
                                data={stagesArray}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item }) => {
                                    const uri = `${IMAGEURL2}${item.image}`
                                    return (
                                        <StageCard
                                            eduPress={() =>
                                                navigation.navigate(
                                                    'EducationalStage',
                                                    { stage_id: item?.id }
                                                )
                                            }
                                            newPress={() => {}}
                                            uri={uri}
                                            text={item.name}
                                        />
                                    )
                                }}
                            />
                        </View>
                        <View style={globalStyles.horizontal} />
                    </>
                )}
                <HeaderTitle
                    pressed={() => navigation.navigate('Teachers')}
                    text={i18n.t('Teachers')}
                />
                <View style={styles.containerFlex}>
                    <FlatList
                        horizontal
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.flatlistContent}
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text text={i18n.t('NoData')} />
                            </View>
                        )}
                        data={teachersArray}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => {
                            const uri = `${IMAGEURL}/${item.image}`
                            return (
                                <TeachersCard
                                    pressed={() => navigateTeacherProfile(item)}
                                    uri={uri}
                                    ratings={
                                        item?.rate === 0 ? null : item?.rate
                                    }
                                    lastName={item.last_name}
                                    text={item.first_name}
                                    image={item.image}
                                />
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
    flatlistContent: {
        // flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(20),
    },
})

export default Home
