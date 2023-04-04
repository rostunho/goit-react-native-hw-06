import { useState } from "react";
import { Keyboard, StyleSheet, View, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import AuthInput from "../../components/AuthInput";
import AuthButtons from "../../components/AuthButtons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleSubmit = () => {
    console.log("Email :", email);
    console.log("Password :", password);
    setEmail("");
    setPassword("");
    navigation.navigate("Home", {
      screen: "Default",
      params: { screen: "Posts" },
    });
  };

  const onOutputPress = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  return (
    <ScreenWrapper keyboardVerticalOffset={-330} onPress={onOutputPress}>
      <View
        style={{
          ...styles.container,
          paddingBottom: isKeyboardVisible ? 330 : 144,
        }}
      >
        <Text style={styles.title}>Log In</Text>
        <View style={styles.form}>
          <AuthInput
            placeholder="Email"
            value={email}
            onFocus={() => {
              setIsKeyboardVisible(true);
            }}
            onSubmitEditing={() => setIsKeyboardVisible(false)}
            onChangeText={(value) => setEmail(value)}
          />
          <AuthInput
            placeholder="Password"
            secured
            value={password}
            onFocus={() => setIsKeyboardVisible(true)}
            onSubmitEditing={() => setIsKeyboardVisible(false)}
            onChangeText={(value) => setPassword(value)}
          />

          {!isKeyboardVisible && (
            <AuthButtons
              text="Log In"
              secondaryText="Don't have an account? Register?"
              style={styles.buttons}
              onSubmit={handleSubmit}
              onRedirect={() => navigation.navigate("Register")}
            />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
});
