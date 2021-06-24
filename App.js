import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import mealsReducer from "./store/reducers/meals";

import MainNavigator from "./navigation/MainNavigator";

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  Font.loadAsync({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setIsFontLoaded(true);
        }}
        onError={() => {
          console.log("Could not load font");
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <OverflowMenuProvider>
          <MainNavigator />
        </OverflowMenuProvider>
      </NavigationContainer>
    </Provider>
  );
}
