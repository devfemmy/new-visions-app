/* eslint-disable react/prop-types */
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { heightp } from '../utils/responsiveDesign'
import { Text } from './common'

const IconText = ({ text, children, textColor, calender, modal }) => {
    const styles = StyleSheet.create({
        text: {
            marginLeft: heightp(5),
            color: textColor,
            fontSize: calender ? 13 : heightp(16),
            fontWeight: calender ? '600' : 'bold',
        },
        modalText: {
            color: 'white',
            marginLeft: heightp(5),
            fontWeight: 'bold',
            fontSize: heightp(16),
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rowModal: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    })
    return (
        <View style={{ marginBottom: heightp(2) }}>
            <View style={modal ? styles.rowModal : styles.rowCenter}>
                {children}
                <Text
                    numberOfLines={1}
                    fontSize={heightp(13)}
                    style={modal ? styles.modalText : styles.text}
                    text={text}
                />
            </View>
        </View>
    )
}

export default IconText
