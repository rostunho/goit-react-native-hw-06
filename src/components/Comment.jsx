import { StyleSheet, View, Text, Dimensions } from "react-native";
import Avatar from "./Avatar";

export default function Comment({ text, time, own }) {
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: own ? "row-reverse" : "row",
      }}
    >
      <Avatar small />
      <View style={styles.textBox}>
        <Text style={styles.text}>{text}</Text>
        <Text
          style={{
            ...styles.date,
            marginRight: own ? "auto" : 0,
            marginLeft: !own ? "auto" : 0,
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get("window").width - 32,
    // marginHorizontal: "auto",
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
