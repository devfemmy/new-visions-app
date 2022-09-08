/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Pressable,
    ActivityIndicator,
    Text as RNText,
} from 'react-native'
import SearchBar from 'react-native-platform-searchbar'
import { Container, Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'
import { getTeachers } from '../../redux/action'
import { getSubject } from '../../redux/action/subjectPageAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'
import I18n from 'i18n-js'

const Teachers = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState()
    const route = useRoute()
    const [isLoading, setIsLoading] = useState('')
    // const { level } = route.params;
    // const data = useAppSelector((state)=> console.log(state, 'hello'));
    const {
        teachersPage,
        app: { loading },
    } = useAppSelector((state) => state)
    const teachersData = teachersPage?.teachersData
    useEffect(() => {
        const res = dispatch(getTeachers())
        console.log('res', res)
    }, [dispatch])

    const navigateSubjectsDetails = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )
    const searchFilteredData = searchText
        ? teachersData?.data.filter((x) =>
              x.first_name.toLowerCase().includes(searchText.toLowerCase())
          )
        : teachersData?.data

    const fetchTeachers = async () => {
        console.log('here to fetch')
        setIsLoading(true)
        dispatch(getTeachers())
        // console.log('res', res)
        // if (res.requestId.length > 0) {
        setIsLoading(false)
        // }
    }
    const navigateTeachersProfile = useCallback(
        (item) => {
            navigation.navigate('TeacherProfile', {
                item,
                title: `${item?.first_name} ${item?.last_name}`,
            })
        },
        [navigation]
    )

    const renderFooter = () => {
        return (
            <View
                style={{
                    marginBottom: heightp(60),
                }}
            >
                <View style={styles.footer}>
                    <Pressable
                        activeOpacity={0.9}
                        onPress={() => {
                            fetchTeachers()
                        }}
                        style={styles.loadMoreBtn}
                    >
                        <RNText style={styles.btnText}>
                            {isLoading ? 'Loading...' : 'Load More'}
                        </RNText>
                        {isLoading ? (
                            <ActivityIndicator
                                color="white"
                                size="small"
                                style={{ marginLeft: 8 }}
                            />
                        ) : null}
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <Container>
            <View style={{ marginBottom: 15 }}>
                <SearchBar
                    placeholder={I18n.t('SearchTeachers')}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    style={styles.searchBar}
                />
            </View>
            <View style={styles.containerFlex}>
                <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={() => <Text text={I18n.t('NoData')} />}
                    ListFooterComponent={renderFooter}
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <>
                            {/* <>{console.log(item)}</> */}
                            <TeachersDetailCard
                                // subjectDetails
                                viewProfile={() =>
                                    navigateTeachersProfile(item)
                                }
                                pressed={() => navigateSubjectsDetails(item)}
                                city={item?.city?.name}
                                gender={item?.gender}
                                rates_count={item?.rates_count}
                                ratings={
                                    item?.rate === 0
                                        ? null
                                        : item?.rate
                                }
                                uri={`${IMAGEURL}/${item?.image}`}
                                contents={`${item?.first_name} ${item?.last_name}`}
                            />
                        </>
                    )}
                />
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    flatlistContent: {
        flexGrow: 1,
    },
    containerFlex: {
        marginBottom: heightp(20),
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

export default Teachers
