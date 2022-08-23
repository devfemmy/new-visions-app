/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from "i18n-js";
import ArrowIcon from '../../assets/img/arrow.svg';
import { Text } from './Text';
import { globalStyles } from '../../helpers/globalStyles';
import colors from '../../helpers/colors';
import { heightp } from '../../utils/responsiveDesign';


const HeaderTitle = ({text, icon, pressed}) => {
  return (
    <View style={[globalStyles.rowBetween, styles.centered]}>
      <Text style={styles.headerText} fontSize={heightp(13)} text={text} />
      <View style={[globalStyles.rowCenter, styles.lowerBox]}>
        <Text onPress={pressed} style={styles.text}  fontSize={heightp(13)} text={i18n.t('SeeAll')} />
        <ArrowIcon width={15} height={15}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    alignItems: 'flex-end',
  },
  headerText: {
    fontWeight: 'bold'
  },
  logo: {
    width: heightp(120),
    height: heightp(50),
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
    marginVertical: heightp(10),
  },
  liveLogo: {
    width: heightp(40),
    height: heightp(40),
    resizeMode: 'contain',
  },
  text: {
    marginRight: heightp(5),
    fontSize: heightp(15)
  },
  lowerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HeaderTitle;
