import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import { nanoid } from "nanoid";
import { ClearFormIcon } from "../../assets/custom-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import PhotoViewer from "../../components/PhotoViewer";
import PostInput from "../../components/PostInput";
import SubmitButton from "../../components/SubmitButton";

export default function CreatePostScreen({ navigation }) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [locationTitle, setLocationTitle] = useState("");
  const [hasLocationPermision, setHasLocationPermision] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      try {
        const location = await Location.requestForegroundPermissionsAsync();
        if (!location.granted) {
          setErrorMessage("Permission to access location was denied");
          return;
        }
        setHasLocationPermision(true);
      } catch (error) {
        return Alert.alert(error.message);
      }
    })();
  }, []);

  const onPublishHandler = async () => {
    if (!photo) {
      return Alert.alert("You should choose or take a photo for publication.");
    }

    if (locationTitle === "" || photoTitle === "") {
      return Alert.alert("Please fill an empty fields");
    }

    try {
      if (!hasLocationPermision) {
        return Alert.alert(errorMessage);
      }

      const location = await Location.getCurrentPositionAsync();
      const autoLocation = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const data = createPost(
        location,
        autoLocation[0].country,
        autoLocation[0].city
      );
      navigation.navigate("Posts", data);
      clearForm();
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  const clearForm = () => {
    setPhoto(null);
    setPhotoTitle("");
    setLocationTitle("");
  };

  const onOutputPress = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const createPost = (location, country, city) => {
    const newPost = {
      id: nanoid(4).toString(),
      photo: photo,
      photoTitle: photoTitle,
      location: location,
      detectedLocation: {
        country: country,
        city: city,
      },
      locationTitle: locationTitle,
      comments: [],
    };

    return newPost;
  };

  return (
    <ScreenWrapper
      keyboardVerticalOffset={() => keyboardOffset}
      onPress={onOutputPress}
    >
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
