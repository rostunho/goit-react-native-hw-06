import { StyleSheet, View } from "react-native";
import { CircleSnail } from "react-native-progress";

export default function CameraSpinner({ size, color }) {
  return (
    <View style={styles.spinner}>
      <CircleSnail size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
