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
import StudentGuideCard from '../../components/StudentGuideCard'
import NewLoader from '../../components/NewLoader'

const StudentGuide = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { lang, onLogout } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState([])
    const [groupData, setGroupData] = useState(null)
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false)
    const getGuidesFunc = async () => {
        // setLoading(true)
        try {
            const res = await HomePageService.getStudentGuide()
            setLoading(false)
            const data = res?.data
            console.log('res from getGuidesFunc', loading, res)
            if (res?.code === 200) {
                setLoading(false)
                console.log('guides', data)
                setData(data)
            } else {
                setData(data)
                setLoading(false)
                // onLogout()
                // return
            }
            // return res
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGuidesFunc()
        })
        return unsubscribe
    }, [navigation])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getGuidesFunc()
        if (res?.code === 200) {
            setRefreshing(false)
            setData(res?.data?.info[0])
        }
    }, [])

    const navigateTeachersProfile = useCallback(
        (item) => {
            navigation.navigate('GuideProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )
    const navigateStudyGuide = useCallback(
        (item, id) => {
            navigation.navigate('ChooseStudyDate', {
                item,
                guide_id: id,
            })
        },
        [navigation]
    )
    if (loading){
        return(
            <NewLoader />
        )
    }

    return (
        <>
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
                    <View>
                        <RNText
                            style={[
                                styles.subItemText2,
                                {
                                    // color: '#fff',
                                    textAlign: 'center',
                                    paddingTop: heightp(5),
                                    paddingBottom: heightp(20),
                                },
                            ]}
                        >
                            {I18n.t('StudyGuideNew')}
                        </RNText>
                    </View>
                    <View
                        style={[
                            globalStyles.horizontal,
                            {
                                marginBottom: heightp(5),
                            },
                        ]}
                    />
                    <FlatList
                        nestedScrollEnabled={true}
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
                        // ListFooterComponent={renderFooter}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => (
                            <>
                                <StudentGuideCard
                                    // subjectDetails
                                    viewProfile={
                                        () =>
                                            navigateTeachersProfile(item?.user)
                                        // navigateStudyGuide(item?.user, item?.id)
                                    }
                                    viewDate={() =>
                                        // navigateTeachersProfile(item?.user)
                                        navigateStudyGuide(item?.user, item?.id)
                                    }
                                    studyPressed={() =>
                                        navigateStudyGuide(item?.user, item?.id)
                                    }
                                    city={item?.city?.name}
                                    gender={item?.user?.gender}
                                    rates_count={item?.rates_count}
                                    ratings={
                                        item?.rate === 0 ? null : item?.rate
                                    }
                                    uri={`${IMAGEURL}/${item?.user?.image}`}
                                    image={item?.user?.image}
                                    contents={`${item?.user?.first_name} ${item?.user?.last_name}`}
                                />
                            </>
                        )}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={20}
                        // onEndReached={onEndReached}
                        onMomentumScrollBegin={() => {
                            setOnEndReachedCalledDuringMomentum(false)
                        }}
                    />
                </ScrollView>
            </View>
            {/* <Loader visible={loading} /> */}
        </>
    )
}

export default StudentGuide

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    flatlistContent: {
        // flexGrow: 1,
    },
    subItemText2: {
        fontSize: heightp(15),
        lineHeight: heightp(20),
        textAlign: 'right',
        color: '#434854',
    },
})
