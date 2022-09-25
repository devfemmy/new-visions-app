import { useRoute } from '@react-navigation/native'
import React, {
    useEffect,
    useState,
    useContext,
    Component,
    useCallback,
} from 'react'
import {
    Dimensions,
    FlatList,
    LogBox,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class MessageScreen extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            messages: '',
            chats: [],
            msg: '',
            fullName: '',
            next_page_url: '',
            isLoading: false,
            onEndReachedCalledDuringMomentum: false,
        }
        this.pusher = new Pusher(pusherConfig.key, pusherConfig)
        this.chatChannel = this.pusher.subscribe('my-channel')
        this.chatChannel.bind('pusher:subscription_succeeded', () => {
            this.chatChannel.bind('join', (data) => {
                this.handleJoin(data.conversation_id)
            })
            this.chatChannel.bind('part', (data) => {
                this.handlePart(data.conversation_id)
            })
            this.chatChannel.bind('new-message-event', (data) => {
                console.log(
                    'subscription_succeeded->>>>>>>>>>>>>>>>>>>>',
                    this.props.route.params.title,
                    data
                )
                this.handleMessage(data)
            })
        })
        this.handleSendMessage = this.onSendMessage.bind(this)
    }

    async componentDidMount() {
        console.disableYellowBox = true
        Pusher.logToConsole = true
        LogBox.ignoreAllLogs()
        const { onLogout, user } = this.context

        onGetMessageById = async () => {
            console.log(
                'messages opooooor 1',
                this.props.route.params.uri,
                this.props.route.params.items?.conversation_id
            )
            const payload = {
                conversation_id: this.props.route.params.items?.conversation_id,
            }
            try {
                const res = await HomePageService.getMessageById(payload)
                if (res.code === 403) {
                    alert('This Account is Logged in from another Device.')
                    onLogout()
                } else {
                    const data = res?.data[0]
                    console.log('onGetMessageById messages here', data)
                    this.setState({
                        chats: data?.messages,
                        next_page_url: data?.next_page_url,
                    })
                    // setChats(data?.messages)
                    return res
                }
            } catch (err) {
                console.log(err, 'error')
            }
        }
        onGetMessageById()
    }

    handleJoin(name) {
        // (4)
        const chats = this.state.chats.slice()
        chats.push({ name: name })
        this.setState({
            chats: chats,
        })
    }

    handleMessage(text) {
        // (6)
        console.log(' message to be sent', text)
        const chats = this.state.chats.slice()
        // chats.push(text)
        let array = [text]
        this.setState({
            chats: [...array, ...chats],
        })
        // chats.push(text)
        // this.setState({
        //     chats: chats,
        // })
    }

    onSendMessage() {
        const payload = {
            message: this.state.messages,
            conversation_id: this.props.route.params.items?.conversation_id,
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

    fetchMessages = async () => {
        // const { onLogout, user } = this.context
        console.log(
            'aaaaaaaaaaaa xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx next_page_url',
            this.state.next_page_url
        )
        // setIsLoading(true)
        this.setState({
            isLoading: true,
        })
        const payload = {
            conversation_id: this.props.route.params.items?.conversation_id,
        }
        try {
            axios
                .post(
                    this.state.next_page_url, // URL
                    payload,
                    {
                        // config
                        headers: {
                            'Content-Type': 'application/json',
                            'Acess-Control-Allow-Origin': '*',
                            Authorization: `Bearer ${Global.AuthenticationToken}`,
                            Accept: 'application/json',
                        },
                    }
                )
                .then((response) => {
                    if (response.data.code === 403) {
                        this.setState({
                            isLoading: true,
                        })
                        alert('This Account is Logged in from another Device.')
                        // onLogOut()
                        // return
                    } else if (response.data.code === 403) {
                    } else {
                        this.setState({
                            isLoading: true,
                        })
                        console.log(
                            `saved to cache,`,
                            response?.data?.data[0]?.messages
                        )
                        const chats = this.state.chats.slice()
                        this.setState({
                            chats: [
                                ...chats,
                                ...response?.data?.data[0]?.messages,
                            ],
                            next_page_url:
                                response?.data?.data[0]?.next_page_url,
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                    this.setState({
                        isLoading: true,
                    })
                })
        } catch (err) {
            this.setState({
                isLoading: false,
            })
        }
    }

    onEndReached = () => {
        if (!this.state.onEndReachedCalledDuringMomentum) {
            this.fetchMessages()
            this.setState({
                onEndReachedCalledDuringMomentum: true,
            })
        }
    }

    renderFooter = () => {
        return (
            <View
                style={{
                    marginTop: heightp(60),
                }}
            >
                {this.state.isLoading ? (
                    <ActivityIndicator
                        color={colors.primary}
                        size="small"
                        style={{ marginLeft: 8 }}
                    />
                ) : null}
            </View>
        )
    }

    onEndReachedProp = this.onEndReached.bind(this)

    render() {
        const { messages, chats, msg, fullName } = this.state
        const { onLogout, user } = this.context
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                }}
            >
                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraHeight={100}
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: '#fff',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                        }}
                    >
                        <FlatList
                            inverted
                            style={{ flexGrow: 1 }}
                            contentContainerStyle={{
                                paddingHorizontal: heightp(10),
                                backgroundColor: colors.white,
                            }}
                            keyboardShouldPersistTaps="handled"
                            data={chats}
                            showsVerticalScrollIndicator={true}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        flex: 1,
                                        marginVertical: 10,
                                        maxWidth:
                                            Dimensions.get('window').width /
                                                1.2 +
                                            10,
                                        alignSelf:
                                            user?.id === item?.user_id
                                                ? 'flex-end'
                                                : 'flex-start',
                                    }}
                                >
                                    {user?.id === item?.user_id ? (
                                        <>
                                            <View
                                                style={{
                                                    borderRadius: 20,
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.65)',
                                                }}
                                            >
                                                <>
                                                    {console.log(
                                                        'sent by meeeeeeee',
                                                        item
                                                    )}
                                                </>
                                                <Hyperlink
                                                    linkStyle={{
                                                        textDecorationLine:
                                                            'underline',
                                                    }}
                                                    linkDefault
                                                >
                                                    <Text
                                                        text={
                                                            item?.text &&
                                                            item?.text.length >
                                                                0
                                                                ? item.text
                                                                : item?.message
                                                        }
                                                        style={{
                                                            padding: 10,
                                                            fontSize: 16,
                                                            color: 'white',
                                                        }}
                                                    />
                                                </Hyperlink>
                                            </View>
                                            {/* <Text
                                            text={item?.time.slice(10, 19)}
                                            style={{
                                                // color: 'rgba(0, 0, 0, 0.8)',
                                                fontSize: heightp(12),
                                                opacity: 0.5,
                                                textAlign: 'right',
                                            }}
                                        /> */}
                                        </>
                                    ) : (
                                        <>
                                            <View
                                                style={{
                                                    justifyContent:
                                                        'space-between',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <>
                                                    {console.log(
                                                        'hereeeee',
                                                        item
                                                    )}
                                                </>
                                                <FastImage
                                                    style={{
                                                        width: heightp(25),
                                                        height: heightp(25),
                                                        borderRadius: 25,
                                                        marginRight: heightp(5),
                                                    }}
                                                    source={{
                                                        uri: item.image,
                                                        priority:
                                                            FastImage.priority
                                                                .normal,
                                                    }}
                                                    resizeMode={
                                                        FastImage.resizeMode
                                                            .cover
                                                    }
                                                />
                                                <View
                                                    style={{
                                                        borderRadius: 10,
                                                        backgroundColor:
                                                            colors.primary,
                                                    }}
                                                >
                                                    <Hyperlink
                                                        linkStyle={{
                                                            textDecorationLine:
                                                                'underline',
                                                        }}
                                                        linkDefault
                                                    >
                                                        <Text
                                                            text={
                                                                item?.text &&
                                                                item?.text
                                                                    .length > 0
                                                                    ? item.text
                                                                    : item?.message
                                                            }
                                                            style={{
                                                                padding: 10,
                                                                fontSize: 16,
                                                                color: 'white',
                                                            }}
                                                        />
                                                    </Hyperlink>
                                                </View>
                                            </View>
                                            {item?.time && (
                                                <Text
                                                    text={item?.time.slice(
                                                        10,
                                                        19
                                                    )}
                                                    style={{
                                                        // color: 'rgba(0, 0, 0, 0.8)',
                                                        fontSize: heightp(12),
                                                        opacity: 0.5,
                                                        textAlign: 'left',
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </View>
                            )}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={20}
                            onEndReached={this.onEndReachedProp}
                            renderFooter={this.renderFooter}
                            onMomentumScrollBegin={() => {
                                this.setState({
                                    onEndReachedCalledDuringMomentum: false,
                                })
                            }}
                        />
                        <View
                            style={{
                                height: 50,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingHorizontal: heightp(10),
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                marginBottom: heightp(50),
                                marginTop: heightp(5),
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
                                    autoFocus
                                    value={messages}
                                    onChangeText={(text) => {
                                        this.setState({
                                            messages: text,
                                        })
                                    }}
                                    placeholder="Write your message here"
                                    blurOnSubmit={false}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    enablesReturnKeyAutomatically
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
                                    this.onSendMessage()
                                    this.setState({
                                        messages: '',
                                    })
                                }}
                            >
                                <Icons
                                    name="send"
                                    size={30}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default MessageScreen
