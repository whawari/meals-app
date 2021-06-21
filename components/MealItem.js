import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import COLORS from "../constants/COLORS";

const getScreenHeight = () => {
  return Dimensions.get("window").height;
};

const MealItem = (props) => {
  const [height, setHeight] = useState(getScreenHeight());

  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setHeight(getScreenHeight());
    });

    return () => {
      Dimensions.removeEventListener("change");
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        ...styles.mealItem,
        height: height / 2,
      }}
      onPress={props.onMealSelect}
    >
      <View style={styles.mealHeader}>
        <ImageBackground
          source={{ uri: props.meal.imageUrl }}
          style={styles.backgroundImage}
        >
          <Text style={styles.title}>{props.meal.title}</Text>
        </ImageBackground>
      </View>

      <View
        style={{
          ...styles.mealDetails,
          backgroundColor: props.category.color,
        }}
      >
        <View style={styles.detailBox}>
          <Text style={styles.detail}>{props.meal.duration + "m"}</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detail}>{props.meal.complexity}</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detail}>{props.meal.affordability}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    flex: 1,
    margin: 12,
    borderRadius: 10,
    overflow: "hidden",
  },
  mealHeader: {
    height: "80%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    backgroundColor: COLORS.black + "50",
    padding: 12,
    textAlign: "center",
    fontSize: 18,
    color: COLORS.white,
  },
  mealDetails: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  detailBox: {
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  detail: {
    fontSize: 18,
    color: COLORS.white,
    textTransform: "capitalize",
  },
});

export default MealItem;
