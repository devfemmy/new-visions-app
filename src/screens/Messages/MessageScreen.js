import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState, useContext, Component } from 'react'
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
import Global from '../../../Global'
import axios from 'axios'

// class MessageScreen extends Component {
//     static contextType = AppContext
//     constructor(props) {
//         super(props)
//         this.state = {
//             messages: '',
//             chats: [],
//             msg: '',
//             fullName: '',
//         }
//         this.pusher = new Pusher(pusherConfig.key, pusherConfig)
//         this.chatChannel = this.pusher.subscribe('my-channel')
//         this.chatChannel.bind('pusher:subscription_succeeded', () => {
//             this.chatChannel.bind('join', (data) => {
//                 this.handleJoin(data.name)
//             })
//             this.chatChannel.bind('part', (data) => {
//                 this.handlePart(data.name)
//             })
//             this.chatChannel.bind('new-message-event', (data) => {
//                 console.log(
//                     'subscription_succeeded->>>>>>>>>>>>>>>>>>>>',
//                     this.props.route.params.title,
//                     data
//                 )
//                 this.handleMessage(data)
//             })
//         })
//         this.handleSendMessage = this.onSendMessage.bind(this)
//     }

//     async componentDidMount() {
//         console.disableYellowBox = true
//         Pusher.logToConsole = true
//         LogBox.ignoreAllLogs()
//         const { onLogout, user } = this.context

//         onGetMessageById = async () => {
//             console.log(
//                 'messages opooooor 1',
//                 this.props.route.params.uri,
//                 this.props.route.params.items?.conversation_id
//             )
//             const payload = {
//                 conversation_id: this.props.route.params.items?.conversation_id,
//             }
//             try {
//                 const res = await HomePageService.getMessageById(payload)
//                 if (res.code === 403) {
//                     alert('This Account is Logged in from another Device.')
//                     onLogout()
//                 } else {
//                     const data = res?.data[0]
//                     console.log(
//                         'onGetMessageById messages here',
//                         data?.messages
//                     )
//                     this.setState({
//                         chats: data?.messages,
//                     })
//                     // setChats(data?.messages)
//                     return res
//                 }
//             } catch (err) {
//                 console.log(err, 'error')
//             }
//         }
//     }

//     handleJoin(name) {
//         // (4)
//         const chats = this.state.chats.slice()
//         chats.push({ action: 'join', name: name })
//         this.setState({
//             chats: chats,
//         })
//     }

//     handleMessage(name, message) {
//         // (6)
//         const chats = this.state.chats.slice()
//         chats.push({ action: 'message', name: name, message: message })
//         this.setState({
//             chats: chats,
//         })
//     }

//     onSendMessage() {
//         const payload = {
//             message: this.state.messages,
//             conversation_id: this.props.route.params.items?.conversation_id,
//         }
//         console.log('messages 222222222', payload)
//         try {
//             axios
//                 .post(`${pusherConfig.restServer}/api/sendMessage`, payload, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Acess-Control-Allow-Origin': '*',
//                         Authorization: `Bearer ${Global.AuthenticationToken}`,
//                         Accept: 'application/json',
//                     },
//                 })
//                 .then((response) => {
//                     if (response?.data.code === 403) {
//                         alert('This Account is Logged in from another Device.')
//                         onLogout()
//                     } else {
//                         const data = response?.data
//                         console.log('messages here 333333', data)
//                         return response
//                     }
//                 })
//                 .catch((err) => {
//                     console.error(err)
//                 })
//         } catch (error) {}
//     }

//     render() {
//         const { messages, chats, msg, fullName } = this.state
//         const { onLogout, user } = this.context
//         return (
//             <View
//                 style={{
//                     flex: 1,
//                 }}
//             >
//                 <KeyboardAvoidingView
//                     style={{
//                         flex: 1,
//                         flexDirection: 'column',
//                         justifyContent: 'space-between',
//                         backgroundColor: '#fff',
//                     }}
//                     {...(Platform.OS === 'ios'
//                         ? {
//                               behavior: 'position',
//                               keyboardVerticalOffset: [40], // calculate height using onLayout callback method
//                           }
//                         : {})}
//                 >
//                     <FlatList
//                         inverted
//                         style={{ flexGrow: 1, height: WINDOW_HEIGHT * 0.75 }}
//                         contentContainerStyle={{
//                             paddingHorizontal: heightp(10),
//                             backgroundColor: colors.white,
//                         }}
//                         data={chats}
//                         showsVerticalScrollIndicator={true}
//                         keyExtractor={(_, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             <View
//                                 style={{
//                                     flex: 1,
//                                     marginVertical: 10,
//                                     maxWidth:
//                                         Dimensions.get('window').width / 1.2 +
//                                         10,
//                                     alignSelf:
//                                         user?.id === item?.name?.user_id
//                                             ? 'flex-end'
//                                             : 'flex-start',
//                                 }}
//                             >
//                                 {user?.id === item?.name?.user_id ? (
//                                     <View
//                                         style={{
//                                             borderRadius: 20,
//                                             backgroundColor:
//                                                 'rgba(0, 0, 0, 0.65)',
//                                         }}
//                                     >
//                                         <Hyperlink
//                                             linkStyle={{
//                                                 textDecorationLine: 'underline',
//                                             }}
//                                             linkDefault
//                                         >
//                                             <Text
//                                                 text={item?.name?.message}
//                                                 style={{
//                                                     padding: 10,
//                                                     fontSize: 16,
//                                                     color: 'white',
//                                                 }}
//                                             />
//                                         </Hyperlink>
//                                     </View>
//                                 ) : (
//                                     <View
//                                         style={{
//                                             justifyContent: 'space-between',
//                                             flexDirection: 'row',
//                                             alignItems: 'center',
//                                         }}
//                                     >
//                                         <>{console.log('hereeeee', item)}</>
//                                         <FastImage
//                                             style={{
//                                                 width: heightp(25),
//                                                 height: heightp(25),
//                                                 borderRadius: 25,
//                                                 marginRight: heightp(5),
//                                             }}
//                                             source={{
//                                                 uri: this.props.route.params
//                                                     .uri,
//                                                 priority:
//                                                     FastImage.priority.normal,
//                                             }}
//                                             resizeMode={
//                                                 FastImage.resizeMode.cover
//                                             }
//                                         />
//                                         <View
//                                             style={{
//                                                 borderRadius: 10,
//                                                 backgroundColor: colors.primary,
//                                             }}
//                                         >
//                                             <Hyperlink
//                                                 linkStyle={{
//                                                     textDecorationLine:
//                                                         'underline',
//                                                 }}
//                                                 linkDefault
//                                             >
//                                                 <Text
//                                                     text={item?.name?.message}
//                                                     style={{
//                                                         padding: 10,
//                                                         fontSize: 16,
//                                                         color: 'white',
//                                                     }}
//                                                 />
//                                             </Hyperlink>
//                                         </View>
//                                     </View>
//                                 )}

//                                 {/* <Text
//                                     text={item?.time.slice(10, 19)}
//                                     style={{
//                                         // color: 'rgba(0, 0, 0, 0.8)',
//                                         fontSize: heightp(12),
//                                         opacity: 0.5,
//                                         textAlign: 'left',
//                                     }}
//                                 /> */}
//                             </View>
//                         )}
//                     />
//                     <View
//                         style={{
//                             height: 50,
//                             width: '100%',
//                             flexDirection: 'row',
//                             justifyContent: 'center',
//                             paddingHorizontal: heightp(10),
//                             backgroundColor: 'rgba(255, 255, 255, 1)',
//                         }}
//                     >
//                         <View
//                             style={{
//                                 width: '90%',
//                                 height: '100%',
//                                 justifyContent: 'center',
//                                 alignSelf: 'flex-end',
//                             }}
//                         >
//                             <TextInput
//                                 autoFocus
//                                 value={messages}
//                                 onChangeText={(text) => {
//                                     this.setState({
//                                         messages: text,
//                                     })
//                                 }}
//                                 placeholder="Write your message here"
//                                 blurOnSubmit={false}
//                                 keyboardType="default"
//                                 returnKeyType="done"
//                                 enablesReturnKeyAutomatically
//                                 placeholderTextColor={colors.solidGray}
//                                 style={{
//                                     height: 40,
//                                     borderRadius: 20,
//                                     paddingHorizontal: 20,
//                                     borderColor: 'gray',
//                                     color: colors.black,
//                                     borderWidth: 0.5,
//                                 }}
//                             />
//                         </View>
//                         <TouchableOpacity
//                             style={{
//                                 height: '100%',
//                                 width: '10%',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 alignSelf: 'center',
//                                 marginLeft: 5,
//                             }}
//                             onPress={() => {
//                                 this.onSendMessage()
//                                 this.setState({
//                                     messages: '',
//                                 })
//                             }}
//                         >
//                             <Icons
//                                 name="send"
//                                 size={30}
//                                 color={colors.primary}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </KeyboardAvoidingView>
//             </View>
//         )
//     }

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

        chatChannel.bind('pusher:subscription_succeeded', () => {
            this.chatChannel.bind('join', (data) => {
                handleJoin(data.name)
            })
            this.chatChannel.bind('part', (data) => {
                handlePart(data.name)
            })
            this.chatChannel.bind('new-message-event', (data) => {
                console.log(
                    'subscription_succeeded->>>>>>>>>>>>>>>>>>>>',
                    title,
                    data
                )
                handleMessage(data)
            })
        })
        return () => {
            pusher.unsubscribe('my-channel')
        }
    })

    const handleJoin = (name) => {
        const chats = chats.slice()
        chats.push({ action: 'join', name: name })
        setChats(chats)
    }

    const handleMessage = (name, message) => {
        const chats = chats.slice()
        chats.push({ action: 'message', name: name, message: message })
        setChats(chats)
        // this.setState({
        //     chats: chats,
        // })
    }

    useEffect(() => {
        onGetMessageById()
    }, [])

    const onSendMessage = () => {
        const payload = {
            message: messages,
            conversation_id: items?.conversation_id,
        }
        console.log('messages 222222222', payload)
        try {
            axios
                .post(`${pusherConfig.restServer}/api/sendMessage`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Acess-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${Global.AuthenticationToken}`,
                        Accept: 'application/json',
                    },
                })
                .then((response) => {
                    if (response?.data.code === 403) {
                        alert('This Account is Logged in from another Device.')
                        onLogout()
                    } else {
                        const data = response?.data
                        console.log('messages here 333333', data)
                        return response
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        } catch (error) {}
    }

    const onGetMessageById = async () => {
        console.disableYellowBox = true
        Pusher.logToConsole = true
        console.log('messages', items?.conversation_id)
        const payload = {
            conversation_id: items?.conversation_id,
        }
        try {
            const res = await HomePageService.getMessageById(payload)
            if (res.code === 403) {
                alert('This Account is Logged in from another Device.')
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
