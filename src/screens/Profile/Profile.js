import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ParentProfileNavigator from '../../navigation/ParentProfileNavigator'
import Screen from '../../components/Screen'
import ProfileHeader from './ProfileHeader'
import Parents from './Parents'
import { TouchableWithoutFeedback } from 'react-native'
import I18n from 'i18n-js'
import colors from '../../helpers/colors'
import Global from '../../../Global'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile({ navigation }) {
    async function SubscriptionsClicked(item) {
        const dataFromAsync = await AsyncStorage.getItem('user')
        const session = JSON.parse(dataFromAsync)
        navigation.navigate('Subscriptions', {
            id: item?.id ? item.id : session?.id,
        })
    }

    async function AttendanceClicked(item) {
        const dataFromAsync = await AsyncStorage.getItem('user')
        const session = JSON.parse(dataFromAsync)
        navigation.navigate('Attendance', {
            id: item?.id ? item.id : session?.id,
            userStatus: 'Sons',
        })
    }

    return (
        <Screen>
            <ProfileHeader />
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 10,
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        SubscriptionsClicked({ id: Global.UserId })
                    }}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.title}>
                            {I18n.t('Subscriptions')}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        AttendanceClicked({ id: Global.UserId })
                    }}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.title}>
                            {I18n.t('PreviousClasses')}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <Parents navigation={navigation} />
        </Screen>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: colors.white,
        fontWeight: '700',
        fontFamily: 'Cairo',
    },
    btnContainer: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
})
