/* eslint-disable react/prop-types */
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { heightp } from '../utils/responsiveDesign';
import { Text } from './common';

const IconText = ({text, children, textColor}) => {
  const styles = StyleSheet.create({
    text: {
      marginLeft: heightp(5),
      color: textColor,
      fontSize: heightp(16),
      fontWeight: 'bold'
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return (
    <View style={{marginBottom: heightp(2)}}>
      <View style={styles.rowCenter}>
        {children}
        <Text fontSize={heightp(13)} style={styles.text} text={text} />
      </View>
    </View>
  );
};

export default IconText;
