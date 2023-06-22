import { StyleSheet, View, Text, Dimensions } from "react-native";
import Avatar from "./Avatar";

export default function Comment({ text, time, userAvatar, own }) {
  const parseTime = () => {
    const commentTime = new Date(time);

    const day = commentTime.toDateString().split(" ").slice(2, 3);
    const month = commentTime.toDateString().split(" ").slice(1, 2);
    const year = commentTime.toDateString().split(" ").slice(3);
    const hour = commentTime.toLocaleTimeString().slice(0, 5);

    return day + " " + month + "," + " " + year + " " + "|" + " " + hour;
  };

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: own ? "row-reverse" : "row",
      }}
    >
      <Avatar small source={{ uri: userAvatar }} />
      <View style={styles.textBox}>
        <Text style={styles.text}>{text}</Text>
        <Text
          style={{
            ...styles.date,
            marginRight: own ? "auto" : 0,
            marginLeft: !own ? "auto" : 0,
          }}
        >
          {parseTime()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  textBox: {
    width: Dimensions.get("window").width - 76,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",

    borderRadius: 6,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
  },
});
