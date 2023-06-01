import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import ParentProfileNavigator from '../../navigation/ParentProfileNavigator'
import Screen from '../../components/Screen'
import ProfileHeader from './ProfileHeader'
import colors from '../../helpers/colors'
import Sons from './Sons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Profile({ navigation }) {
    return (
        <Screen>
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flex: 1,
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <ProfileHeader />
                    <Sons navigation={navigation} />
                </ScrollView>
            </KeyboardAwareScrollView>
        </Screen>
    )
}
const styles = StyleSheet.create({})
