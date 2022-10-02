import React from "react";
// import LottieView from "lottie-react-native";
import { StyleSheet, View, Platform, ActivityIndicator } from "react-native";
import colors from "../helpers/colors";
import { WINDOW_HEIGHT } from "../helpers/common";

//const heightSB = Platform.OS == "ios" ? 50 : 20;

function Lottie({ fileSource }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContent}>
        <ActivityIndicator size="large" 
        animating
        color={colors.primary} />
        {/* <LottieView source={fileSource} autoPlay loop /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: WINDOW_HEIGHT,
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  innerContent: {
    alignSelf: "center",
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Lottie;
