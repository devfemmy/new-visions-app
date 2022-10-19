/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Pressable,
    ActivityIndicator,
    Text as RNText,
    Alert,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import I18n from 'i18n-js'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import { Text } from '../../components/common'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import HomePageService from '../../services/userServices'
import colors from '../../helpers/colors'
import { AppContext } from '../../context/AppState'
import Global from '../../../Global'
import TestResult from '../../components/TestResult'

const MeasurementTestResults = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const route = useRoute()
    const [isLoading, setIsLoading] = useState(false)
    // const [page, setPage] = useState(0)
    const { lang, onLogOut } = useContext(AppContext)
    const [dataForTestResult, setDataForTestResult] = useState([])

    // New use state
    const insets = useSafeAreaInsets()
    const [Page, setPage] = useState(1)
    const [PagePrev, setPagePrev] = useState(0)
    const [MaxPages, setMaxPages] = useState(999)
    const [SerachValue, setSerachValue] = useState('')
    const [CurrentSerachValue, setCurrentSerachValue] = useState('')
    const [LoadedPage, setLoadedPage] = useState(-1)
    const scrollRef = useRef()
    const [responseValue, SetresponseValue] = useState([])
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false)
    async function getFinishedMeasurementQuizzes() {
        setIsLoading(true)
        try {
            const res = await HomePageService.getFinishedMeasurementQuizzes()
            console.log('ebrahimhanna580@gmail.com', res)
            if (res.code === -2) {
                setIsLoading(false)
                console.log('false data', res)
                Alert.alert(
                    `${I18n.t('QuizzesResults')}`,
                    res?.message,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                // navigation.navigate('Home')
                            },
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            } else {
                const data = res?.data
                setIsLoading(false)
                setDataForTestResult(data)
                return data
            }
        } catch (err) {
            setIsLoading(false)
            console.log('err', err)
        }
    }
    useEffect(() => {
        getFinishedMeasurementQuizzes()
    }, [dispatch])

    const searchFilteredData = searchText
        ? dataForTestResult?.filter((x) =>
              x.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : dataForTestResult

    const navigateLiveNowQuizResult = useCallback(
        (item) => {
            navigation.navigate('LiveNowQuizResult', {
                item,
            })
        },
        [navigation]
    )

    return (
        <View style={styles.containerFlex}>
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 15 }}>
                    <SearchBar
                        placeholder={I18n.t('Name')}
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        style={styles.searchBar}
                        inputStyle={{ color: colors.dark }}
                        iconColor={colors.dark}
                    />
                </View>
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
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <>
                            <TestResult
                                viewProfile={() =>
                                    navigateLiveNowQuizResult(item)
                                }
                                title={item?.title && item?.title}
                                uri={`${IMAGEURL}/${item?.photo}`}
                                contents={`${item?.subject?.title}`}
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
    )
}
const styles = StyleSheet.create({
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        // marginBottom: heightp(20),
        flex: 1,
        paddingHorizontal: heightp(10),
    },
    footer: {
        // paddingVertical: heightp(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 7.5,
        backgroundColor: 'rgba(155, 186, 82, 1)',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
})

export default MeasurementTestResults
