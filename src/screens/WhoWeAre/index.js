import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WhoWeAre = () => {
    return (
        <View style={styles.container}>
            <Text>WhoWeAre</Text>
        </View>
    )
}

export default WhoWeAre

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
})
