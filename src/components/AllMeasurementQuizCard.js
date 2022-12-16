/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Pressable, StyleSheet, View, Text as RNText } from 'react-native'
import FastImage from 'react-native-fast-image'
import I18n from 'i18n-js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { globalStyles } from '../helpers/globalStyles'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'
import IconText from './IconText'
import colors from '../helpers/colors'
import { AppContext } from '../context/AppState'
import { AirbnbRating } from 'react-native-ratings'
const defaultUri = require('../assets/img/default-profile-picture.jpeg')

const AllMeasurementQuizCard = ({
    contents,
    item,
    uri,
    image,
    number_of_students,
    price,
    pressed,
    subjectDetails,
    quizzesResult,
}) => {
    const styles = StyleSheet.create({
        container: {
            minHeight: heightp(100),
            paddingHorizontal: heightp(10),
            borderRadius: 10,
            paddingVertical: heightp(5),
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginTop: heightp(10),
            marginVertical: subjectDetails ? 0 : heightp(10),
        },
        textAlign: {
            fontWeight: 'bold',
            textAlign: 'left',
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
            width: '100%',
            flexDirection: 'row',
            height: 35,
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: heightp(5),
        },
        loginBtnView: {
            flex: 1,
            borderRadius: 40,
            backgroundColor: 'rgba(238, 238, 239, 1)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        arrowCont: {
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            backgroundColor: colors.primary,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            marginLeft: heightp(5),
            color: colors.dark,
            fontSize: heightp(13),
            fontWeight: 'bold',
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        loginBtn: {
            width: '100%',
            flexDirection: 'row',
            height: 35,
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: heightp(5),
        },
        loginBtnView: {
            flex: 1,
            borderRadius: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
    })
    const { lang } = useContext(AppContext)
    return (
        <>
            <Pressable
                onPress={pressed}
                style={[styles.container, { flexDirection: 'column' }]}
            >
                <View style={globalStyles.rowBetween}>
                    <View>
                        <FastImage
                            style={{
                                width:
                                    image === null ? heightp(75) : heightp(100),
                                height:
                                    image === null ? heightp(75) : heightp(90),
                                borderRadius: 10,
                            }}
                            source={
                                image === null
                                    ? defaultUri
                                    : {
                                          uri,
                                          priority: FastImage.priority.normal,
                                      }
                            }
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    <View style={{ width: '65%' }}>
                        <View
                            style={[
                                globalStyles.rowBetween,
                                {
                                    // backgroundColor: '#fff',
                                    paddingVertical: heightp(5),
                                    paddingHorizontal: widthp(5),
                                    borderRadius: 10,
                                },
                            ]}
                        >
                            <View style={{ marginBottom: heightp(2) }}>
                                <View
                                    style={[
                                        styles.rowCenter,
                                        {
                                            // backgroundColor: '#ff0',
                                            // width: '88%',
                                        },
                                    ]}
                                >
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
                                    <Text
                                        numberOfLines={1}
                                        fontSize={heightp(13)}
                                        style={styles.text}
                                        text={contents && contents}
                                    />
                                </View>
                            </View>
                        </View>
                        {item?.final_result === null ? (
                            <></>
                        ) : (
                            <Pressable
                                style={styles.loginBtn}
                                onPress={quizzesResult}
                            >
                                <View style={styles.loginBtnView}>
                                    <View />
                                    <RNText
                                        style={[
                                            styles.loginText,
                                            { color: colors.white },
                                        ]}
                                    >
                                        {I18n.t('QuizResults')}
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
                        )}
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default AllMeasurementQuizCard
