/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'
const defaultUri = require('../assets/img/default-profile-picture.jpeg')
import { Rating, AirbnbRating } from 'react-native-ratings'

const TeachersCard = ({ text, uri, lastName, pressed, image, ratings }) => (
    <Pressable onPress={pressed}>
        <View style={[styles.container]}>
            <FastImage
                style={{
                    width: image === null ? heightp(80) : heightp(80),
                    height: image === null ? heightp(80) : heightp(80),
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
        <View style={styles.lowerContainer}>
            <Text
                numberOfLines={1}
                fontSize={heightp(9)}
                style={styles.textColor}
                text={`${text} ${lastName}`}
            />
            {/* <Text numberOfLines={1} style={styles.textColor} text={lastName} /> */}
            <Text
                numberOfLines={1}
                fontSize={heightp(9)}
                style={[
                    styles.textColor,
                    {
                        paddingBottom: 5,
                        fontWeight: '500',
                    },
                ]}
                text={ratings && ratings}
            />
            {/* <AirbnbRating
                size={12}
                imageSize={10}
                defaultRating={ratings ? ratings : 0}
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
                    height: '40%',
                    paddingRight: heightp(12),
                }}
            /> */}
        </View>
    </Pressable>
)

const styles = StyleSheet.create({
    container: {
        minHeight: heightp(90),
        backgroundColor: 'rgba(67, 72, 84, 0.15)',
        borderTopEndRadius: 8,
        borderTopLeftRadius: 8,
        width: widthp(101),
        marginRight: heightp(10),
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: heightp(5),
    },
    textColor: {
        color: 'rgba(67, 72, 84, 1)',
        fontWeight: '700',
    },
    lowerContainer: {
        backgroundColor: 'rgba(67, 72, 84, 0.15)',
        // height: heightp(90),
        marginRight: heightp(10),
        width: widthp(101),
        alignItems: 'center',
        // paddingHorizontal: heightp(5),
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
})

export default TeachersCard
