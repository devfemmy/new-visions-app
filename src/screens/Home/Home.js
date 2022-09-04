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

const Home = () => {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)

    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.homePage)
    const packagesArray = data?.homeData?.multi_packages
    const stagesArray = data?.homeData?.stages
    const teachersArray = data?.homeData?.teachers

    const [packages, setPackages] = useState([])
    function getPackages(params) {
        axios
            .post('https://newvisions.sa/api/getPackages', {})
            .then((response) => {
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data.data
                        console.log('multi Packages: ' + data)
                        setPackages(data)
                        showLoadingSpinner(false)
                        console.log(packages)
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
        dispatch(getHomePage())
        getPackages()
        // Send Notification Token

        async function postNotificationToken() {
            const fcmtoken = await AsyncStorage.getItem('fcmtoken')
            const payload = {
                token: fcmtoken,
            }
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
                    pressed={() => navigation.navigate('MultiPackagesStage')}
                    text={i18n.t('MultiPackages')}
                />
                <View style={styles.containerFlex}>
                    <FlatList
                        horizontal
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.flatlistContent}
                        ListEmptyComponent={() => <Text text="No Data" />}
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
                                            item
                                        )
                                    }
                                >
                                    <FastImage
                                        style={{
                                            width: heightp(20),
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

                <HeaderTitle
                    pressed={() => navigation.navigate('PackagesStage')}
                    text={i18n.t('Packages')}
                />
                <View style={styles.containerFlex}>
                    <FlatList
                        horizontal
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.flatlistContent}
                        ListEmptyComponent={() => <Text text="No Data" />}
                        data={packages}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => {
                            const uri = `${IMAGEURL}/${item.image}`
                            return (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate(
                                            'MultiPackageDetails',
                                            item
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
                            pressed={() => navigation.navigate('Subjects')}
                            text={i18n.t('EducationalLevel')}
                        />
                        <View style={styles.containerFlex}>
                            <FlatList
                                horizontal
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.flatlistContent}
                                ListEmptyComponent={() => (
                                    <Text text="No Data" />
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
                        ListEmptyComponent={() => <Text text="No Data" />}
                        data={teachersArray}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => {
                            const uri = `${IMAGEURL}/${item.image}`
                            return (
                                <TeachersCard
                                    pressed={() => navigateTeacherProfile(item)}
                                    uri={uri}
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
        flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(20),
    },
})

export default Home
