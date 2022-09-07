/* eslint-disable camelcase */
import React, { useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { WINDOW_WIDTH } from '../../helpers/common'
import { heightp } from '../../utils/responsiveDesign'
import colors from '../../helpers/colors'
import I18n from 'i18n-js'

const WebViewComponent = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { live_url, liveNow, item } = route.params
    console.log('iteeeem', item)
    const navigateLiveNowQuiz = useCallback(
        (item) => {
            navigation.navigate('LiveNowQuiz', {
                item, // title: `${item?.first_name} ${item?.last_name}`,
            })
        },

        [navigation]
    )
    return (
        <>
            <WebView
                source={{ uri: live_url }}
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
            />
            {liveNow === 'liveNow' && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: heightp(55),
                        // height: heightp(120),
                        width: WINDOW_WIDTH,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        // backgroundColor: colors.white,
                    }}
                >
                    <Pressable
                        onPress={() => {
                            navigateLiveNowQuiz(item)
                            console.log('pressed')
                        }}
                    >
                        <View
                            style={[
                                styles.btnContainer,
                                {
                                    backgroundColor: colors.primary,
                                    marginTop: 20,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {I18n.t('Quiz')}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            )}
        </>
    )
}

export default WebViewComponent

const styles = StyleSheet.create({
    title: {
        fontSize: heightp(15),
        fontWeight: '700',
        fontFamily: 'Cairo',
    },
    btnContainer: {
        width: WINDOW_WIDTH * 0.15,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.primary,
        borderRadius: 10,
        marginVertical: 5,
    },
})
