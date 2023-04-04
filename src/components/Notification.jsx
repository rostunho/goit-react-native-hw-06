import { View, Text, StyleSheet } from "react-native";

export default function Notification({ message }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "#000",
  },
});
