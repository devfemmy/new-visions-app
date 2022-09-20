import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ParentProfileNavigator from '../../navigation/ParentProfileNavigator'
import Screen from '../../components/Screen'
import ProfileHeader from './ProfileHeader'
import colors from '../../helpers/colors'
import Sons from './Sons'

export default function Profile({ navigation }) {
    return (
        <Screen>
            <ProfileHeader />
            <Sons navigation={navigation} />
        </Screen>
    )
}
const styles = StyleSheet.create({})
