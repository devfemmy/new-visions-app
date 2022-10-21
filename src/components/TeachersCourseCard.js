/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import {
    Pressable,
    StyleSheet,
    View,
    Text as RNText,
    Platform,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { globalStyles } from '../helpers/globalStyles'
import { heightp } from '../utils/responsiveDesign'
import { Text } from './common'
import TimeIcon from '../assets/img/time.svg'
import IconText from './IconText'
import colors from '../helpers/colors'
import I18n from 'i18n-js'
import { AppContext } from '../context/AppState'
import { WINDOW_WIDTH } from '../helpers/common'

const TeachersCourseCard = ({
    contents,
    uri,
    duration,
    students,
    pressed,
    onPressSubscribeTeachers,
    onPressSubscribePrivateTeachers,
    key,
    fromAllCourse,
}) => {
    const styles = StyleSheet.create({
        container: {
            // minHeight: heightp(100),
            paddingHorizontal: heightp(10),
            paddingVertical: heightp(7.5),
            borderRadius: 10,
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginVertical: heightp(7.5),
            marginHorizontal: heightp(7.5),
            width:
                Platform.OS === 'android'
                    ? WINDOW_WIDTH * 0.65
                    : WINDOW_WIDTH * 0.75,
            minHeight: heightp(135),
        },
        textAlign: {
            textAlign: 'left',
            width: '50%',
            fontSize: heightp(12),
        },
        //
        loginBtn: {
            width: '48%',
            flexDirection: 'row',
            height: 25,
            justifyContent: 'center',
            alignSelf: 'center',
        },
        loginBtnView: {
            flex: 1,
            borderRadius: 40,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        arrowCont: {
            width: 15,
            height: 15,
            borderRadius: 15,
            justifyContent: 'center',
            backgroundColor: colors.primary,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loginText: {
            fontSize: 11,
            color: colors.white,
        },
    })
    const { lang } = useContext(AppContext)
    return (
        <Pressable
            key={key}
            onPress={pressed}
            style={[
                styles.container,
                {
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width:
                        fromAllCourse === true
                            ? WINDOW_WIDTH * 0.9
                            : WINDOW_WIDTH * 0.75,
                },
            ]}
        >
            <View style={[globalStyles.rowBetween]}>
                <View>
                    <FastImage
                        style={{
                            width: heightp(100),
                            height: heightp(70),
                            borderRadius: 10,
                        }}
                        source={{
                            uri,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            width: '48%',
                        }}
                    >
                        <IconText
                            calender
                            text={duration && `${duration} ${I18n.t('Hours')}`}
                            children={<TimeIcon width={20} height={20} />}
                        />
                        <IconText
                            calender
                            text={
                                students && `${students} ${I18n.t('Students')}`
                            }
                            children={
                                <Ionicons
                                    name="ios-people"
                                    size={20}
                                    color={colors.primary}
                                />
                            }
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    paddingVertical: heightp(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <IconText
                    calender
                    text={duration && `${duration} ${I18n.t('Hours')}`}
                    children={
                        <Ionicons
                            name="ios-layers"
                            size={20}
                            color={colors.black}
                        />
                    }
                />
                <Text
                    style={[
                        styles.textAlign,
                        {
                            fontSize: heightp(11),
                        },
                    ]}
                    text={contents}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => {
                        console.log('pressed onPressSubscribeTeachers')
                        onPressSubscribeTeachers()
                    }}
                >
                    <View style={styles.loginBtnView}>
                        {/* <View /> */}
                        <RNText style={styles.loginText}>
                            {I18n.t('SubscribeToOneLesson')}
                        </RNText>
                        {/* <View style={styles.arrowCont}>
                            <MaterialIcons
                                name={
                                    lang === 'ar'
                                        ? 'arrow-back'
                                        : 'arrow-forward'
                                }
                                size={14}
                                color={colors.white}
                            />
                        </View> */}
                    </View>
                </Pressable>
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => {
                        console.log('pressed onPressSubscribePrivateTeachers')
                        onPressSubscribePrivateTeachers()
                    }}
                >
                    <View style={styles.loginBtnView}>
                        {/* <View /> */}
                        <RNText style={styles.loginText}>
                            {I18n.t('SubscribeToFullSubject')}
                        </RNText>
                        {/* <View style={styles.arrowCont}>
                            <MaterialIcons
                                name={
                                    lang === 'ar'
                                        ? 'arrow-back'
                                        : 'arrow-forward'
                                }
                                size={16}
                                color={colors.white}
                            />
                        </View> */}
                    </View>
                </Pressable>
            </View>
        </Pressable>
    )
}

export default TeachersCourseCard
