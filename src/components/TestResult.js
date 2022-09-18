/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Pressable, StyleSheet, View, Text as RNText } from 'react-native'
import FastImage from 'react-native-fast-image'
import I18n from 'i18n-js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../helpers/globalStyles'
import { heightp } from '../utils/responsiveDesign'
import { Text } from './common'
import IconText from './IconText'
import colors from '../helpers/colors'
import { AppContext } from '../context/AppState'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AirbnbRating } from 'react-native-ratings'

const TestResult = ({ contents, title, uri, viewProfile }) => {
    const styles = StyleSheet.create({
        container: {
            minHeight: heightp(100),
            paddingHorizontal: heightp(20),
            borderRadius: 10,
            paddingVertical: heightp(5),
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginTop: heightp(10),
            marginVertical: heightp(10),
        },
        textAlign: {
            fontWeight: 'bold',
            textAlign: 'left',

            // textTransform: 'uppercase'
        },
        lowerContainer: {
            backgroundColor: 'rgba(249, 249, 249, 1)',
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
            borderTopWidth: 1,
            paddingHorizontal: heightp(20),
            paddingVertical: heightp(5),
            paddingTop: heightp(10),
        },
        bookBtn: {
            backgroundColor: 'rgba(67, 72, 84, 1)',
            marginVertical: heightp(10),
            justifyContent: 'center',
            alignItems: 'center',
            height: heightp(40),
            borderRadius: 8,
        },
        bookBtn2: {
            backgroundColor: colors.primary,
            marginVertical: heightp(10),
            justifyContent: 'center',
            alignItems: 'center',
            height: heightp(40),
            borderRadius: 8,
        },
        textWhite: {
            color: 'white',
            fontWeight: 'bold',
        },

        loginBtn: {
            width: '60%',
            flexDirection: 'row',
            height: 25,
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginVertical: heightp(5),
        },
        loginBtnView: {
            flex: 1,
            borderRadius: 40,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        arrowCont: {
            width: 20,
            height: 20,
            borderRadius: 15,
            justifyContent: 'center',
            backgroundColor: colors.primary,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
    const { lang } = useContext(AppContext)
    return (
        <>
            <Pressable
                onPress={() => {
                    console.log('pressed')
                }}
                style={[
                    styles.container,
                    // globalStyles.rowBetween,
                    { flexDirection: 'column' },
                ]}
            >
                <View style={globalStyles.rowBetween}>
                    <View>
                        <FastImage
                            style={{
                                width: heightp(100),
                                height: heightp(90),
                                borderRadius: 10,
                            }}
                            source={{
                                uri,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    <View style={{ width: '60%' }}>
                        <View style={globalStyles.rowBetween}>
                            <IconText
                                style={styles.textAlign}
                                text={contents && contents}
                                children={
                                    <View style={globalStyles.rowBetween}>
                                        <Ionicons
                                            name="ios-layers"
                                            size={20}
                                            color={'rgba(67, 72, 84, 1)'}
                                        />
                                        <View
                                            style={{
                                                height: heightp(20),
                                                backgroundColor:
                                                    'rgba(67, 72, 84, 1)',
                                                width: 1,
                                                marginHorizontal: 6,
                                            }}
                                        />
                                    </View>
                                }
                            />
                        </View>
                        <Text
                            numberOfLines={1}
                            style={styles.textAlign}
                            text={title && title}
                        />
                    </View>
                </View>
                <Pressable style={styles.loginBtn} onPress={viewProfile}>
                    <View style={styles.loginBtnView}>
                        <View />
                        <RNText
                            style={[
                                styles.loginText,
                                {
                                    color: colors.white,
                                },
                            ]}
                        >
                            {I18n.t('QuizzesResults')}
                        </RNText>
                        <View style={styles.arrowCont}>
                            <MaterialIcons
                                name={
                                    lang === 'ar'
                                        ? 'arrow-back'
                                        : 'arrow-forward'
                                }
                                size={16}
                                color={colors.white}
                            />
                        </View>
                    </View>
                </Pressable>
            </Pressable>
        </>
    )
}

export default TestResult
