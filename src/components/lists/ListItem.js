import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from "react-native";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../../helpers/colors";
export default function ListItem({
  title,
  subTitle,
  otherText,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.gray} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} require={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
            {otherText && (
              <Text style={styles.otherText} numberOfLines={2}>
                {otherText}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.primary}
            name="chevron-left"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Cairo-Regular",
    paddingVertical: 10,
  },
  otherText: {
    color: colors.black,
    fontSize: 12,
    fontFamily: "Cairo-Regular",
  },
  title: {
    fontSize: 16,
    fontFamily: "Cairo-Regular",
  },
});