import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";

import MealList from "../components/MealList";

const FavoritesScreen = (props) => {
  const meals = useSelector((state) => state.meals.favoriteMeals);

  const navigateToCategory = (item) => {
    props.navigation.navigate("Meal Detail", {
      meal: item,
      category: CATEGORIES[0],
    });
  };

  if (meals.length === 0 || !meals) {
    return (
      <View style={styles.content}>
        <Text>No favorite meals found. Start adding some!</Text>
      </View>
    );
  }

  return (
    <MealList
      listData={meals}
      navigateToCategory={navigateToCategory}
      category={CATEGORIES[0]}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
