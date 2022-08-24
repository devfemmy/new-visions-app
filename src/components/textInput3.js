import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import defaultStyles from "../helpers/styles";
import colors from "../helpers/colors";

function AppTextInput({
  labelName,
  icon,
  width = "100%",
  AntDesignIcon,
  ...otherProps
}) {
  return (
    <View>
      <Text style={styles.label}>{labelName}</Text>
      <View style={[styles.container, { width }]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultStyles.colors.black}
            style={styles.icon}
          />
        )}
        {AntDesignIcon && (
          <AntDesign
            name={AntDesignIcon}
            size={20}
            color={defaultStyles.colors.black}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={defaultStyles.colors.black}
          style={defaultStyles.text}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    color: colors.black,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    color: colors.grey,
    textAlign: "left",
    paddingLeft: 15,
    fontSize: 12,
    fontFamily: "Cairo-Regular",
    marginTop: 15,
  },
});

export default AppTextInput;
