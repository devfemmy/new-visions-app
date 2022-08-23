import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

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
    <View style={{flex:1, marginVertical:10}}>
      <View style={styles.inputLbl}>
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
        <Text style={styles.label}>{labelName}</Text>
        </View>
      <View style={[styles.container]}>
        
        <TextInput
          placeholderTextColor={defaultStyles.colors.black}
          style={styles.text}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor:colors.white,
    borderRadius:40,
    height:40,
    color: colors.black,
    width:'100%'
  },text: {
    color: colors.black,
    fontSize: 18,
    fontFamily: "Cairo-Regular",
    width:'95%',
    height:40,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Cairo-Regular",
  },
  inputLbl:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:5
    
  }
});

export default AppTextInput;
