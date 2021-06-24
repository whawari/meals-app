import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { useDispatch } from "react-redux";

import { setFilters } from "../store/actions/meals";
import COLORS from "../constants/COLORS";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>

      <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        trackColor={{ true: COLORS.secondary, false: COLORS.black + "40" }}
        thumbColor={COLORS.black}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree: isGlutenFree,
      isLactoseFree: isLactoseFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>

      <FilterSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onValueChange={(newValue) => setIsGlutenFree(newValue)}
      />

      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
      />

      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
      />

      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onValueChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    padding: 12,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 12,
  },
});

export default FiltersScreen;
