import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { Modal } from './Modal'

export const Loader = ({ visible }) => {
    return (
        <Modal visible={visible} opacity={0.6}>
            <View style={styles.activityBox}>
                <ActivityIndicator animating color="green" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    activityBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'white',
    },
})
