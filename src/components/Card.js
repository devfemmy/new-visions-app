import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import colors from "../helpers/colors";

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Card({ title, subTitle, image }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <View style={{ flex: 4 }}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={50}
            color={colors.green}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 5,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.white,
  },
  detailsContainer: {
    padding: 10,
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
