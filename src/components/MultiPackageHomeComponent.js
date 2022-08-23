import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';

import {Card} from 'react-native-paper';

import {useTranslation} from 'react-i18next';

function MultiPackageHomeComp({
  navigations,
  PPrice,
  PNumStudents,
  PId,
  PImage,
}) {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Card>
          <Card.Cover
            style={{height: 140, resizeMode: 'contain'}}
            source={{uri: `https://www.newvisions.sa/storage/${PImage}`}}
            // source={require('../../assets/multi.jpg')}
          />
        </Card>
      </View>
      <View style={lang === 'ar' ? styles.cardAr : styles.card}>
        <View style={styles.labels}>
          {/* <View style={styles.label}>
            <Text numberOfLines={1} style={styles.text}>
              {PName}
            </Text>
          </View> */}
          <View style={lang === 'ar' ? styles.labelAr : styles.label}>
            <Icon size={16} name="users" color="white" type="font-awesome-5" />
            <Text numberOfLines={1} style={styles.text}>
              {'  '}
              {PNumStudents} {t('Students')}
            </Text>
          </View>
          <View style={lang === 'ar' ? styles.labelAr : styles.label}>
            <Icon size={16} color="white" name="tag" type="font-awesome-5" />
            <Text
              style={{
                color: 'yellowgreen',
                fontFamily: 'Tajawal-Medium',
                fontSize: 18,
              }}>
              {'  '}
              {PPrice} {t('SAR')}
            </Text>
          </View>
        </View>
        <View style={lang === 'ar' ? styles.joinbtnAr : styles.joinbtn}>
          <TouchableOpacity
            style={lang === 'ar' ? styles.touchbtnAr : styles.touchbtn}>
            <Text
              onPress={() => {
                navigations.navigate('MultiPackageDetails', {
                  id: PId,
                  price: PPrice,
                });
              }}
              style={{fontFamily: 'Tajawal-Medium', fontSize: 16}}>
              {t('Join')}
            </Text>
            <Icon
              style={{marginLeft: 5}}
              size={14}
              type="font-awesome"
              name="arrow-right"
              color="yellowgreen"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 15,
  },
  joinbtn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  joinbtnAr: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginHorizontal: 15,
    flexDirection: 'row-reverse',
  },
  labels: {
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    backgroundColor: 'rgb(67,72,84)',
    flexDirection: 'row',
    borderRadius: 10,
    height: '30%',
    paddingVertical: 5,
  },
  cardAr: {
    backgroundColor: 'rgb(67,72,84)',
    flexDirection: 'row-reverse',
    borderRadius: 10,
    height: '30%',
    paddingVertical: 5,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelAr: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginRight: 5,
    paddingRight: 5,
  },
  touchbtn: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  touchbtnAr: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Tajawal-Medium',
  },
});

export default MultiPackageHomeComp;
