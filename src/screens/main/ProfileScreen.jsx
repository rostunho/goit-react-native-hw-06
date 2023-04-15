import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser, editUser } from "../../redux/auth/authOperations";
import { StyleSheet, Alert, FlatList, SafeAreaView } from "react-native";

import {
  collection,
  query,
  where,
  getFirestore,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getPostsCollection } from "../../firebase/operations";
import ScreenWrapper from "../../components/ScreenWrapper";
import Post from "../../components/Post";
import ProfileHeader from "../../components/ProfileHeader";

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const db = getFirestore();

  useEffect(() => {
    getPostsCollection(setUserPosts, userId);
  }, []);

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
