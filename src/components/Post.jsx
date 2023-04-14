import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import {
  doc,
  updateDoc,
  getFirestore,
  getDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { CommentsIcon, LikeIcon, LocationIcon } from "../assets/custom-icons";
import { useState, useEffect } from "react";
import SavedPhoto from "./SavedPhoto";

export default function Post({
  postId,
  withLikes,
  source,
  photoTitle,
  locationTitle,
  commentsCount = 0,
  likesCount = 0,
  onCommentsPress,
  onLikesPress,
  onLocationPress,
}) {
  const [overallLikesCount, setOverallLikesCount] = useState(null);
  const [liked, setLiked] = useState(false);
  const [locationPressed, setLocationPressed] = useState(false);
  const [commentsPressed, setCommentsPressed] = useState(false);
  const [likesPressed, setLikesPressed] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    (async () => {
      await getOveralLikeCount();
    })();
  }, []);

  const putLike = async () => {
    setLiked((state) => !state);
    !liked ? await changeOveralLikeCount("add") : await changeOveralLikeCount();
  };

  const getOveralLikeCount = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = await getDoc(postRef);
      const likes = post.data().likes;

      const unsub = onSnapshot(postRef, (doc) => {
        console.log("Current data: ", doc.data().likes);

        const likes = doc.data().likes;
        setOverallLikesCount(likes);
      });
      return likes;
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeOveralLikeCount = async (add) => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = await getDoc(postRef);
      const likes = post.data().likes;

      await updateDoc(
        postRef,
        add
          ? {
              likes: likes + 1,
            }
          : { likes: likes - 1 }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SavedPhoto source={source} style={styles.image} />
      <Text style={styles.title}>{photoTitle}</Text>
      <View style={styles.interactiveArea}>
        <View style={styles.counters}>
          <Pressable
            onPressIn={() => setCommentsPressed(true)}
            onPress={onCommentsPress}
            onPressOut={() => setCommentsPressed(false)}
          >
            <View style={styles.commentsArea}>
              <CommentsIcon filled={commentsPressed ? true : false} />
              <Text
                style={{
                  ...styles.commentsCount,
                  color: commentsPressed ? "#FF6C00" : "#BDBDBD",
                }}
              >
                {commentsCount}
              </Text>
            </View>
          </Pressable>

          {withLikes && (
            <Pressable
              onPressIn={() => setLikesPressed(true)}
              onPress={putLike}
              onPressOut={() => setLikesPressed(false)}
            >
              <View style={styles.likesArea}>
                <LikeIcon filled={liked ? true : false} />
                <Text
                  style={{
                    ...styles.likesCount,
                    color: likesPressed ? "#FF6C00" : "#BDBDBD",
                  }}
                >
                  {overallLikesCount}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
        <Pressable
          onPressIn={() => setLocationPressed(true)}
          onPress={onLocationPress}
          onPressOut={() => setLocationPressed(false)}
        >
          <View style={styles.locationArea} onPress={() => {}}>
            <LocationIcon filled={locationPressed ? true : false} />
            <Text
              style={{
                ...styles.location,
                color: locationPressed ? "#FF6C00" : "#212121",
              }}
            >
              {locationTitle}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").width / 1.5,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    marginTop: 8,
  },
  interactiveArea: {
    width: Dimensions.get("window").width - 32,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  counters: {
    flexDirection: "row",
  },
  commentsArea: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  commentsCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  likesArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  locationArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});
