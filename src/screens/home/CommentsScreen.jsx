import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Keyboard, FlatList } from "react-native";
import { useSelector } from "react-redux";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  collection,
} from "firebase/firestore";
import ScreenWrapper from "../../components/ScreenWrapper";
import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";

export default function CommentsScreen({ route }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    getAllComments();
  }, []);

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
      const docRef = doc(collection(db, "posts", postId, "comments"));
      setDoc(docRef, {
        comment: newComment,
        user: { userId, login },
        time: Date.now(),
      });
    } catch (error) {
      console.log(
        "Error adding document into nested collection",
        error.message
      );
    }
  };

  const getAllComments = async () => {
    const docsRef = collection(db, "posts", postId, "comments");
    onSnapshot(docsRef, ({ docs }) => {
      setComments(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
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
        <View style={styles.list}>
          <Comment />

          <FlatList />
        </View>
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
    // paddingTop: 120,
    backgroundColor: "#fff",
  },
  list: {
    // justifyContent: "flex-start",
    marginTop: 32,
    // marginBottom: "auto",
  },
});

// const getAllComments = async () => {
//   onSnapshot(collection(db, "posts", postId, "comments"), (docsSnap) => {
//     setComments(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   });
// };
