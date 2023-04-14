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
import { useKeyboard } from "../../assets/hooks/useKeyboard";
import { ClearFormIcon } from "../../assets/custom-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import PhotoViewer from "../../components/PhotoViewer";
import PostInput from "../../components/PostInput";
import SubmitButton from "../../components/SubmitButton";

export default function CreatePostScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState("");
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useKeyboard(false);
  const [hasLocationPermision, setHasLocationPermision] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Test: Initial Error message"
  );

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
      await uploadPost();
      navigation.navigate("Posts");
      clearForm();
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  const uploadPost = async () => {
    try {
      const photoUrl = await uploadPhoto();
      const db = getFirestore();
      const createdUnix = Date.now();
      const docRef = await addDoc(collection(db, "posts"), {
        userId,
        login,
        photoUrl,
        photoTitle,
        location,
        locationTitle,
        country,
        city,
        createdUnix,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error.message);
    }
  };

  const uploadPhoto = async () => {
    try {
      // make jpeg-photo and create his unique id
      const response = await fetch(photo.uri);
      const file = await response.blob();
      const uniqId = nanoid(28);
      // upload jpeg-photo to server
      const storage = getStorage();
      const storageRef = ref(storage, `post-images/${uniqId}`);
      await uploadBytes(storageRef, file);
      // get back url to jpeg-photo
      const processedPhotoUrl = await getDownloadURL(
        ref(storage, `post-images/${uniqId}`)
      );

      return processedPhotoUrl;
    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message);
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
        <PhotoViewer setPhoto={setPhoto} photo={photo} focused={isFocused} />

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
    paddingTop: 32,
  },
  button: {
    alignItems: "center",
    height: 40,
    marginTop: "auto",
    marginBottom: 34,
  },
});
