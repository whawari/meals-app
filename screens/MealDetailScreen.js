import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const { meal } = props.route.params;

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text>{meal.duration + "m"}</Text>
        <Text>{meal.complexity}</Text>
        <Text>{meal.affordability}</Text>
      </View>

      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map((ingredient, index) => (
        <ListItem key={index}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {meal.steps.map((step, index) => (
        <ListItem key={index}>{index + 1 + ") " + step}</ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  details: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    padding: 12,
  },
  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default MealDetailScreen;
