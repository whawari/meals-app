import React from "react";
import { useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

import COLORS from "../constants/COLORS";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import HeaderRightButton from "../components/HeaderRightButton";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultStackScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.secondary,
  },
  headerTintColor: COLORS.white,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 24,
  },
};

const MealsStackNavigator = () => {
  const dispatch = useDispatch();
  const isCurrentMealFavorite = useSelector(
    (state) => state.meals.favoriteMeals
  );

  const toggleFavoriteMealHandler = (mealId) => {
    dispatch(toggleFavorite(mealId));
  };

  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderRightButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />

      <Stack.Screen
        name="Category Meals"
        component={CategoryMealsScreen}
        options={({ route }) => ({
          title: route.params.category.title,
          headerStyle: {
            backgroundColor: route.params.category.color,
          },
        })}
      />

      <Stack.Screen
        name="Meal Detail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.meal.title,
          headerStyle: {
            backgroundColor: route.params.category.color,
          },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderRightButton}>
              <Item
                title="Favorite"
                iconName={
                  isCurrentMealFavorite.some(
                    (meal) => meal.id === route.params.meal.id
                  )
                    ? "ios-star"
                    : "ios-star-outline"
                }
                onPress={() => {
                  toggleFavoriteMealHandler(route.params.meal.id);
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const FavoritesStackNavigator = () => {
  const dispatch = useDispatch();
  const isCurrentMealFavorite = useSelector(
    (state) => state.meals.favoriteMeals
  );

  const toggleFavoriteMealHandler = (mealId) => {
    dispatch(toggleFavorite(mealId));
  };

  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="Favorite Meals"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderRightButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />

      <Stack.Screen
        name="Meal Detail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.meal.title,
          headerStyle: {
            backgroundColor: route.params.category.color,
          },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderRightButton}>
              <Item
                title="Favorite"
                iconName={
                  isCurrentMealFavorite.some(
                    (meal) => meal.id === route.params.meal.id
                  )
                    ? "ios-star"
                    : "ios-star-outline"
                }
                onPress={() => {
                  toggleFavoriteMealHandler(route.params.meal.id);
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const MealsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === "Meals") {
            iconName = focused ? "ios-restaurant" : "ios-restaurant-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "ios-star" : "ios-star-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.secondary,
        inactiveTintColor: COLORS.black + "40",
      }}
    >
      <Tab.Screen name="Meals" component={MealsStackNavigator} />

      <Tab.Screen name="Favorites" component={FavoritesStackNavigator} />
    </Tab.Navigator>
  );
};

const FiltersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderRightButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderRightButton}>
              <Item
                title="Save"
                iconName="ios-save"
                onPress={() => {
                  route.params.save();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      drawerType={isLargeScreen ? "permanent" : "front"}
      // drawerStyle={isLargeScreen ? null : { width: "100%" }}
    >
      <Drawer.Screen name="Meals/Fav" component={MealsNavigator} />

      <Drawer.Screen name="Filter Meals" component={FiltersStackNavigator} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
