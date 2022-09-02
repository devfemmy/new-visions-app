import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MeasurementTestResults = () => {
    return (
        <View style={styles.container}>
            <Text>MeasurementTestResults</Text>
        </View>
    )
}

export default MeasurementTestResults

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
})
