import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Container, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import NotificationCard from '../../components/NotificationCard'
import { AppContext } from '../../context/AppState'
import HomePageService from '../../services/userServices'
import I18n from 'i18n-js'

const Notification = () => {
    const navigation = useNavigation()

    const [notificationData, setNotificatioData] = useState([])
    const [loading, setLoading] = useState(false)
    const { onLogout } = useContext(AppContext)

    useEffect(() => {
        // get Notification
        async function getNotification() {
            setLoading(true)
            try {
                const res = await HomePageService.getNotificationData()
                if (res.code === 403) {
                    setLoading(false)
                    onLogout()
                } else if (res.code === 407) {
                    setLoading(false)
                    // onLogout()
                } else {
                    const data = res?.data
                    setLoading(false)
                    setNotificatioData(data)
                    return res
                }
            } catch (err) {
                console.log(err, 'error')
                setLoading(false)
            }
        }
        getNotification()
    }, [])
    return (
        <Container style={styles.container}>
            <Loader visible={loading} />
            <View>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text text={I18n.t('NoData')} />
                        </View>
                    )}
                    data={notificationData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <NotificationCard contents={item?.message} />
                    )}
                />
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
})

export default Notification
