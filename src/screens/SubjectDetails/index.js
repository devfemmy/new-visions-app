/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    FlatList,
    LogBox,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
    Text as RNText,
    ActivityIndicator,
} from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import I18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import StageCard from '../../components/StageCard'
import SubjectCard from '../../components/SubjectCard'
import { getSubject } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import colors from '../../helpers/colors'
import { globalStyles } from '../../helpers/globalStyles'
import HomePageService from '../../services/userServices'
import { AppContext } from '../../context/AppState'

LogBox.ignoreAllLogs()
const SubjectDetails = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const route = useRoute()
    const { onLogout, user } = useContext(AppContext)
    // const { level } = route.params
    // const data = useAppSelector((state)=> console.log(state, 'hello'));
    const { subject } = useAppSelector((state) => state.subPage)
    const [searchText, setSearchText] = useState()
    const [subjectData, setSubjectData] = useState([])
    // const subjectData = subject?.data
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)

    const getSubject = async () => {
        const levelFromAsync = await AsyncStorage.getItem('level_id');
        const realLevel_id = levelFromAsync
        let level;
        if (realLevel_id === 0 || realLevel_id === "") {
            level = 1
        }else {
            level = realLevel_id
        }
        const payload = {
            level,
        }
        console.log(payload, 'xxxxxxxxxxxxx make request')
        setLoading(true)
        try {

            const res = await HomePageService.getSubjects(payload)
            const data = res?.data?.data
            console.log('wwwwwwwwww data zooooooooooooooom', res)
            setLoading(false)
            if (res.code === 200) {
                setLoading(false)
                setSubjectData(data)
            } else {
                console.log('account is logged in another device')
                onLogout()
                setLoading(false)
                // return
            }
            return res
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
            getSubject()
        })
        return unsubscribe
    }, [])

    const navigateSubjectsDetails = useCallback(
        (item) => {
            const { id, title, image } = item
            const uri = `${IMAGEURL}/${image}`
            if (id)
                navigation.navigate('DisplaySubject', {
                    subjectId: id,
                    title,
                    uri,
                })
        },
        [navigation]
    )
    const searchFilteredData = searchText
        ? subjectData?.filter((x) =>
              x.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : subjectData

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        const res = await getSubject()
        console.log('response', res)
        if (res?.code === 200) {
            setRefreshing(false)
        }
    }, [])
    // if(loading){
    //     <View style={styles.activityBox}>
    //     <ActivityIndicator animating color="green" />
    //     </View>
    // }

    return (
        <>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.container,
                    globalStyles.wrapper,
                ]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.containerFlex}>
                    <View style={{ marginBottom: 15 }}>
                        <SearchBar
                            placeholder={I18n.t('SearchSubjects')}
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                            style={styles.searchBar}
                            inputStyle={{ color: colors.dark }}
                            iconColor={colors.dark}
                        />
                    </View>
                    <RNText
                        style={[
                            styles.subItemText2,
                            {
                                // color: colors.primary,
                                textAlign: 'center',
                                paddingTop: heightp(10),
                                paddingBottom: heightp(20),
                            },
                        ]}
                    >
                        {I18n.t('SubjectChooseDate')}
                    </RNText>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.flatlistContent}
                        ListEmptyComponent={() => {
                            if(loading){
                            return (
                                <View style={styles.activityBox}>
                                <ActivityIndicator animating color="green" />
                            </View>
                            )
                            }
                                return (
                                    <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text text={I18n.t('NoData')} />
                                </View>
                                )
                            
                        }}
                        ListFooterComponent={() => (
                            <View
                                style={{
                                    height: heightp(75),
                                }}
                            />
                        )}
                        data={searchFilteredData}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    {searchFilteredData.length > 0 ? (
                                        <SubjectCard
                                            pressed={() =>
                                                navigateSubjectsDetails(item)
                                            }
                                            numberOfStudents={
                                                item?.number_of_students
                                            }
                                            duration={item?.number_of_hours}
                                            uri={`${IMAGEURL}/${item?.image}`}
                                            contents={item?.title}
                                        />
                                    ) : (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text text={I18n.t('NoData')} />
                                        </View>
                                    )}
                                </>
                            )
                        }}
                    />
                </View>
            </ScrollView>
            {/* <Loader visible={loading} /> */}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(20),
    },
    activityBox: {
        flex: 1,
        marginVertical: heightp(20)
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: 50,
        // height: 50,
        // borderRadius: 5,
        // backgroundColor: 'white',
    },
})

export default SubjectDetails
