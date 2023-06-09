import { useState } from "react";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, Keyboard, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "../../firebase/operations";
import Spinner from "react-native-loading-spinner-overlay";
import { useKeyboard } from "../../assets/hooks/useKeyboard";
import ScreenWrapper from "../../components/ScreenWrapper";
import Avatar from "../../components/Avatar";
import AuthInput from "../../components/AuthInput";
import AuthButtons from "../../components/AuthButtons";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useKeyboard(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setShowSpinner(true);
    const avatarUrl = await uploadPhoto(avatar);

    await dispatch(
      authSignUpUser({
        login: login,
        email: email,
        password: password,
        avatar: avatarUrl,
      })
    );
    setShowSpinner(false);
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatar(null);
    setIsKeyboardVisible(false);
  };

  const onOutputPress = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const pickAvatar = async () => {
    try {
      const photoFromLibrary = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (photoFromLibrary.canceled) {
        return Alert.alert("Avatar uploading failed or canceled");
      }
      setAvatar(photoFromLibrary.assets[0].uri);
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  return (
    <ScreenWrapper keyboardVerticalOffset={-330} onPress={onOutputPress}>
      <Spinner visible={showSpinner} />
      <View
        style={{
          ...styles.container,
          paddingBottom: isKeyboardVisible ? 330 : 78,
        }}
      >
        <Avatar large add source={{ uri: avatar }} onPress={pickAvatar} />
        <Text style={styles.title}>Registration</Text>
        <View style={styles.form}>
          <AuthInput
            placeholder="Login"
            value={login}
            autoCapitalize="words"
            onFocus={() => setIsKeyboardVisible(true)}
            onSubmitEditing={() => setIsKeyboardVisible(false)}
            onChangeText={(value) => setLogin(value)}
          />
          <AuthInput
            placeholder="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
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
