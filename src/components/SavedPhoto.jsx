import { StyleSheet, View, Image, Dimensions } from "react-native";

export default function SavedPhoto({ source }) {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 32,
    height: ((Dimensions.get("window").width - 32) * 9) / 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 9) / 16,
    resizeMode: "cover",
    alignSelf: "center",
  },
});
