import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
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
import SavedPhoto from "../../components/SavedPhoto";

export default function CommentsScreen({ route }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { userId, login } = useSelector((state) => state.auth);
  const { postId, photoUrl } = route.params;
  const db = getFirestore();
  const listRef = useRef();

  useEffect(() => {
    getAllComments();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     listRef.current?.scrollToEnd();
  //   }, 1);
  // }, [isKeyboardVisible]);

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
            paddingBottom: isKeyboardVisible ? 330 : 0,
          }}
        >
          <View
            style={{
              height:
                Dimensions.get("window").height -
                53 -
                styles.photoBox.height -
                90,
            }}
          >
            {comments.length > 0 && (
              <FlatList
                inverted
                style={{
                  height:
                    Dimensions.get("window").height -
                    53 -
                    styles.photoBox.height -
                    90,
                  width: Dimensions.get("window").width,
                  paddingHorizontal: 16,
                  flexGrow: 0,
                  backgroundColor: "#fff",
                }}
                ref={listRef}
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Comment
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
              value={newComment}
              onFocus={() => setIsKeyboardVisible(true)}
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
    // height: Dimensions.get("window").height - 53,
    // width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    psddingTop: ((Dimensions.get("window").width - 32) * 9) / 16 + 64,
    backgroundColor: "#fff",
  },
  photoBox: {
    position: "absolute",
    zIndex: 10,
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
    backgroundColor: "#fff",
  },
  inputBox: {
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
});

// import { useState, useEffect, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   Alert,
//   Keyboard,
//   FlatList,
//   Dimensions,
//   SafeAreaView,
// } from "react-native";
// import { useSelector } from "react-redux";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   onSnapshot,
//   collection,
// } from "firebase/firestore";

// import ScreenWrapper from "../../components/ScreenWrapper";
// import CommentInput from "../../components/CommentInput";
// import Comment from "../../components/Comment";
// import SavedPhoto from "../../components/SavedPhoto";

// export default function CommentsScreen({ route }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
//   const { userId, login } = useSelector((state) => state.auth);
//   const { postId, photoUrl } = route.params;
//   const db = getFirestore();
//   const listRef = useRef();

//   useEffect(() => {
//     getAllComments();
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       listRef.current?.scrollToEnd();
//     }, 1);
//   }, [isKeyboardVisible]);

//   const onSubmit = async () => {
//     try {
//       await sendNewComment();

//       hideKeyboard();
//       setNewComment("");
//     } catch (error) {
//       Alert.alert(error.message);
//     }
//   };

//   const sendNewComment = async () => {
//     try {
//       const docRef = doc(collection(db, "posts", postId, "comments"));
//       setDoc(docRef, {
//         comment: newComment,
//         user: { userId, login },
//         time: Date.now(),
//       });
//     } catch (error) {
//       console.log(
//         "Error adding document into nested collection",
//         error.message
//       );
//     }
//   };

//   const getAllComments = async () => {
//     try {
//       const docsRef = collection(db, "posts", postId, "comments");
//       onSnapshot(docsRef, ({ docs }) => {
//         setComments(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       });
//     } catch (error) {
//       Alert.alert(error.message);
//     }
//   };

//   const hideKeyboard = () => {
//     setIsKeyboardVisible(false);
//     Keyboard.dismiss();
//   };

//   return (
//     <ScreenWrapper keyboardVerticalOffset={-330} onPress={hideKeyboard}>
//       <View
//         style={{
//           ...styles.container,
//           paddingBottom: isKeyboardVisible ? 346 : 16,
//         }}
//       >
//         <View style={styles.photoBox}>
//           <SavedPhoto source={photoUrl} />
//         </View>
//         <View
//           style={{
//             ...styles.list,
//             height: !isKeyboardVisible
//               ? styles.container.height - styles.photoBox.height - 88 - 66
//               : styles.container.height -
//                 styles.photoBox.height -
//                 88 -
//                 66 -
//                 330 -
//                 34,
//           }}
//         >
//           {comments.length > 0 && (
//             <FlatList
//               ref={listRef}
//               data={comments}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <Comment
//                   text={item.comment}
//                   time={item.time}
//                   own={userId === item.user.userId}
//                 />
//               )}
//             />
//           )}
//         </View>
//         <CommentInput
//           value={newComment}
//           onFocus={() => {
//             setIsKeyboardVisible(true);
//           }}
//           onChangeText={(value) => setNewComment(value)}
//           onSubmit={onSubmit}
//         />
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: Dimensions.get("window").height,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingTop: 53,
//     paddingLeft: 16,
//     paddingRight: 16,
//     backgroundColor: "#fff",
//   },
//   photoBox: {
//     objectFit: "cover",
//     height: ((Dimensions.get("window").width - 32) * 9) / 16,
//     marginVertical: 32,
//   },
//   avoidingView: {
//     height: 600,
//   },
//   list: {
//     // height: 350,
//     // height: "100%",
//     // marginTop: 32,
//   },
// });
