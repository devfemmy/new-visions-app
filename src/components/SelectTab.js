/* eslint-disable react/prop-types */
import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import colors from '../helpers/colors';
import { heightp } from '../utils/responsiveDesign';
import { Text } from './common';

const SelectTab = ({
  session1,
  session2,
  header1,
  header2,
  eventActive,
  pressed,
}) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      marginBottom: heightp(20)
    },
    buttonStyle: {
      width: '50%',
      borderColor: 'transparent',
      backgroundColor: eventActive ? colors.primary : '#EFEFEF',
      borderBottomColor: 'transparent',
      borderRadius: 50,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    userbuttonStyle: {
      width: '50%',
      borderColor: 'transparent',
      backgroundColor: !eventActive ? colors.primary : '#EFEFEF',
      borderBottomColor: 'transparent',
      borderRadius: 50,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    textStyle: {
      color: !eventActive ? '#CBCBCB' : colors.white,
      fontWeight: 'bold',
      fontSize: heightp(13)
    },
    textStyle2: {
      color: eventActive ? '#CBCBCB' : colors.white,
      fontWeight: 'bold',
      fontSize: heightp(13)
    },
  });
  const userNameChildren = () => <Text text={header1} style={styles.textStyle2} />
  const eventChildren = () => <Text  text={header2} style={styles.textStyle} />
  return (
    <>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{
            ...styles.userbuttonStyle,
          }}
          onPress={pressed}
        >
          {userNameChildren}
        </Pressable>
        <Pressable
          style={{
            ...styles.buttonStyle,
          }}
          onPress={pressed}
        >
          {eventChildren}
        </Pressable>
      </View>
      <View>{eventActive ? session1 : session2}</View>
    </>
  );
};

export default SelectTab;
