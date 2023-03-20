import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TouchableWithoutFeedback,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SonListItem from './SonListItem'
import Screen from '../../components/Screen'
import colors from '../../helpers/colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import I18n from 'i18n-js'
import { AppContext } from '../../context/AppState'
import { FlatList } from 'react-native-gesture-handler'
import axios from 'axios'
import SonSubItem from './SonSubItem'
import { useLayoutEffect } from 'react'
import { heightp } from '../../utils/responsiveDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import IconText from '../../components/IconText'
import { Text as CustomText } from '../../components/common'
import { useRoute } from '@react-navigation/native'
import Global from '../../../Global'

export default function Subscriptions({}) {
    const route = useRoute()
    const [subscriptions, setSubscriptions] = useState([])
    const [toggle1, setToggle1] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [toggle3, setToggle3] = useState(false)
    const [toggle4, setToggle4] = useState(false)
    const [toggle5, setToggle5] = useState(false)
    const [toggle6, setToggle6] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleItem, setIsVisibleItem] = useState({})
    const { id } = route.params
    console.log('params', id)
    const { onLogout, lang, showLoadingSpinner, initUUID, onLogin, user } =
        useContext(AppContext)

    function getSonSubscriptions() {
        axios
            .post(
                'https://mo.visionsplus.net/api/getUserSubscription',
                {
                    // getChildPayments (this can be returned whenever the child API wants to be used)
                    // child_id: route.params.id,
                },
                {
                    // config
                    headers: {
                        'Content-Type': 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${user?.remember_token}`,
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
                    console.log('==================> typeof', response?.data)
                    if (response.data.code == 200) {
                        const data = response.data.data
                        setSubscriptions(data)
                        showLoadingSpinner(false)
                    } else if (response.data.code == 403) {
                        console.log('account is logged in another device')
                        // onLogout()
                        showLoadingSpinner(false)
                    } else {
                        showLoadingSpinner(false)
                        // alert(response.data.message)
                    }
                } else {
                    setSubscriptions([])
                }
            })
            .catch((error) => {
                showLoadingSpinner(false)
                // alert(error)
            })
    }

    function previewBill(item) {
        console.log('bill_number', item)
        setIsVisible(!isVisible)
        setIsVisibleItem(item)
    }

    const renderItem = ({ item, index }) => (
        <SonSubItem
            name={item.title}
            index={index}
            subDate={item.created_at}
            subPrice={item.full_price}
            billClick={() => {
                previewBill(item)
            }}
        />
    )

    const EmptyItem = ({ item, index }) => (
        <View
            style={{
                backgroundColor: colors.dark,
                height: 40,
                width: '85%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={styles.subItemText}>{I18n.t('noSubField')}</Text>
        </View>
    )

    useEffect(() => {
        getSonSubscriptions()
        //onLogout();
    }, [])

    useLayoutEffect(() => {
        showLoadingSpinner(true)
    }, [])
    return (
        <>
            <Screen>
                <View style={{ backgroundColor: colors.white, flex: 1 }}>
                    <SonListItem name={route.params.name} />
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: '90%',
                            alignSelf: 'center',
                            marginBottom: 20,
                        }}
                    />
                    <Text
                        style={[
                            styles.subItemText2,
                            {
                                // color: colors.primary,
                                textAlign: 'center',
                                paddingTop: heightp(5),
                                paddingBottom: heightp(5),
                            },
                        ]}
                    >
                        {I18n.t('ViewSubscriptions')}
                    </Text>
                    <ScrollView style={{ marginBottom: 20 }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setToggle1(!toggle1)
                            }}
                        >
                            <View style={styles.subItem}>
                                <Text style={styles.subItemText}>
                                    {I18n.t('Fullsubjectsubscribes')}
                                </Text>
                                <FontAwesome
                                    name={
                                        toggle1
                                            ? 'arrow-circle-down'
                                            : 'arrow-circle-left'
                                    }
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {subscriptions?.payments && toggle1 && (
                            <View>
                                <FlatList
                                    data={subscriptions?.payments}
                                    extraData={subscriptions?.payments}
                                    renderItem={renderItem}
                                    ListEmptyComponent={EmptyItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setToggle2(!toggle2)
                            }}
                        >
                            <View style={styles.subItem}>
                                <Text style={styles.subItemText}>
                                    {I18n.t('Onelessonsubscribes')}
                                </Text>
                                <FontAwesome
                                    name={
                                        toggle2
                                            ? 'arrow-circle-down'
                                            : 'arrow-circle-left'
                                    }
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {subscriptions?.lessonsPayments && toggle2 && (
                            <View>
                                <FlatList
                                    data={subscriptions?.lessonsPayments}
                                    extraData={subscriptions?.lessonsPayments}
                                    renderItem={renderItem}
                                    ListEmptyComponent={EmptyItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setToggle3(!toggle3)
                            }}
                        >
                            <View style={styles.subItem}>
                                <Text style={styles.subItemText}>
                                    {I18n.t('Multipackagesubscribes')}
                                </Text>
                                <FontAwesome
                                    name={
                                        toggle3
                                            ? 'arrow-circle-down'
                                            : 'arrow-circle-left'
                                    }
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {subscriptions?.multiPackagePayments && toggle3 && (
                            <View>
                                <FlatList
                                    data={subscriptions?.multiPackagePayments}
                                    extraData={
                                        subscriptions?.multiPackagePayments
                                    }
                                    renderItem={renderItem}
                                    ListEmptyComponent={EmptyItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setToggle4(!toggle4)
                            }}
                        >
                            <View style={styles.subItem}>
                                <Text style={styles.subItemText}>
                                    {I18n.t('Packagesubscribes')}
                                </Text>
                                <FontAwesome
                                    name={
                                        toggle4
                                            ? 'arrow-circle-down'
                                            : 'arrow-circle-left'
                                    }
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {subscriptions?.packagesPayments && toggle4 && (
                            <View>
                                <FlatList
                                    data={subscriptions?.packagesPayments}
                                    extraData={subscriptions?.packagesPayments}
                                    renderItem={renderItem}
                                    ListEmptyComponent={EmptyItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setToggle5(!toggle5)
                            }}
                        >
                            <View style={styles.subItem}>
                                <Text style={styles.subItemText}>
                                    {I18n.t('Privatesubjectsubscribes')}
                                </Text>
                                <FontAwesome
                                    name={
                                        toggle5
                                            ? 'arrow-circle-down'
                                            : 'arrow-circle-left'
                                    }
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {subscriptions?.PrivateSubjectPayments && toggle5 && (
                            <View>
                                <FlatList
                                    data={subscriptions?.PrivateSubjectPayments}
                                    extraData={
                                        subscriptions?.PrivateSubjectPayments
                                    }
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    ListEmptyComponent={EmptyItem}
                                />
                            </View>
                        )}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setToggle6(!toggle6)
                            }}
                        >
                            <View style={styles.subItem}>
                                <Text style={styles.subItemText}>
                                    {I18n.t('FazaSubscriptions')}
                                </Text>
                                <FontAwesome
                                    name={
                                        toggle6
                                            ? 'arrow-circle-down'
                                            : 'arrow-circle-left'
                                    }
                                    color={colors.white}
                                    size={30}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {subscriptions?.ReviewCoursesPayments && toggle6 && (
                            <View>
                                <FlatList
                                    data={subscriptions?.ReviewCoursesPayments}
                                    extraData={
                                        subscriptions?.ReviewCoursesPayments
                                    }
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    ListEmptyComponent={EmptyItem}
                                />
                            </View>
                        )}
                    </ScrollView>
                </View>
            </Screen>
            <Modal
                onBackdropPress={() => {
                    setIsVisible(!isVisible)
                }}
                isVisible={isVisible}
            >
                <View style={styles.modal}>
                    <View style={styles.timeContainer}>
                        <IconText
                            modal
                            text={` ${I18n.t('Title')} ${isVisibleItem?.title}`}
                            children={
                                <Ionicons
                                    name="ios-book-outline"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                        <IconText
                            modal
                            text={`${I18n.t('BillNumber')} ${
                                isVisibleItem?.bill_number
                            }`}
                            children={
                                <Ionicons
                                    name="bookmarks-outline"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                        <IconText
                            modal
                            text={`${I18n.t('Price')} - ${
                                isVisibleItem?.price
                            }`}
                            children={
                                <Ionicons
                                    name="pricetag"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                        <IconText
                            modal
                            text={`${I18n.t('Discount')} - ${
                                isVisibleItem?.discount
                            }`}
                            children={
                                <Ionicons
                                    name="arrow-undo-circle"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                        <IconText
                            modal
                            text={`${I18n.t('VAT')} - ${isVisibleItem?.vat}`}
                            children={
                                <Ionicons
                                    name="file-tray"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                        <IconText
                            modal
                            text={`${I18n.t('FullPrice')} - ${
                                isVisibleItem?.full_price
                            }`}
                            children={
                                <Ionicons
                                    name="pricetags"
                                    size={24}
                                    color={colors.white}
                                />
                            }
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    subItem: {
        backgroundColor: colors.primary,
        height: 60,
        width: '90%',
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    subItemText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Cairo',
    },
    modal: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 20,
    },
    timeContainer: {
        marginVertical: heightp(10),
    },
    textColor: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})
