import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Alert,
    FlatList,
    Platform,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text as RNText,
    TouchableOpacity,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { globalStyles } from '../../helpers/globalStyles'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import { Loader } from '../../components/Loader'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'
import I18n from 'i18n-js'
import { Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'

const ChooseStudyDate = () => {
    const route = useRoute()

    const {item, guide_id} = route.params;
    console.log('Items', item);
    const navigation = useNavigation()
    const { lang, onLogout } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState(null)
    const [groupData, setGroupData] = useState(null)
    const [
      onEndReachedCalledDuringMomentum,
      setOnEndReachedCalledDuringMomentum,
  ] = useState(false)

    const getGuidesDaysFunc = async () => {

        setLoading(true)
        const payload = {
            guide_id,
        }
        try {
            const res = await HomePageService.getGuideDays(payload)
            const data = res?.data
            if (res?.code === 200) {
                setLoading(false);
                console.log('guides days', data)
                setData(data)
            } else {
                alert('This Account is Logged in from another Device.')
                onLogout()
                // return
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGuidesDaysFunc()
        })
        return unsubscribe
    }, [navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getGuidesDaysFunc()
        if (res?.code === 200) {
            setRefreshing(false)
            setData(res?.data?.info[0])
        }
    }, [])

    const navigateTeachersProfile = useCallback(
      (item) => {
          navigation.navigate('TeacherProfile', {
              item,
              title: `${item?.first_name} ${item?.last_name}`,
          })
      },
      [navigation]
  )

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    // globalStyles.wrapper,
                ]}
                style={{ flex: 1, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                          
            </ScrollView>
            <Loader visible={loading} />
        </View>
    )
}

export default ChooseStudyDate

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    flatlistContent: {
        // flexGrow: 1,
    },
})
