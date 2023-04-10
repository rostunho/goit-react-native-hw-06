import { useState } from "react";
import { View, StyleSheet, Alert, Keyboard } from "react-native";
import { useSelector } from "react-redux";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import ScreenWrapper from "../../components/ScreenWrapper";
import CommentInput from "../../components/CommentInput";

export default function CommentsScreen({ route }) {
  const [newComment, setNewComment] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);
  const { postId } = route.params;

  const onSubmit = async () => {
    try {
      await sendNewComment();
      hideKeyboard();
      setNewComment("");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const sendNewComment = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(collection(db, "posts", postId, "comments"));
      setDoc(docRef, {
        comment: newComment,
        user: { userId, login },
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(
        "Error adding document into nested collection",
        error.message
      );
    }
  };

  const hideKeyboard = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  return (
    <ScreenWrapper keyboardVerticalOffset={-330} onPress={hideKeyboard}>
      <View
        style={{
          ...styles.container,
          paddingBottom: isKeyboardVisible ? 330 : 16,
        }}
      >
        <CommentInput
          value={newComment}
          onFocus={() => setIsKeyboardVisible(true)}
          onChangeText={(value) => setNewComment(value)}
          onSubmit={onSubmit}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
