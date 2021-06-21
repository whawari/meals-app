import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import COLORS from "../constants/COLORS";

const CategoryGridTile = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ ...styles.categoryItem, backgroundColor: props.category.color }}
      onPress={props.onCategorySelect}
    >
      <View>
        <Text style={styles.title}>{props.category.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flex: 1,
    margin: 12,
    height: 150,
    shadowColor: COLORS.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 18,
    // fontFamily: "roboto-bold",
    color: COLORS.white,
  },
});

export default CategoryGridTile;
