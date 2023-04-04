import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import SubmitButton from "./SubmitButton";

export default function AuthButtons({
  text,
  secondaryText,
  style,
  onSubmit,
  onRedirect,
}) {
  return (
    <View style={style}>
      <View style={styles.container}>
        <SubmitButton onSubmit={onSubmit} text={text} />
      </View>
      <View style={styles.secondaryView}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.75}
          onPress={onRedirect}
        >
          <Text style={styles.secondaryText}>{secondaryText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  secondaryView: {
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
