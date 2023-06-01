import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import { globalStyles } from '../../helpers/globalStyles';

const NewLoader = () => (
    <View style={globalStyles.activityBox}>
    <ActivityIndicator animating color="green" />
    </View>
)
export default NewLoader;