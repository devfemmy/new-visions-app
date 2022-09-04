/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
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
    // const { level } = route.params;
    // const data = useAppSelector((state)=> console.log(state, 'hello'));
    const {
        teachersPage,
        app: { loading },
    } = useAppSelector((state) => state)
    const teachersData = teachersPage?.teachersData
    useEffect(() => {
        dispatch(getTeachers())
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
                    data={searchFilteredData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <TeachersDetailCard
                            pressed={() => navigateSubjectsDetails(item)}
                            city={item?.city?.name}
                            gender={item?.gender}
                            ratings={item?.avg_rating.length === 0 ? null : item?.avg_rating[0].rateAVG}
                            uri={`${IMAGEURL}/${item?.image}`}
                            contents={`${item?.first_name} ${item?.last_name}`}
                        />
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
})

export default Teachers
