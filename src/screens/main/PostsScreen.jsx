import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import Post from "../../components/Post";

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const docsRef = collection(db, "posts");
      onSnapshot(docsRef, ({ docs }) => {
        console.log("new docs:", docs);
        setPosts(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    posts.length > 0 && (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
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
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
  },
});
