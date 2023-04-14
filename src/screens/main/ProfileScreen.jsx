import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser, editUser } from "../../redux/auth/authOperations";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
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
import { LogOutIcon } from "../../assets/custom-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import ProfileHeader from "../../components/ProfileHeader";

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);
  const { login, userId, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const db = getFirestore();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const ownPostsRef = query(postsRef, where("userId", "==", userId));
      // console.log(ownPostsRef);
      onSnapshot(ownPostsRef, ({ docs }) => {
        setUserPosts(docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (error) {
      console.log(error.message);
      return Alert.alert(error.message);
    }
  };

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ScreenWrapper>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={<ProfileHeader onPress={logOut} />}
          ListHeaderComponentStyle={{}}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
