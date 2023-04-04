import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function ScreenWrapper({
  children,
  keyboardVerticalOffset,
  onPress,
}) {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.avoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.imageBg}
            source={require("../assets/images/photo-bg.jpg")}
          >
            {children}
            <View />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "flex-end",
  },
});
