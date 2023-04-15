import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Dimensions,
  Button,
} from "react-native";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { uploadPhoto, uploadPost } from "../../firebase/operations";
import Spinner from "react-native-loading-spinner-overlay";
import { useKeyboard } from "../../assets/hooks/useKeyboard";
import { ClearFormIcon } from "../../assets/custom-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import PhotoViewer from "../../components/PhotoViewer";
import PostInput from "../../components/PostInput";
import SubmitButton from "../../components/SubmitButton";
import CameraSpinner from "../../components/CameraSpinner";

export default function CreatePostScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState("");
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [hasLocationPermision, setHasLocationPermision] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useKeyboard(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused();
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const location = await Location.requestForegroundPermissionsAsync();
        if (!location.granted) {
          Alert.alert("Permission to access location was denied");
          return;
        }
        setHasLocationPermision(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (!photo) {
      return;
    }
    (async () => {
      await detectLocation();
    })();
  }, [photo]);

  const onPublishHandler = async () => {
    if (!photo) {
      return Alert.alert("You should choose or take a photo for publication.");
    }
    if (locationTitle === "" || photoTitle === "") {
      return Alert.alert("Please fill an empty fields");
    }

    try {
      setShowOverlay(true);
      const photoUrl = await uploadPhoto(photo.uri);
      await uploadPost(photoUrl);
      navigation.navigate("Posts");
      clearForm();
      setShowOverlay(false);
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  const uploadPost = async () => {
    try {
      const photoUrl = await uploadPhoto(photo.uri);
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "posts"), {
        userId,
        login,
        photoUrl,
        photoTitle,
        location,
        locationTitle,
        country,
        city,
        createdUnix: Date.now(),
        likes: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error.message);
    }
  };

  const detectLocation = async () => {
    if (!hasLocationPermision) {
      console.log("Has not location Permisions");
      return Alert.alert(errorMessage);
    }

    const location = await Location.getCurrentPositionAsync();
    const detectedPosition = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const country = detectedPosition[0].country;
    const city = detectedPosition[0].city;

    setLocation(location);
    setCountry(country);
    setCity(city);
  };

  const onOutputPress = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const clearForm = () => {
    setPhoto(null);
    setPhotoTitle("");
    setLocationTitle("");
  };

  return (
    <ScreenWrapper keyboardVerticalOffset={() => {}} onPress={onOutputPress}>
      <View style={styles.container}>
        <View style={styles.viewerBox}>
          {showSpinner && <CameraSpinner size={70} color={"#FF6C00"} />}
          <PhotoViewer
            setPhoto={setPhoto}
            photo={photo}
            focused={isFocused}
            setShowSpinner={setShowSpinner}
            onCameraReady={() => setShowSpinner(false)}
          />
        </View>
        <View style={styles.form}>
          <PostInput
            style={{ height: 50 }}
            placeholder="Photo Title"
            onFocus={() => setIsKeyboardVisible(true)}
            onSubmitEditing={() => setIsKeyboardVisible(false)}
            onChangeText={setPhotoTitle}
            value={photoTitle}
          />
          <PostInput
            style={{ height: 50 }}
            location
            placeholder="Location"
            onFocus={() => setIsKeyboardVisible(true)}
            onSubmitEditing={() => setIsKeyboardVisible(false)}
            onChangeText={setLocationTitle}
            value={locationTitle}
          />
        </View>

        {!isKeyboardVisible && (
          <>
            <SubmitButton
              text="Publish"
              style={{ marginTop: 32 }}
              onSubmit={onPublishHandler}
            />
            <TouchableOpacity style={styles.button}>
              <ClearFormIcon onPress={clearForm} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Spinner visible={showOverlay} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  form: {
    paddingTop: 24,
  },
  button: {
    alignItems: "center",
    height: 40,
    marginTop: "auto",
    marginBottom: 34,
  },
});
