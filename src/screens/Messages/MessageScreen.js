import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState, useContext } from 'react'
import {
    Dimensions,
    FlatList,
    LogBox,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native'
import Pusher from 'pusher-js/react-native'
import FastImage from 'react-native-fast-image'
import Hyperlink from 'react-native-hyperlink'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Container, Text } from '../../components/common'
import colors from '../../helpers/colors'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/common'
import { heightp } from '../../utils/responsiveDesign'
import pusherConfig from '../../../pusher.json'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'

const MessageScreen = () => {
    const route = useRoute()
    const { onLogout, user } = useContext(AppContext)
    const { uri, items, title } = route.params
    const [messages, setMessages] = useState('')
    const [chats, setChats] = useState([])
    const [msg, setMsg] = useState()
    const messgArr = items.messages
    {
        console.log('messgArrrrrrr', items)
    }
    const sender = 'hello'
    LogBox.ignoreAllLogs()

    useEffect(() => {
        // onGetMessageById()
        console.log(':hooo')

        const pusher = new Pusher(pusherConfig.key, pusherConfig) // (1)

        const chatChannel = pusher.subscribe('my-channel') // (2)

        chatChannel.bind('pusher:subscription_succeeded', (members) => {
            console.log(
                'subscription_succeeded->>>>>>>>>>>>>>>>>>>>',
                title,
                members
            )
            chatChannel.bind('join', (data) => {
                console.log('join herexxxx', data)
                setMsg(data)
                // handleMessage(data)
            })
            chatChannel.bind('message', (data) => {
                console.log('message herexxxx', data)
                setChats([...chats, data])
                // handleMessage(data)
            })
            chatChannel.bind('chat-update', (data) => {
                console.log('message herexxxx', data)
                setChats([...chats, data])
                // handleMessage(data)
            })
        })
        return () => {
            pusher.unsubscribe('my-channel')
        }
    })

    useEffect(() => {
        onGetMessageById()
    }, [])

    const onSendMessage = async () => {
        // (9)
        console.log('messages', messages)
        const payload = {
            message: messages,
            conversation_id: items?.conversation_id,
        }
        try {
            const res = await HomePageService.sendMessage(payload)
            if (res.code === 403) {
                onLogout()
            } else {
                const data = res
                console.log('messages here', data)
                return res
            }
        } catch (err) {
            console.log(err, 'error')
        }
    }
    const onGetMessageById = async () => {
        // (9)
        console.log('messages', items?.conversation_id)
        const payload = {
            conversation_id: items?.conversation_id,
        }
        try {
            const res = await HomePageService.getMessageById(payload)
            if (res.code === 403) {
                onLogout()
            } else {
                const data = res?.data[0]
                console.log('onGetMessageById messages here', data?.messages)
                setChats(data?.messages)
                return res
            }
        } catch (err) {
            console.log(err, 'error')
        }
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                }}
                {...(Platform.OS === 'ios'
                    ? {
                          behavior: 'position',
                          keyboardVerticalOffset: [40], // calculate height using onLayout callback method
                      }
                    : {})}
            >
                <FlatList
                    inverted
                    style={{ flexGrow: 1, height: WINDOW_HEIGHT * 0.75 }}
                    contentContainerStyle={{
                        paddingHorizontal: heightp(10),
                        backgroundColor: colors.white,
                    }}
                    data={chats}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                marginVertical: 10,
                                maxWidth:
                                    Dimensions.get('window').width / 1.2 + 10,
                                alignSelf:
                                    user?.id === item?.user_id
                                        ? 'flex-end'
                                        : 'flex-start',
                            }}
                        >
                            {user?.id === item?.user_id ? (
                                <View
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                    }}
                                >
                                    <Hyperlink
                                        linkStyle={{
                                            textDecorationLine: 'underline',
                                        }}
                                        linkDefault
                                    >
                                        <Text
                                            text={item?.text}
                                            style={{
                                                padding: 10,
                                                fontSize: 16,
                                                color: 'white',
                                            }}
                                        />
                                    </Hyperlink>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <>{console.log('hereeeee', item)}</>
                                    <FastImage
                                        style={{
                                            width: heightp(25),
                                            height: heightp(25),
                                            borderRadius: 25,
                                            marginRight: heightp(5),
                                        }}
                                        source={{
                                            uri,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    <View
                                        style={{
                                            borderRadius: 10,
                                            backgroundColor: colors.primary,
                                        }}
                                    >
                                        <Hyperlink
                                            linkStyle={{
                                                textDecorationLine: 'underline',
                                            }}
                                            linkDefault
                                        >
                                            <Text
                                                text={item?.text}
                                                style={{
                                                    padding: 10,
                                                    fontSize: 16,
                                                    color: 'white',
                                                }}
                                            />
                                        </Hyperlink>
                                    </View>
                                </View>
                            )}

                            <Text
                                text={item?.time.slice(10, 19)}
                                style={{
                                    // color: 'rgba(0, 0, 0, 0.8)',
                                    fontSize: heightp(12),
                                    opacity: 0.5,
                                    textAlign: 'left',
                                }}
                            />
                        </View>
                    )}
                />
                <View
                    style={{
                        height: 50,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingHorizontal: heightp(10),
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                    }}
                >
                    <View
                        style={{
                            width: '90%',
                            height: '100%',
                            justifyContent: 'center',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <TextInput
                            value={messages}
                            onChangeText={(text) => setMessages(text)}
                            placeholder="Write your message here"
                            placeholderTextColor={colors.solidGray}
                            style={{
                                height: 40,
                                borderRadius: 20,
                                paddingHorizontal: 20,
                                borderColor: 'gray',
                                color: colors.black,
                                borderWidth: 0.5,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            height: '100%',
                            width: '10%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginLeft: 5,
                        }}
                        onPress={() => {
                            onSendMessage()
                            setMessages('')
                        }}
                    >
                        <Icons name="send" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MessageScreen
