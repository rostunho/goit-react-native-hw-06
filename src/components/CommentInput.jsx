import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { SendCommentIcon } from "../assets/custom-icons";

export default function CommentInput({
  placeholder,
  secured = false,
  value,
  onFocus,
  onBlur,
  onChangeText,
  onSubmit,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        value={value}
        placeholder="Comment"
        placeholderTextColor="#BDBDBD"
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
      <TouchableHighlight
        activeOpacity={0.25}
        underlayColor="#DE5E00"
        style={styles.button}
        onPress={onSubmit}
      >
        <SendCommentIcon />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: 16,
    // left: 16,

    width: Dimensions.get("window").width - 32,
    // marginHorizontal: "auto",
    marginTop: "auto",
  },
  input: {
    height: 50,
    width: "100%",
    overflow: "hidden",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  button: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 50,
  },
});
