import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        meal={itemData.item}
        category={props.category}
        onMealSelect={props.navigateToCategory.bind(this, itemData.item)}
      />
    );
  };

  return <FlatList data={props.listData} renderItem={renderMealItem} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MealList;
