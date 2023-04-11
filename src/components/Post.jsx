import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { CommentsIcon, LocationIcon } from "../assets/custom-icons";
import { useState } from "react";
import SavedPhoto from "./SavedPhoto";

export default function Post({
  source,
  photoTitle,
  locationTitle,
  commentsCount = 0,
  onCommentsPress,
  onLocationPress,
}) {
  const [locationPressed, setLocationPressed] = useState(false);
  const [commentsPressed, setCommentsPressed] = useState(false);

  return (
    <View style={styles.container}>
      <SavedPhoto source={source} style={styles.image} />
      <Text style={styles.title}>{photoTitle}</Text>
      <View style={styles.interactiveArea}>
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
    marginTop: 32,
    // paddingLeft: 16,
    // paddingRight: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    marginTop: 8,
  },
  interactiveArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  commentsArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    fontSize: 16,
    lineHeight: 19,
  },
  locationArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});
