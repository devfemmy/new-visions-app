import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../helpers/colors";

function AppButton({ title, onPress, color = "dark" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    width: "80%",
    borderRadius: 40,
    height: 50,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Cairo-Regular",
  },
});

export default AppButton;
