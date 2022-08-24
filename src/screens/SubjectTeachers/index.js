/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState} from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import SearchBar from 'react-native-platform-searchbar';
import { Container, Text } from '../../components/common'
import TeachersDetailCard from '../../components/TeachersDetail'
import { getSubjectTeachers} from '../../redux/action'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { IMAGEURL } from '../../utils/functions'
import { heightp } from '../../utils/responsiveDesign'

const SubjectTeachers = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState();
  const route = useRoute();
  const { subject_id } = route.params;
  const {subjectTeachersPage, app: {loading}} = useAppSelector((state)=> state);
  const subjectTeachersData = subjectTeachersPage?.subjectTeachersData;

  useEffect(() => {
    const payload = {
      subject_id: "2",
    }
    dispatch(getSubjectTeachers(payload))
  },[dispatch, subject_id]);

  const navigateFullSubscription = useCallback((item) => {
    // const {id, title, image} = item;
    // const uri = `${IMAGEURL}/${image}`
    // if (id)
      navigation.navigate('FullLesson', {
        subject_id,
      });
  }, [navigation, subject_id]);
  const searchFilteredData = searchText
  ? subjectTeachersData?.filter((x) =>
      x?.user?.first_name.toLowerCase().includes(searchText.toLowerCase()),
    )
  : subjectTeachersData;

  return (
      <Container>
        <View style={{marginBottom: 15}}>
          <SearchBar
          placeholder="Search Subject Teachers"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchBar}
          />
        </View>
        <View style={styles.containerFlex}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.flatlistContent}
              ListEmptyComponent={() => <Text text="No Data" />}
              data={searchFilteredData}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => (
                <TeachersDetailCard
                subjectDetails 
                bookCourse={navigateFullSubscription}
                title={item?.subject?.title} 
                lessonPrice={item?.lesson_price}
                numberOfStudents={item?.subject?.number_of_students} 
                uri={`${IMAGEURL}/${item?.user?.image}`} 
                contents={`${item?.user?.first_name} ${item?.user?.last_name}`} />
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
    marginBottom: heightp(20)
  }
})

export default SubjectTeachers;