import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { GoBackIcon } from "../../assets/custom-icons";
import DefaultScreen from "./DefaultScreen";
import CommetsScreen from "./CommetsScreen";
import MapScreen from "./MapScreen";

const HomeStack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitle,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerLeft: () => {
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => navigation.navigate("Posts")}
            >
              <GoBackIcon />
            </TouchableOpacity>
          );
        },
      }}
    >
      <HomeStack.Screen
        name="Default"
        options={{ headerShown: false }}
        component={DefaultScreen}
      />
      <HomeStack.Screen name="Comments" component={CommetsScreen} />
      <HomeStack.Screen name="Map" component={MapScreen} />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(179,179,179)",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "500",
  },
});
