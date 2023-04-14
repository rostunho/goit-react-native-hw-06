import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import {
  doc,
  updateDoc,
  getFirestore,
  getDoc,
  onSnapshot,
  collection,
  arrayUnion,
  arrayRemove,
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
  const [overallCommentsCount, setOverallCommentsCount] = useState(null);
  const [overallLikesCount, setOverallLikesCount] = useState(null);
  const [liked, setLiked] = useState(false);
  const [locationPressed, setLocationPressed] = useState(false);
  const [commentsPressed, setCommentsPressed] = useState(false);
  // const [likesPressed, setLikesPressed] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const db = getFirestore();

  useEffect(() => {
    (async () => {
      await getOveralLikesCount();
      await inspectOwnLikes();
      await getOveralCommentsCount();
    })();
  });

  const getOveralLikesCount = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = await getDoc(postRef);

      onSnapshot(postRef, (doc) => {
        const likes = doc?.data().likes;
        setOverallLikesCount(likes.length);
        return likes;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOveralCommentsCount = async () => {
    try {
      const commentsRef = collection(db, "posts", postId, "comments");
      onSnapshot(commentsRef, ({ docs }) => {
        const commentsCount = docs.length;
        setOverallCommentsCount(commentsCount);
        return commentsCount;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLikes = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = await getDoc(postRef);
      const likes = post.data().likes;

      const didILikeIt = likes.find((like) => like === userId);
      !didILikeIt ? setLiked(true) : setLiked(false);

      await updateDoc(postRef, {
        likes: !didILikeIt ? arrayUnion(userId) : arrayRemove(userId),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const inspectOwnLikes = async () => {
    const postRef = doc(db, "posts", postId);
    const post = await getDoc(postRef);
    const likes = post.data().likes;

    const didILikeIt = likes.find((like) => like === userId);
    didILikeIt ? setLiked(true) : setLiked(false);
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
              <CommentsIcon filled={overallCommentsCount ? true : false} />
              <Text
                style={{
                  ...styles.commentsCount,
                  color: commentsPressed ? "#FF6C00" : "#BDBDBD",
                }}
              >
                {overallCommentsCount}
              </Text>
            </View>
          </Pressable>

          {withLikes && (
            <Pressable
              // onPressIn={() => setLikesPressed(true)}
              onPress={handleLikes}
              // onPressOut={() => setLikesPressed(false)}
            >
              <View style={styles.likesArea}>
                <LikeIcon filled={liked ? true : false} />
                <Text
                  style={{
                    ...styles.likesCount,
                    // color: liked ? "#FF6C00" : "#BDBDBD",
                    color: "#BDBDBD",
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
