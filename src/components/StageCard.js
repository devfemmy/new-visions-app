/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import I18n from 'i18n-js'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import colors from '../helpers/colors'
import { globalStyles } from '../helpers/globalStyles'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'

const StageCard = ({
    days,
    text,
    dark,
    stage,
    levels,
    activeStage,
    activeLevel,
    setActiveLevel,
    setActiveStage,
    show,
    group,
    uri,
    withImg,
    groupNumber,
    reducedHeight,
    eduPress,
    navigateSubjects,
    subject_id,
    text2,
    newPress,
}) => {
    let isActive
    if (group) {
        isActive = activeStage?.id === stage?.id
    } else {
        isActive = activeStage?.name === stage?.name
    }
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        container: {
            minHeight: reducedHeight ? heightp(80) : heightp(110),
            backgroundColor: isActive ? colors.primary : colors.dark,
            borderRadius: 8,
            width: dark ? '100%' : widthp(121),
            marginRight: heightp(25),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: heightp(10),
            marginTop: dark ? heightp(20) : 0,
        },
        darkContainer: {
            minHeight: heightp(110),
            backgroundColor: !dark ? colors.primary : colors.dark,
            borderRadius: 8,
            width: dark ? '100%' : widthp(121),
            marginRight: heightp(25),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: heightp(10),
            marginTop: dark ? heightp(20) : 0,
        },
        textColor: {
            color: 'white',
            fontWeight: 'bold',
        },
        text2: {
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
        },
        textStyleImg: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: heightp(19),
        },
        levels: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: heightp(30),
            marginHorizontal: heightp(12),
        },
        levelBox: {
            width: '48%',
            marginBottom: heightp(10),
            paddingHorizontal: heightp(10),
            paddingVertical: heightp(15),
            borderRadius: heightp(5),
        },
        level: {
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Cairo-Medium',
            fontSize: heightp(14),
        },
        continueBtn: {
            backgroundColor: colors.primary,
            height: heightp(45),
            justifyContent: 'center',
            borderRadius: 20,
            marginTop: heightp(20),
        },
        withImageStyle: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
    })
    const returnDay = (day, start) => {
        if (day === 1) {
            return `${I18n.t('Saturday')} ${start}`
        } else if (day === 2) {
            return `${I18n.t('Sunday')} ${start}`
        } else if (day === 3) {
            return `${I18n.t('Monday')} ${start}`
        } else if (day === 4) {
            return `${I18n.t('Tuesday')} ${start}`
        } else if (day === 5) {
            return `${I18n.t('Wednesday')} ${start}`
        } else if (day === 6) {
            return `${I18n.t('Thursday')} ${start}`
        } else if (day === 7) {
            return `${I18n.t('Friday')} ${start}`
        } else {
            return ''
        }
    }
    // console.log(stage?.name, 'Hello')
    return (
        <View>
            {!dark ? (
                <Pressable
                    onPress={eduPress}
                    style={!dark ? styles.darkContainer : styles.container}
                >
                    <FastImage
                        style={{
                            width: heightp(50),
                            height: heightp(40),
                            borderRadius: 10,
                        }}
                        source={{
                            uri,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={styles.textColor} text={text} />
                </Pressable>
            ) : (
                <Pressable
                    onPress={() => {
                        newPress()
                        setActiveStage(stage)
                        if (stage.name === I18n.t('SpecialDate')) {
                            navigation.navigate('PrivateSubjectSubscribe', {
                                subject_id: subject_id,
                            })
                        }
                        if (stage.name !== activeStage?.name)
                            setActiveLevel(null)
                    }}
                    style={!dark ? styles.darkContainer : styles.container}
                >
                    {group && !reducedHeight ? (
                        <Text style={styles.textColor} text={groupNumber} />
                    ) : null}
                    {withImg ? (
                        <View style={styles.withImageStyle}>
                            <FastImage
                                style={{
                                    width: heightp(50),
                                    height: heightp(40),
                                    borderRadius: 10,
                                    marginRight: heightp(15),
                                }}
                                source={{
                                    uri,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text
                                style={
                                    withImg
                                        ? styles.textStyleImg
                                        : styles.textColor
                                }
                                text={text}
                            />
                        </View>
                    ) : (
                        <View>
                            {text2 && (
                                <Text style={styles.text2} text={text2} />
                            )}
                            <Text style={styles.textColor} text={text} />
                            {days && (
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {days?.map((day, index) => {
                                        return (
                                            <Text
                                                style={[
                                                    styles.textColor,
                                                    {
                                                        paddingVertical:
                                                            heightp(4),
                                                    },
                                                ]}
                                                text={returnDay(
                                                    day?.day_id,
                                                    day?.start
                                                )}
                                            />
                                        )
                                    })}
                                </View>
                            )}
                        </View>
                    )}
                </Pressable>
            )}
            {isActive && !show ? (
                <>
                    <View style={styles.levels}>
                        {levels?.map((level) => {
                            const isActiveLevel = level.id === activeLevel?.id
                            return (
                                <TouchableOpacity
                                    key={level.id}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        navigateSubjects()
                                    }}
                                    onPressIn={() => {
                                        setActiveLevel(level)
                                    }}
                                    onPressOut={() => {
                                        setActiveLevel(level)
                                    }}
                                    style={[
                                        styles.levelBox,
                                        {
                                            backgroundColor: isActiveLevel
                                                ? colors.primary
                                                : colors.dark,
                                        },
                                    ]}
                                >
                                    <Text
                                        text={level.name}
                                        numberOfLines={1}
                                        style={styles.level}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* {activeLevel ? (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.continueBtn}
                            onPress={() => navigateSubjects()}
                        >
                            <Text
                                text={I18n.t('Next')}
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: 'white',
                                    fontFamily: 'Cairo-Medium',
                                    fontSize: 20,
                                }}
                            />
                        </TouchableOpacity>
                    ) : null} */}
                </>
            ) : null}
            <View style={!dark ? null : globalStyles.horizontalMargin} />
        </View>
    )
}

export default StageCard
