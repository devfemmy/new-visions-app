/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import I18n from 'i18n-js'
import { Container, Text } from '../../components/common'
import { heightp } from '../../utils/responsiveDesign'
import ChildsCard from './ChildCards'
import { useNavigation, useRoute } from '@react-navigation/native'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import { Loader } from '../../components/Loader'
import { IMAGEURL } from '../../utils/functions'
import SubscriptionModal from '../../components/SubscriptionModal'

const ParentSubscription = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {uniqueId, type, lesson_id, day_id} = route.params;
  const [childrenData, setChildrenData] = useState([])
  const [loading, setLoading] = useState(false)
  const { onLogout } = useContext(AppContext)
  const [isVisible, setIsVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  useEffect(() => {
    // get Notification
    async function getUserChildren() {
        setLoading(true)
        try {
            const res = await HomePageService.getUserChildren()
            if (res.code === 403) {
                setLoading(false)
                alert('This Account is Logged in from another Device.')
                onLogout()
            } else if (res.code === 407) {
                setLoading(false)
                // onLogout()
            } else {
                const data = res?.data
                setLoading(false);
                setChildrenData(data)
                console.log('res', res)
                return res
            }
        } catch (err) {
            console.log(err, 'error')
            setLoading(false)
        }
    }
    getUserChildren()
}, [])
const openModal = (message) => {
  setIsVisible(!isVisible)
  setModalMessage(message)
}
const subscribeExternal = async (child_id) => {
  setLoading(true)
  const payload = {
      id: uniqueId.toString(),
      type,
      lesson_id,
      day_id,
      child_id,
  }
  try {
      const res = await HomePageService.subscribeExternal(payload)
      if (res.code === 200) {
          setLoading(false)
          openModal(res?.message)
      } else {
          console.log('failed', res)
          setLoading(false)
          Alert.alert(I18n.t('Subscribe'), res?.message, [
              {
                  text: 'Cancel',
                  onPress: () => navigation.popToTop(),
                  style: 'cancel',
              },
              {
                  text: 'OK',
                  onPress: () => navigation.popToTop(),
              },
          ])
      }
      return res
  } catch (err) {
      setLoading(false)
  }
}
  return (
    <Container>
            <Loader visible={loading} />
            <Text style={styles.textStyle} text={I18n.t('ChooseChild')} />
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
                    data={childrenData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => {
                      const uri = `${IMAGEURL}/${item.image}`;
                      return(
                        <ChildsCard pressed={() => subscribeExternal(item?.user_id)} uri={uri} name={item?.name} />
                    )
                    }}
                />
            </View>
            <SubscriptionModal
                onPress={() => {
                    setIsVisible(!isVisible)
                }}
                isVisible={isVisible}
                text={modalMessage}
                navigation={() => {
                    setIsVisible(!isVisible)
                    // navigation.popToTop()
                }}
            />
    </Container>
  )
}
const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontWeight: '500'
  },
})

export default ParentSubscription;