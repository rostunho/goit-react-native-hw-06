import { useState, useCallback } from "react";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-get-random-values";
import { useRoute } from "./src/router";
import { store } from "./src/redux/store";
import { roboto } from "./src/assets/fonts/fonts";
// import db from "./src/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Main from "./src/components/Main";

export default function App() {
  const [fontsLoaded] = useFonts(roboto);
  // inspect later
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onLayout={onLayoutRootView}
      >
        <Text>...Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
