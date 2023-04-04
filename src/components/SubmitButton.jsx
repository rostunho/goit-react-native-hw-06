import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function SubmitButton({ onSubmit, text, style }) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...style }}
      activeOpacity={0.75}
      onPress={onSubmit}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
});
