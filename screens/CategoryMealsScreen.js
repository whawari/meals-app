import React from "react";

import { MEALS } from "../data/dummy-data";

import MealList from "../components/MealList";

const CategoryMeal = (props) => {
  const { category } = props.route.params;

  const displayMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(category.id) >= 0
  );

  const navigateToCategory = (item) => {
    props.navigation.navigate("Meal Detail", {
      meal: item,
      category: category,
    });
  };

  return (
    <MealList
      listData={displayMeals}
      navigateToCategory={navigateToCategory}
      category={category}
    />
  );
};

export default CategoryMeal;
