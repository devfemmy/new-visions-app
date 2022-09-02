/* eslint-disable react/no-children-prop */
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Text } from '../../components/common'
import IconText from '../../components/IconText';
import colors from '../../helpers/colors';
import { globalStyles } from '../../helpers/globalStyles';
import HomePageService from '../../services/userServices';
import { IMAGEURL, IMAGEURL2 } from '../../utils/functions';
import { heightp } from '../../utils/responsiveDesign';



const TeacherProfile = () => {
  const route = useRoute();
  const {item} = route.params;
  const [teachersData, setTeachersData] = useState({})
  useEffect(() => {
    // get Notification
    async function getTeacherProfile() {
      // setLoading(true)
      const payload = {
        teacher_id: item?.id,
      }
      try {
        const res = await HomePageService.getTeacherProfile(payload)
        const data = res?.data;
        // setLoading(false)
        console.log(data, 'profile'); 
        setTeachersData(data)    
        return res;
      } catch (err) {
        // setLoading(false)
      } 
    }
    getTeacherProfile();
  }, [item?.id])
  const uri = `${IMAGEURL}/${teachersData?.image}`
  console.log('uri', uri)
  return (
    <Container>
      <View style={[styles.container, globalStyles.rowBetween]}>
          <FastImage
            style={{width: heightp(70), height: heightp(70), borderRadius: 10, marginRight: heightp(20)}}
            source={{
              uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.widthContainer}>
              <View>
                <Text style={styles.name} text={teachersData?.first_name &&`${teachersData?.first_name} ${teachersData?.last_name}`} />
                <IconText textColor={colors.white} text={teachersData?.city?.name &&teachersData?.city?.name} 
                  children={<Ionicons name="ios-home" size={25} color={colors.white} />} />
              </View>
          </View>

      </View>
      <View style={styles.borderContainer}>
        <Text style={styles.header} text="Explanation of the teachers experience" />
        <Text style={styles.text} text="No Data Present at the moment" />
      </View>
      <View style={styles.borderContainer}>
        <Text style={styles.header} text="Ratings and Comments" />
        <Text style={styles.text} text="No Ratings Present at the moment" />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: heightp(90),
    backgroundColor: colors.primary,
    marginVertical: 20,
    borderRadius: 10,
    paddingHorizontal: heightp(15)
  },
  widthContainer: {
    width: '80%'
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: heightp(18)
  },
  header: {
    fontWeight: 'bold',
    fontSize: heightp(16)
  },
  borderContainer: {
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1,
    minHeight: heightp(120),
    marginVertical: heightp(20)
  },
  text: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: heightp(20)
  }
})

export default TeacherProfile;