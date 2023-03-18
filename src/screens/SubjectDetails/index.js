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
} from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import { Container, Text } from '../../components/common'
import { Loader } from '../../components/Loader'
import StageCard from '../../components/StageCard'
import SubjectCard from '../../components/SubjectCard'
import { getSubject } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'
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
    const [loading, setLoading] = useState(false)

    const getSubject = async () => {
        setLoading(true)
        const payload = {
            level: user?.level_id,
        }
        try {
            const res = await HomePageService.getSubjects(payload)
            const data = res?.data?.data
            console.log('wwwwwwwwww data zooooooooooooooom', res)
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
        getSubject()
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('<<<<<tabs Refreshed>>>>>>')
        })
        return unsubscribe
    }, [dispatch, user])

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
            <Loader visible={loading} />
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
})

export default SubjectDetails
