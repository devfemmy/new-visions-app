import { useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { Dimensions, FlatList, LogBox, KeyboardAvoidingView, TextInput, TouchableOpacity, View, } from 'react-native';
import FastImage from 'react-native-fast-image';
import Hyperlink from 'react-native-hyperlink';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Container, Text } from '../../components/common'
import colors from '../../helpers/colors';
import { heightp } from '../../utils/responsiveDesign';

const MessageScreen = () => {
  const route = useRoute()
  const { uri, items } = route.params;
  const [messages, setMessages] = useState('')
  const messgArr = items.messages;
  const sender = 'hello'
  LogBox.ignoreAllLogs();
  return (
      <Container>
        {/* <KeyboardAvoidingView behavior='padding'  keyboardVerticalOffset={height - 1000}> */}
          <View>
          <FlatList
            inverted
            style={{ marginBottom: 80 }}
            data={messgArr}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginVertical: 10,
                  maxWidth: Dimensions.get('window').width / 1.2 + 10,
                  alignSelf:
                  sender === item.sendBy
                      ? 'flex-end'
                      : 'flex-start',
                }}
              >
                {sender === '' ? 
                <View
                style={{
                  borderRadius: 20,
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                }}
              >
            <Hyperlink
                  linkStyle={{ textDecorationLine: 'underline' }}
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
              </View>: 
              <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                <FastImage
                    style={{width: heightp(25), height: heightp(25), borderRadius: 25, marginRight: heightp(5)}}
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
              linkStyle={{ textDecorationLine: 'underline' }}
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
              }

                  <Text
                    text={item?.time.slice(10, 19)}
                    style={{
                      // color: 'rgba(0, 0, 0, 0.8)',
                      fontSize: heightp(12),
                      opacity: 0.5,
                      textAlign: 'left'
                    }}
                  />
              </View>
            )}
          />
          </View>
          <View
            style={{
              bottom: heightp(20),
              height: 50,
              width: '100%',
              position: 'absolute',
              flexDirection: 'row',
              paddingHorizontal: heightp(20),
            }}
          >
            <View style={{ width: '100%', justifyContent: 'center' }}>
              <TextInput
                value={messages}
                onChangeText={(text) => setMessages(text)}
                placeholder="Write your message here"
                placeholderTextColor="#000"
                style={{
                  height: 40,
                  borderRadius: 20,
                  // backgroundColor: 'rgba(4, 63, 124, 0.1)',
                  paddingHorizontal: 20,
                  borderColor: 'gray',
                  color: 'gray',
                  borderWidth: 0.5
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '10%',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              }}
              onPress={() => {}}
            >
              <Icons name="send" size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>
        {/* </KeyboardAvoidingView> */}
    </Container>
  )
};

export default MessageScreen;