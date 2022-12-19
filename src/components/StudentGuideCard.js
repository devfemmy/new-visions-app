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
const defaultUri = require('../assets/img/default-profile-picture.jpeg')

const StudentGuideCard = ({
    contents,
    title,
    uri,
    image,
    gender,
    rates_count,
    city,
    lessonPrice,
    numberOfStudents,
    viewProfile,
    viewDate,
    ratings,
    bookCourse,
    subjectCalendar,
    bookPrivateLesson,
    bookOneLesson,
    pressed,
    subjectDetails,
    studyPressed,
}) => {
    const styles = StyleSheet.create({
        container: {
            minHeight: heightp(100),
            paddingHorizontal: heightp(20),
            borderRadius: 10,
            paddingVertical: heightp(5),
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginTop: heightp(10),
            marginVertical: subjectDetails ? 0 : heightp(10),
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
            width: '45%',
            flexDirection: 'row',
            height: 35,
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: heightp(5),
        },
        loginBtnView: {
            flex: 1,
            borderRadius: 40,
            backgroundColor: 'rgba(155, 186, 82, 1)',
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
            backgroundColor: 'rgba(155, 186, 82, 1)',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
    const { lang } = useContext(AppContext)
    return (
        <>
            <Pressable
                onPress={() => {}}
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
                    <View style={{ width: '60%' }}>
                        <View style={globalStyles.rowBetween}>
                            <IconText
                                style={styles.textAlign}
                                text={contents && contents}
                                children={
                                    <View style={globalStyles.rowBetween}>
                                        <Ionicons
                                            name="person-circle-outline"
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
                            <Pressable onPress={studyPressed}>
                                <Ionicons
                                    name={
                                        lang === 'ar'
                                            ? 'arrow-back-circle'
                                            : 'arrow-forward-circle'
                                    }
                                    size={20}
                                    color={'rgba(155, 186, 82, 1)'}
                                />
                            </Pressable>
                        </View>
                        {/* <Text
                            numberOfLines={1}
                            style={styles.textAlign}
                            text={title && title}
                        /> */}
                        {subjectDetails ? (
                            <>
                                <IconText
                                    text={
                                        numberOfStudents &&
                                        `${numberOfStudents} ${I18n.t(
                                            'Students'
                                        )}`
                                    }
                                    children={
                                        <View style={globalStyles.rowBetween}>
                                            <Ionicons
                                                name="ios-people"
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
                            </>
                        ) : (
                            <View style={globalStyles.rowBetween}>
                                <IconText
                                    text={
                                        gender && gender === 1
                                            ? 'Male'
                                            : 'Female'
                                    }
                                    children={
                                        <View style={globalStyles.rowBetween}>
                                            <Ionicons
                                                name="ios-person"
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
                                {/* {ratings && (
                                    <AirbnbRating
                                        size={12}
                                        imageSize={12}
                                        defaultRating={ratings}
                                        isDisabled
                                        reviews={
                                            [
                                                // 'Terrible',
                                                // 'Bad',
                                                // 'Okay',
                                                // 'Swift & quick pickup',
                                                // 'Excellent',
                                            ]
                                        }
                                        reviewSize={10}
                                        type="star"
                                        ratingColor="#3498db"
                                        ratingContainerStyle={{
                                            flexDirection: 'row',
                                            backgroundColor: 'inherit',
                                            // height: '40%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingRight: heightp(12),
                                        }}
                                    />
                                )} */}
                            </View>
                        )}
                        {subjectDetails ? (
                            <>
                                {ratings && (
                                    <View style={globalStyles.rowBetween}>
                                        <Ionicons
                                            name="ribbon-outline"
                                            size={20}
                                            color={colors.black}
                                        />
                                        <View
                                            style={{
                                                height: heightp(20),
                                                backgroundColor:
                                                    'rgba(67, 72, 84, 1)',
                                                width: 1,
                                                marginLeft: 6,
                                            }}
                                        />
                                        <AirbnbRating
                                            size={11}
                                            defaultRating={ratings}
                                            isDisabled
                                            reviews={
                                                [
                                                    // 'Terrible',
                                                    // 'Bad',
                                                    // 'Okay',
                                                    // 'Swift & quick pickup',
                                                    // 'Excellent',
                                                ]
                                            }
                                            reviewSize={10}
                                            type="star"
                                            ratingColor="#3498db"
                                            style={{
                                                paddingHorizontal: 30,
                                            }}
                                            ratingContainerStyle={{
                                                flexDirection: 'row',
                                                backgroundColor: 'inherit',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                // paddingRight: heightp(-40),
                                                // backgroundColor: '#f0f',
                                            }}
                                        />
                                    </View>
                                )}
                            </>
                        ) : (
                            <View style={globalStyles.rowBetween}>
                                {ratings && (
                                    <View style={globalStyles.rowBetween}>
                                        <Ionicons
                                            name="ribbon-outline"
                                            size={20}
                                            color={colors.black}
                                        />
                                        <View
                                            style={{
                                                height: heightp(20),
                                                backgroundColor:
                                                    'rgba(67, 72, 84, 1)',
                                                width: 1,
                                                marginLeft: 6,
                                            }}
                                        />
                                        <AirbnbRating
                                            size={11}
                                            defaultRating={ratings}
                                            isDisabled
                                            reviews={
                                                [
                                                    // 'Terrible',
                                                    // 'Bad',
                                                    // 'Okay',
                                                    // 'Swift & quick pickup',
                                                    // 'Excellent',
                                                ]
                                            }
                                            reviewSize={10}
                                            type="star"
                                            ratingColor="#3498db"
                                            style={{
                                                paddingHorizontal: 30,
                                            }}
                                            ratingContainerStyle={{
                                                flexDirection: 'row',
                                                backgroundColor: 'inherit',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                // paddingRight: heightp(-40),
                                                // backgroundColor: '#f0f',
                                            }}
                                        />
                                    </View>
                                )}
                                {/* <IconText
                                    text={city && city}
                                    children={
                                        city && (
                                            <View
                                                style={globalStyles.rowBetween}
                                            >
                                                <Ionicons
                                                    name={
                                                        subjectDetails
                                                            ? 'ios-pricetag'
                                                            : 'business'
                                                    }
                                                    size={20}
                                                    color={
                                                        'rgba(67, 72, 84, 1)'
                                                    }
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
                                        )
                                    }
                                /> */}
                            </View>
                        )}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable style={styles.loginBtn} onPress={viewProfile}>
                        <View style={styles.loginBtnView}>
                            <View />
                            <RNText
                                style={[
                                    styles.loginText,
                                    { color: colors.white },
                                ]}
                            >
                                {I18n.t('StudyGuideViewProfile')}
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
                    <Pressable style={styles.loginBtn} onPress={viewDate}>
                        <View
                            style={[
                                styles.loginBtnView,
                                {
                                    backgroundColor: 'rgba(217, 217, 217, 1)',
                                },
                            ]}
                        >
                            <View />
                            <RNText
                                style={[
                                    styles.loginText,
                                    { color: colors.black },
                                ]}
                            >
                                {I18n.t('ViewDate')}
                            </RNText>
                            <View
                                style={[
                                    styles.arrowCont,
                                    {
                                        backgroundColor:
                                            'rgba(217, 217, 217, 1)',
                                    },
                                ]}
                            >
                                <MaterialIcons
                                    name={
                                        lang === 'ar'
                                            ? 'arrow-back'
                                            : 'arrow-forward'
                                    }
                                    size={16}
                                    color={colors.black}
                                />
                            </View>
                        </View>
                    </Pressable>
                </View>
            </Pressable>
            {subjectDetails ? (
                <View style={[styles.lowerContainer]}>
                    {/* <View style={globalStyles.rowBetween}>
                        <Pressable
                            onPress={bookOneLesson}
                            style={globalStyles.subBtn2}
                        >
                            <Text
                                style={globalStyles.btnColor}
                                text={I18n.t('BookOneLesson')}
                            />
                        </Pressable>
                        <Pressable onPress={subjectCalendar} style={globalStyles.subBtn}>
        <Text style={globalStyles.btnColor} text="Subject Calendar" />
      </Pressable>
                    </View> */}
                    <Pressable
                        onPressIn={bookPrivateLesson}
                        style={styles.bookBtn}
                    >
                        <Text
                            style={styles.textWhite}
                            text={I18n.t('BookPrivateLesson')}
                        />
                    </Pressable>
                    <Pressable onPress={bookCourse} style={styles.bookBtn2}>
                        <Text
                            style={styles.textWhite}
                            text={I18n.t('CurriculumReservation')}
                        />
                    </Pressable>
                </View>
            ) : null}
        </>
    )
}

export default StudentGuideCard
