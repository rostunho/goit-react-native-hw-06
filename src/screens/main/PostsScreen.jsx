import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Post from "../../components/Post";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const newPost = route.params;
    newPost && setPosts((prevState) => [newPost, ...prevState]);
  }, [route.params]);

  return (
    posts.length > 0 && (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              source={{ uri: item.photo.uri }}
              photoTitle={item.photoTitle}
              locationTitle={item.locationTitle}
              onCommentsPress={() => navigation.navigate("Comments")}
              onLocationPress={() =>
                navigation.navigate("Map", {
                  location: item.location,
                  detectedLocation: item.detectedLocation,
                })
              }
              //
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
