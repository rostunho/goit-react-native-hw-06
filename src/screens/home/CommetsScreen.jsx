import { View, Text, StyleSheet } from "react-native";

export default function CommetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>COMMETS SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
