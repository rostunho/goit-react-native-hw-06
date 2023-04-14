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
  orderBy,
  getDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid";
import { LogOutIcon } from "../../assets/custom-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import ProfileHeader from "../../components/ProfileHeader";

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [overallCommentsCount, setOverallCommentsCount] = useState(null);
  const { login, userId, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const db = getFirestore();

  useEffect(() => {
    (async () => {
      await getUserPosts();
    })();
  }, []);

  const getUserPosts = async () => {
    try {
      const postsRef = collection(db, "posts");

      const ownPostsRef = query(
        postsRef,
        where("userId", "==", userId),
        orderBy("createdUnix", "desc")
      );

      onSnapshot(ownPostsRef, ({ docs }) => {
        setUserPosts(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    <ScreenWrapper withScroll>
      <SafeAreaView style={{ justifyContent: "flex-end" }}>
        <FlatList
          style={styles.list}
          ListHeaderComponent={<ProfileHeader onPress={logOut} />}
          ListHeaderComponentStyle={{ marginTop: 88 }}
          data={userPosts}
          renderItem={({ item }) => (
            <Post
              withLikes
              postId={item.id}
              source={{ uri: item.photoUrl }}
              photoTitle={item.photoTitle}
              locationTitle={item.locationTitle}
              onCommentsPress={() =>
                navigation.navigate("Comments", {
                  postId: item.id,
                  photoUrl: { uri: item.photoUrl },
                })
              }
              onLocationPress={() =>
                navigation.navigate("Map", {
                  location: item.location,
                  city: item.city,
                  country: item.country,
                })
              }
            />
          )}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    // marginTop: 88,
    // backgroundColor: "#fff",
  },
});
