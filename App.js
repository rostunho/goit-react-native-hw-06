import { useCallback } from "react";
import { Provider } from "react-redux";
import { useRoute } from "./src/router";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-get-random-values";

export default function App() {
  const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
