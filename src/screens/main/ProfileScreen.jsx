import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LogOutIcon } from "../../assets/custom-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";

export default function ProfileScreen() {
  const { login, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOutUser());
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
      setAvatar(photoFromLibrary.assets[0].uri);
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Avatar large source={{ uri: avatar }} onPress={pickAvatar} />
        <TouchableOpacity
          style={styles.logOutIcon}
          activeOpacity={0.75}
          onPress={logOut}
        >
          <LogOutIcon />
        </TouchableOpacity>
        <Text style={styles.userName}>{login}</Text>
        <Post withLikes />
      </View>
    </ScreenWrapper>
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
