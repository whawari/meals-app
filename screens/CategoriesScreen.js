import React from "react";
import { FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";

import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
  const navigateToCategory = (item) => {
    props.navigation.navigate("Category Meals", {
      category: item,
    });
  };

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        category={itemData.item}
        onCategorySelect={navigateToCategory.bind(this, itemData.item)}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

export default CategoriesScreen;
