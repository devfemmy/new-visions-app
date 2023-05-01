import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import { AppContext } from '../../context/AppState'
import axios from 'axios'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import ListItem from '../../components/lists/ListItem'
import { API_URL_Prod } from '../../helpers/common'
import SonListItem from './SonListItem'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

export default function Sons({ navigation }) {
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin } =
        useContext(AppContext)
    const [sons, setSons] = useState([])
    const [searchMail, setsearch] = useState('')
    const [loadingContent, setLoadingContent] = useState(true)

    const handleAddSon = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        if (reg.test(searchMail) === false) {
            Toast.show({
                text1:
                    I18n.locale === 'ar'
                        ? 'البريد الالكتروني غير صحيح'
                        : 'Wrong Mail Format',
                type: 'error',
                style: { color: colors.dark },
            })

            return
        }
        //alert(searchMail);
        showLoadingSpinner(true)
        axios
            .post(
                'https://newvisions.sa/api/addNewChild',
                {
                    email: searchMail,
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
                        const data = response.data.data
                        getChildren()
                        showLoadingSpinner(false)
                        setLoadingContent(true)
                        console.log(sons)
                    } else if (response.data.code == 403) {
                        //alert(11);
                        console.log('account is logged in another device')
                        // onLogout()
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        Toast.show({
                            text1: response.data.message,
                            type: 'error',
                            style: { color: colors.dark },
                        })
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                alert(error)
            })
    }
    const handleChange = (value) => {
        setsearch(value)
        //alert(value);
    }

    const getChildren = (value) => {
        //showLoadingSpinner(true);
        axios
            .post('https://newvisions.sa/api/getUserChildren', {})
            .then((response) => {
                //alert(response.data.code);
                if (
                    response != undefined &&
                    response.data != undefined &&
                    response.data.code != undefined
                ) {
                    if (response.data.code == 200) {
                        const data = response.data.data
                        setSons(data)
                        setLoadingContent(false)
                        console.log(sons)
                    } else if (response.data.code == 403) {
                        console.log('account is logged in another device')
                        // onLogout()
                    } else {
                        showLoadingSpinner(false)
                        Toast.show({
                            text1: response.data.message,
                            type: 'error',
                            style: { color: colors.dark },
                        })
                    }
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                alert(error)
            })
    }

    useEffect(() => {
        getChildren()
        //onLogout();
    }, [])

    function SubscriptionsClicked(item) {
        navigation.navigate('Subscriptions', { id: item })
    }

    function AttendanceClicked(item) {
        navigation.navigate('Attendance', { id: item, userStatus: 'Parent' })
    }

    const renderItem = ({ item }) => (
        <SonListItem
            name={item.name}
            status={item.status}
            subClick={() => {
                SubscriptionsClicked(item.user_id)
                console.log('Subscriptions', item)
            }}
            attendanceClick={() => {
                AttendanceClicked(item.user_id)
            }}
        />
    )
    return (
        <View style={{ backgroundColor: colors.white, flex: 0.4 }}>
            <View>
                <Text style={styles.title}>أضف ابن جديد</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                }}
            >
                <View style={styles.searchBar}>
                    <MaterialIcons name="search" size={20} />
                    <TextInput
                        onChangeText={(val) => handleChange(val)}
                        style={[
                            styles.searchBarTxt,
                            {
                                width: '90%',
                                color: colors.black,
                            },
                        ]}
                    />
                </View>
                <TouchableOpacity
                    style={{ width: '25%' }}
                    onPress={() => {
                        handleAddSon()
                    }}
                >
                    <View style={styles.addBtn}>
                        <Text style={styles.searchBarTxt}>{I18n.t('Add')}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {loadingContent ? (
                <ContentLoader
                    viewBox="0 0 380 70"
                    backgroundColor={colors.darkGray}
                    foregroundColor={colors.gray}
                    height={100}
                    speed={1}
                >
                    {I18n.locale === 'ar' ? (
                        <>
                            <Rect
                                x="300"
                                y="0"
                                rx="4"
                                ry="4"
                                width="70"
                                height="70"
                            />
                            <Rect
                                x="80"
                                y="17"
                                rx="4"
                                ry="4"
                                width="200"
                                height="13"
                            />
                            <Rect
                                x="80"
                                y="40"
                                rx="3"
                                ry="3"
                                width="200"
                                height="10"
                            />
                        </>
                    ) : (
                        <>
                            <Rect
                                x="0"
                                y="0"
                                rx="4"
                                ry="4"
                                width="70"
                                height="70"
                            />
                            <Rect
                                x="80"
                                y="17"
                                rx="4"
                                ry="4"
                                width="200"
                                height="13"
                            />
                            <Rect
                                x="80"
                                y="40"
                                rx="3"
                                ry="3"
                                width="150"
                                height="10"
                            />
                        </>
                    )}
                </ContentLoader>
            ) : (
                <FlatList
                    data={sons}
                    extraData={sons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: colors.darkGray,
        width: '60%',
        borderRadius: 15,
        margin: 10,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 0.5,
        paddingHorizontal: 10,
    },
    searchBarTxt: {
        fontFamily: 'Cairo',
        fontWeight: '700',
        color: colors.white,
    },
    title: {
        fontSize: 21,
        color: colors.black,
        fontWeight: '700',
        fontFamily: 'Cairo',
        marginHorizontal: 20,
        marginTop: 10,
    },
    addBtn: {
        backgroundColor: colors.primary,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
})
