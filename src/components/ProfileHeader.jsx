import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser, editUser } from "../redux/auth/authOperations";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid";
import { LogOutIcon } from "../assets/custom-icons";
import Avatar from "./Avatar";

export default function ProfileHeader({ onPress }) {
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const { login, userId, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentAvatar(avatar);
  }, []);

  const changeAvatar = async () => {
    const newAvatarUrl = await uploadNewAvatar();
    dispatch(editUser({ login: login, avatar: newAvatarUrl }));

    setCurrentAvatar(newAvatarUrl);
  };

  const uploadNewAvatar = async () => {
    try {
      const newAvatar = await pickAvatar();

      // make jpeg-photo and create his unique id
      const response = await fetch(newAvatar);
      const file = await response.blob();
      const uniqId = nanoid(28);
      // upload jpeg-photo to server
      const storage = getStorage();
      const storageRef = ref(storage, `avatar-images/${uniqId}`);
      const uploading = await uploadBytes(storageRef, file);
      // get back url to jpeg-photo
      const newProcessedPhotoUrl = await getDownloadURL(
        ref(storage, `avatar-images/${uniqId}`)
      );

      return newProcessedPhotoUrl;
    } catch (error) {
      console.log(error.message);
    }
  };

  const pickAvatar = async () => {
    try {
      const photoFromLibrary = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (photoFromLibrary.canceled) {
        return Alert.alert("Avatar uploading failed or canceled");
      }
      setCurrentAvatar(photoFromLibrary.assets[0].uri);

      return photoFromLibrary.assets[0].uri;
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar large source={{ uri: currentAvatar }} onPress={changeAvatar} />
      <TouchableOpacity
        style={styles.logOutIcon}
        activeOpacity={0.75}
        onPress={onPress}
      >
        <LogOutIcon />
      </TouchableOpacity>
      <Text style={styles.userName}>{login}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    justifyContent: "flex-end",
  },
  logOutIcon: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 32,
  },
});
