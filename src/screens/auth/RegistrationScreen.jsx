import { useState } from "react";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Avatar from "../../components/Avatar";
import AuthInput from "../../components/AuthInput";
import AuthButtons from "../../components/AuthButtons";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      authSignUpUser({ login: login, email: email, password: password })
    );
    setLogin("");
    setEmail("");
    setPassword("");
    setIsKeyboardVisible(false);
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
          paddingBottom: isKeyboardVisible ? 330 : 78,
        }}
      >
        <Avatar large />
        <Text style={styles.title}>Registration</Text>
        <View style={styles.form}>
          <AuthInput
            placeholder="Login"
            value={login}
            onFocus={() => setIsKeyboardVisible(true)}
            onSubmitEditing={() => setIsKeyboardVisible(false)}
            onChangeText={(value) => setLogin(value)}
          />
          <AuthInput
            placeholder="Email"
            value={email}
            onFocus={() => setIsKeyboardVisible(true)}
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
              text="Register"
              secondaryText="Already have an account? Log In ?"
              onSubmit={handleSubmit}
              onRedirect={() => navigation.navigate("Login")}
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
