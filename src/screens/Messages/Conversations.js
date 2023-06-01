import { useNavigation } from '@react-navigation/native'
import I18n from 'i18n-js'
import i18n from 'i18n-js'
import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    TouchableOpacity,
    View,
    Text as RNText,
    StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import SearchBar from 'react-native-platform-searchbar'
import { Container, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import SelectTab from '../../components/SelectTab'
import { AppContext } from '../../context/AppState'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import HomePageService from '../../services/userServices'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import NewLoader from '../../components/NewLoader'

const Conversation = () => {
    const navigation = useNavigation()
    const { onLogout } = useContext(AppContext)
    const [searchText, setSearchText] = useState()
    const [eventActive, setEventActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [messages, setConversationMsgs] = useState([])

    useEffect(() => {
        // get Notification
        async function getConversations() {
            setLoading(true)
            try {
                const res = await HomePageService.getConversations()
                if (res.code === 403) {
                    setLoading(false)
                    console.log('account is logged in another device')
                    onLogout()
                } else {
                    const data = res?.data
                    console.log('messages', data)
                    setLoading(false)
                    setConversationMsgs(data)
                    return res
                }
            } catch (err) {
                console.log(err, 'error')
                setLoading(false)
            }
        }
        const unsubscribe = navigation.addListener('focus', () => {
            getConversations()
        })
        return unsubscribe
    }, [navigation, searchText])
    const searchFilteredData = searchText
        ? messages?.filter((x) =>
              x?.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : messages
        if (loading){
            return(
                <NewLoader />
            )
        }
    return (
        <Container>
            {/* <Loader visible={loading} /> */}
            {/* <SelectTab
                eventActive={eventActive}
                pressed={() => setEventActive(!eventActive)}
                header1={i18n.t('People')}
                header2={i18n.t('Group')}
            /> */}
            <SearchBar
                placeholder={i18n.t('Search')}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                style={globalStyles.searchBar}
                inputStyle={{ color: colors.dark }}
                iconColor={colors.dark}
            />
            <RNText
                style={[
                    styles.subItemText2,
                    {
                        // color: colors.primary,
                        textAlign: 'center',
                        paddingTop: heightp(10),
                        paddingBottom: heightp(10),
                    },
                ]}
            >
                {I18n.t('ViewSubscriptions')}
            </RNText>
            <View>
                <FlatList
                    always={false}
                    data={searchFilteredData}
                    style={{ padding: 5 }}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={null}
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
                    renderItem={({ item }) => {
                        // console.log('renderItem', item)
                        const uri = `${IMAGEURL}/${item?.image}`
                        return (
                            <View>
                                {item?.name === '' ? null : (
                                    <>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'ChatScreen',
                                                    {
                                                        title: item?.name,
                                                        uri,
                                                        items: item,
                                                    }
                                                )
                                            }
                                            style={{
                                                flexDirection: 'row',
                                                marginBottom: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: '15%',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <FastImage
                                                    style={{
                                                        width: heightp(50),
                                                        height: heightp(50),
                                                        borderRadius: 25,
                                                    }}
                                                    source={{
                                                        uri: item?.image,
                                                        priority:
                                                            FastImage.priority
                                                                .normal,
                                                    }}
                                                    resizeMode={
                                                        FastImage.resizeMode
                                                            .cover
                                                    }
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    width: '65%',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center',
                                                    marginLeft: 10,
                                                }}
                                            >
                                                <Text
                                                    text={item?.name}
                                                    style={{
                                                        // color: 'rgba(0, 0, 0, 0.8)',
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                                <Text
                                                    text={
                                                        item?.messages &&
                                                        item.messages[
                                                            item.messages
                                                                .length - 1
                                                        ]?.text
                                                    }
                                                    style={{
                                                        // color: 'rgba(0, 0, 0, 0.8)',
                                                        fontSize: heightp(14),
                                                        opacity: 0.5,
                                                    }}
                                                    numberOfLines={1}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    width: '20%',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center',
                                                    marginRight: 20,
                                                }}
                                            >
                                                <Text
                                                    text={
                                                        item?.messages &&
                                                        item.messages[
                                                            item.messages
                                                                .length - 1
                                                        ]?.time.slice(10, 19)
                                                    }
                                                    style={{
                                                        // color: 'rgba(0, 0, 0, 0.8)',
                                                        fontSize: heightp(14),
                                                        opacity: 0.5,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                borderWidth: 0.5,
                                                borderColor:
                                                    'rgba(0, 0, 0, 0.2)',
                                            }}
                                        />
                                    </>
                                )}
                            </View>
                        )
                    }}
                />
            </View>
        </Container>
    )
}

export default Conversation

const styles = StyleSheet.create({
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})
