import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import React,{useEffect} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import i18n from "i18n-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Text } from '../../components/common';
import { globalStyles } from '../../helpers/globalStyles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getHomePage } from '../../redux/action';
import { heightp } from '../../utils/responsiveDesign';
import HeaderTitle from '../../components/common/HeaderTitle';
import StageCard from '../../components/StageCard';
import TeachersCard from '../../components/TeachersCard';
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions';
import HomePageService from '../../services/userServices';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch()
  const data = useAppSelector((state)=> state.homePage);
  const packagesArray = data?.homeData?.multi_packages;
  const stagesArray = data?.homeData?.stages;
  const teachersArray = data?.homeData?.teachers;  

  useEffect(() => {
    dispatch(getHomePage())
    // Send Notification Token

    async function postNotificationToken() {
      const fcmtoken = await AsyncStorage.getItem("fcmtoken");
      const payload = {
        token: fcmtoken
      }
      try {
        const res = await HomePageService.postNotificationData(payload);
        return res;
      } catch (err) {
        console.log(err, 'error');
      } 
    }
    postNotificationToken();
  }, [dispatch])
  return (
    (
        <Container>
          <HeaderTitle text={i18n.t('MultiPackages')} />
          <View style={styles.containerFlex}>
            <FlatList
              horizontal
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.flatlistContent}
              ListEmptyComponent={() => <Text text="No Data" />}
              data={packagesArray}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                const uri = `${IMAGEURL}/${item.image}`
                return (
                  <FastImage
                  style={{width: heightp(210), height: heightp(130), borderRadius: 10, marginRight: heightp(20)}}
                  source={{
                    uri,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
            )}}
            />
          </View>
          <View style={globalStyles.horizontal} />
          <HeaderTitle pressed={() => navigation.navigate('Subjects')} text={i18n.t('EducationalLevel')} />
          <View style={styles.containerFlex}>
            <FlatList
              horizontal
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.flatlistContent}
              ListEmptyComponent={() => <Text text="No Data" />}
              data={stagesArray}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                const uri = `${IMAGEURL2}${item.image}`;
               return (
                  <StageCard uri={uri} text={item.name} />
            )
              }}
            />
          </View>
          <View style={globalStyles.horizontal} />
          <HeaderTitle pressed={() => navigation.navigate('Teachers')} text={i18n.t('Teachers')} />
          <View style={styles.containerFlex}>
            <FlatList
              horizontal
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.flatlistContent}
              ListEmptyComponent={() => <Text text="No Data" />}
              data={teachersArray}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                const uri = `${IMAGEURL}/${item.image}`
                return               (
                  <TeachersCard uri={uri} lastName={item.last_name} text={item.first_name} />
            )
              }
          }
            />
          </View>
        </Container>
    )
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

export default Home;