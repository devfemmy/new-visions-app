/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import colors from '../helpers/colors'
import { globalStyles } from '../helpers/globalStyles'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'

const PackageStageCard = ({
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
    navigation,
}) => {
    let isActive
    if (group) {
        isActive = activeStage?.id === stage?.id
    } else {
        isActive = activeStage?.name === stage?.name
    }
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
                        navigation.navigate('PackagesList', {
                            stage_id: stage?.id,
                        })
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
                        <Text style={styles.textColor} text={text} />
                    )}
                </Pressable>
            )}
            <View style={!dark ? null : globalStyles.horizontalMargin} />
        </View>
    )
}

export default PackageStageCard
