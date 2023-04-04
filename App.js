import { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-get-random-values";
import { useRoute } from "./src/router";
import { store } from "./src/redux/store";
// import db from "./src/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const routing = useRoute(user);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  });
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.dir("User: ", user);
    setUser(user);
  });

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
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
