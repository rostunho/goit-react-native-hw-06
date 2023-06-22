import { useCallback } from "react";
import { Provider } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-get-random-values";
import { store } from "./src/redux/store";
import { roboto } from "./src/assets/fonts/fonts";
import Main from "./src/components/Main";

export default function App() {
  const [fontsLoaded] = useFonts(roboto);

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
        <ActivityIndicator size="large" color="#FF6C00" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
