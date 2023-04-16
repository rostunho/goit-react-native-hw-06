import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, FlatList, Text } from "react-native";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { getPostsCollection } from "../../firebase/operations";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    getPostsCollection(setPosts);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar source={{ uri: avatar }} />
        <View style={styles.user}>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {posts.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  user: {
    marginLeft: 8,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
