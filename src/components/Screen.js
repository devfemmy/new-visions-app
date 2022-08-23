import React, {useContext} from 'react';
//import Constants from "expo-constants";
import {StyleSheet, SafeAreaView, View} from 'react-native';
import colors from '../helpers/colors';
import {AppContext} from '../context/AppState';
import Lottie from './Lottie';
import Toast from 'react-native-toast-message';
function Screen({children, style}) {
  const {loadingSpinner} = useContext(AppContext);
  const sourceLot = require('../assets/Lottie/rotating-dots-preloader.json');
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {!loadingSpinner && <View style={[styles.view, style]}>{children}</View>}
      {loadingSpinner && <Lottie fileSource={sourceLot} />}
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  view: {
    flex: 1,
    backgroundColor: colors.gray,
  },
});

export default Screen;
