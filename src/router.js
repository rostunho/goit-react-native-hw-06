import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/home/HomeScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
    </AuthStack.Navigator>
  );
};
