import { forwardRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import { MakePhotoIcon } from "../assets/custom-icons";

const CameraView = forwardRef((props, ref) => {
  return (
    props.focused && (
      <View style={styles.container}>
        <Camera style={styles.camera} ref={ref} ratio="1:1" zoom={0}>
          <TouchableOpacity onPress={props.onPress}>
            <MakePhotoIcon />
          </TouchableOpacity>
        </Camera>
      </View>
    )
  );
});

export default CameraView;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: "150%",
    width: "100%",
    objectFit: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
