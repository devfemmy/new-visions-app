/* eslint-disable react/prop-types */
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { heightp, widthp } from '../utils/responsiveDesign'
import { Text } from './common'
const defaultUri = require('../assets/img/default-profile-picture.jpeg')

const TeachersCard = ({ text, uri, lastName, pressed, image }) => (
    <Pressable onPress={pressed}>
        <View
            style={[
                styles.container,
                { height: image === null && heightp(90) },
            ]}
        >
            <>{console.log(image)}</>
            <FastImage
                style={{
                    width: image === null ? heightp(80) : heightp(121),
                    height: image === null ? heightp(80) : heightp(100),
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
            <Text style={styles.textColor} text={text} />
            <Text style={styles.textColor} text={lastName} />
        </View>
    </Pressable>
)

const styles = StyleSheet.create({
    container: {
        minHeight: heightp(90),
        backgroundColor: 'rgba(67, 72, 84, 0.2)',
        borderRadius: 8,
        width: widthp(121),
        marginRight: heightp(20),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: heightp(10),
    },
    textColor: {
        color: 'white',
        fontWeight: 'bold',
    },
    lowerContainer: {
        backgroundColor: 'rgba(67, 72, 84, 1)',
        height: heightp(61),
        marginRight: heightp(20),
        width: widthp(121),
        alignItems: 'center',
        paddingHorizontal: heightp(10),
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
})

export default TeachersCard
