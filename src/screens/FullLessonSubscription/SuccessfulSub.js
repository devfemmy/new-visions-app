import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../helpers/colors'
import ConfirmIcon from '../../assets/img/confirm.svg'
import { Text } from '../../components/common'
import { heightp } from '../../utils/responsiveDesign'

const SubscriptionSuccess = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { name } = route.params
    return (
        <View style={styles.container}>
            <View>
                <ConfirmIcon width={180} height={200} />
            </View>
            <Text
                style={styles.text}
                text={`${name} has been
            subscribed`}
            />
            <Text
                onPress={() => navigation.navigate('HomePage')}
                style={styles.text2}
                text="Go Home"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: heightp(18),
    },
    text2: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: heightp(18),
        marginTop: heightp(5),
    },
})

export default SubscriptionSuccess
