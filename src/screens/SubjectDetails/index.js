/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, LogBox, StyleSheet, View } from 'react-native'
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

LogBox.ignoreAllLogs()
const SubjectDetails = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const route = useRoute()
    const { level } = route.params
    // const data = useAppSelector((state)=> console.log(state, 'hello'));
    const { subject } = useAppSelector((state) => state.subPage)
    const [searchText, setSearchText] = useState()
    const subjectData = subject?.data
    useEffect(() => {
        const payload = {
            level,
        }
        dispatch(getSubject(payload))
    }, [dispatch, level])

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

    return (
        <Container>
            {/* <Loader visible={loading} />  */}
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

export default SubjectDetails
