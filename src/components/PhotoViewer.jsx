import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import CameraView from "./CameraView";
import PhotoPreview from "./PhotoPreview";
import Notification from "./Notification";

export default function PhotoViewer({ setPhoto, photo, focused }) {
  const [picture, setPicture] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasLibraryPermission, setHasLibraryPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    setPicture(photo);
  }, [photo]);

  useEffect(() => {
    setPhoto(picture);
  }, [picture]);

  useEffect(() => {
    (async () => {
      try {
        const camera = await Camera.requestCameraPermissionsAsync();
        if (!camera.granted) {
          setErrorMessage("Access to Camera denied");
        }
        setHasCameraPermission(camera.status === "granted");
      } catch (error) {
        return Alert.alert(error.message);
      }

      try {
        const library = await MediaLibrary.requestPermissionsAsync();
        if (!library.granted) {
          setErrorMessage("Access to Media Library denied");
        }
        setHasLibraryPermission(library.status === "granted");
      } catch (error) {
        return Alert.alert(error.message);
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const photoFromLibrary = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (photoFromLibrary.canceled) {
        return Alert.alert("Photo uploading failed or canceled");
      }
      setPicture(photoFromLibrary.assets[0]);
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  const onPressTrigger = async () => {
    const photo = await __makePhoto();
    await __savePhoto(photo);
  };

  const clearPreview = async () => {
    setPicture(null);
  };

  const __makePhoto = async () => {
    if (!hasCameraPermission) {
      return Alert.alert(errorMessage);
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        scale: 1,
      });
      setPicture(photo);
      return photo;
    } catch (error) {
      return error.message;
    }
  };

  const __savePhoto = async (photo = picture) => {
    if (!hasLibraryPermission) {
      return Alert.alert(errorMessage);
    }

    try {
      const savedPhoto = await MediaLibrary.createAssetAsync(photo.uri);
      return savedPhoto;
    } catch (error) {
      return error.message;
    }
  };

  return (
    <>
      {/* <Button title="CHECK PERMISSIONS" onPress={checkPermissions} /> */}
      <View style={styles.container}>
        <View style={styles.cameraBox}>
          {picture ? (
            <PhotoPreview
              source={{ uri: picture.uri }}
              onPress={clearPreview}
            />
          ) : hasCameraPermission ? (
            <CameraView
              ref={cameraRef}
              onPress={onPressTrigger}
              focused={focused}
            />
          ) : (
            <Notification message={errorMessage} />
          )}
        </View>
        <TouchableOpacity style={styles.textWrapper} onPress={pickImage}>
          <Text style={styles.text}>
            {!picture ? "Upload photo" : "Edit photo"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  cameraBox: {
    width: Dimensions.get("window").width - 32,
    height: (Dimensions.get("window").width - 32) / 1.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(232, 232, 232)",
    overflow: "hidden",
  },
  textWrapper: {
    width: "100%",
    alignItems: "flex-start",
    paddingTop: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});
