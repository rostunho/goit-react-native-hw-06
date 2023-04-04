import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { MakePhotoIcon } from "../assets/custom-icons";

export default function PhotoPreview({ source, onPress }) {
  return (
    <View style={styles.preview}>
      <Image source={source} style={styles.picture} />
      <TouchableOpacity style={styles.icon} onPress={onPress}>
        <MakePhotoIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    height: "100%",
    width: "100%",
  },
  picture: {
    flex: 1,
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
