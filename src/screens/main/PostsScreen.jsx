import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Post from "../../components/Post";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const { docs } = await getDocs(collection(db, "posts"));
      setPosts(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
              onCommentsPress={() => navigation.navigate("Comments")}
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
  },
});
