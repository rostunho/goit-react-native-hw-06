import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import ScreenWrapper from "../../components/ScreenWrapper";
import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";
import SavedPhoto from "../../components/SavedPhoto";

export default function CommentsScreen({ route }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { userId, login } = useSelector((state) => state.auth);
  const { postId, photoUrl } = route.params;
  const db = getFirestore();
  const listRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    const keyboardShowing = () => {
      setIsKeyboardVisible(true);
    };
    const keyboardHiding = () => {
      inputRef.current.blur();
      setIsKeyboardVisible(false);
    };

    const show = Keyboard.addListener("keyboardDidShow", keyboardShowing);
    const hide = Keyboard.addListener("keyboardDidHide", keyboardHiding);

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  //........MAYBE GET BACK LATER...............
  // useEffect(() => {
  //   setTimeout(() => {
  //     listRef.current?.scrollToEnd();
  //   }, 1);
  // }, [isKeyboardVisible]);
  //...........................................

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
    <>
      <View style={styles.photoBox}>
        <SavedPhoto source={photoUrl} />
      </View>
      <ScreenWrapper
        withScroll
        keyboardVerticalOffset={-330}
        onPress={hideKeyboard}
      >
        <View
          style={{
            ...styles.container,
            paddingBottom: isKeyboardVisible ? 330 : 16,
          }}
        >
          <View
            style={{
              height: 411,
            }}
          >
            {comments.length > 0 && (
              <FlatList
                inverted
                style={{
                  ...styles.list,
                  height:
                    Dimensions.get("window").height -
                    53 -
                    styles.photoBox.height -
                    90,
                }}
                ref={listRef}
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Comment
                    ref={inputRef}
                    text={item.comment}
                    time={item.time}
                    own={userId === item.user.userId}
                  />
                )}
                ListEmptyComponent={<View style={styles.list} />}
              />
            )}
          </View>
          <View style={styles.inputBox}>
            <CommentInput
              ref={inputRef}
              value={newComment}
              autoFocus={true}
              onFocus={() => setIsKeyboardVisible(true)}
              onBlur={() => setIsKeyboardVisible(false)}
              onChangeText={(value) => setNewComment(value)}
              onSubmit={onSubmit}
            />
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: ((Dimensions.get("window").width - 32) * 9) / 16 + 64,
    backgroundColor: "#fff",
  },
  photoBox: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
    height: ((Dimensions.get("window").width - 32) * 9) / 16 + 64,
    width: "100%",
    paddingHorizontal: 16,
    objectFit: "cover",
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  list: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 16,
    flexGrow: 0,
    backgroundColor: "#fff",
  },
  inputBox: {
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#fff",
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
