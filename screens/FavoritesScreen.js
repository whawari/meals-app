import React from "react";

import { MEALS, CATEGORIES } from "../data/dummy-data";

import MealList from "../components/MealList";

const FavoritesScreen = (props) => {
  const displayFavoriteMeals = MEALS.filter(
    (meal) => meal.id === "m1" || meal.id === "m2"
  );

  const navigateToCategory = (item) => {
    props.navigation.navigate("Meal Detail", {
      meal: item,
      category: CATEGORIES[0],
    });
  };

  return (
    <MealList
      listData={displayFavoriteMeals}
      navigateToCategory={navigateToCategory}
      category={CATEGORIES[0]}
    />
  );
};

export default FavoritesScreen;
