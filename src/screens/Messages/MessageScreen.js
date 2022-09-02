import { useRoute } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
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
import FastImage from 'react-native-fast-image'
import Hyperlink from 'react-native-hyperlink'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Container, Text } from '../../components/common'
import colors from '../../helpers/colors'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/common'
import { heightp } from '../../utils/responsiveDesign'

const MessageScreen = () => {
    const route = useRoute()
    const { uri, items } = route.params
    const [messages, setMessages] = useState('')
    const messgArr = items.messages
    const sender = 'hello'
    LogBox.ignoreAllLogs()
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
                    data={messgArr}
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
                                    sender === item.sendBy
                                        ? 'flex-end'
                                        : 'flex-start',
                            }}
                        >
                            {sender === '' ? (
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
                        onPress={() => {}}
                    >
                        <Icons name="send" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MessageScreen
