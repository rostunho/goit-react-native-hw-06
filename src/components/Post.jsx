import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { CommentsIcon, LikeIcon, LocationIcon } from "../assets/custom-icons";
import { useState } from "react";
import SavedPhoto from "./SavedPhoto";

export default function Post({
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
  const [locationPressed, setLocationPressed] = useState(false);
  const [commentsPressed, setCommentsPressed] = useState(false);
  const [likesPressed, setLikesPressed] = useState(false);

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
              onPress={onLikesPress}
              onPressOut={() => setLikesPressed(false)}
            >
              <View style={styles.likesArea}>
                <LikeIcon filled={commentsPressed ? true : false} />
                <Text
                  style={{
                    ...styles.likesCount,
                    color: likesPressed ? "#FF6C00" : "#BDBDBD",
                  }}
                >
                  {likesCount}
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
    marginBottom: 32,
    // paddingLeft: 16,
    // paddingRight: 16,
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
