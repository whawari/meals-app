import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";

const CategoryMeal = (props) => {
  const { category } = props.route.params;
  const meals = useSelector((state) => state.meals.filteredMeals);

  const displayMeals = meals.filter(
    (meal) => meal.categoryIds.indexOf(category.id) >= 0
  );

  const navigateToCategory = (item) => {
    props.navigation.navigate("Meal Detail", {
      meal: item,
      category: category,
    });
  };

  if (displayMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No meals found, check you filters</Text>
      </View>
    );
  }

  return (
    <MealList
      listData={displayMeals}
      navigateToCategory={navigateToCategory}
      category={category}
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

export default CategoryMeal;
