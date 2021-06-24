import { MEALS } from "../../data/dummy-data";

import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

// state is the current/old state
// initialState is assigned to state as a default value
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const mealIndex = getMealIndex(state.favoriteMeals, action.mealId);

      if (mealIndex >= 0) {
        const updatedFavoriteMeals = [...state.favoriteMeals];
        updatedFavoriteMeals.splice(mealIndex, 1);

        return {
          ...state,
          favoriteMeals: updatedFavoriteMeals,
        };
      }

      return {
        ...state,
        favoriteMeals: addMealToFavorites(
          state.meals,
          state.favoriteMeals,
          action.mealId
        ),
      };
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.isVegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.isVegan && !meal.isVegan) {
          return false;
        }

        return true;
      });

      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

const getMealIndex = (favoriteMeals, mealId) => {
  return favoriteMeals.findIndex((meal) => meal.id === mealId);
};

const addMealToFavorites = (meals, favoriteMeals, mealId) => {
  const meal = meals.find((meal) => meal.id === mealId);

  return favoriteMeals.concat(meal);
};

export default mealsReducer;
