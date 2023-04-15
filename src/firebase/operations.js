import { Alert } from "react-native";

import {
  doc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const db = getFirestore();

export const getPostsCollection = async (callback, userId) => {
  try {
    const postsRef = collection(db, "posts");

    const sortedPostsRef = userId
      ? query(
          postsRef,
          where("userId", "==", userId),
          orderBy("createdUnix", "desc")
        )
      : query(postsRef, orderBy("createdUnix", "desc"));

    onSnapshot(sortedPostsRef, ({ docs }) => {
      callback(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  } catch (error) {
    console.log(error.message);
    return Alert.alert(error.message);
  }
};

export const getPostComments = async (callback, postId) => {
  try {
    const docsRef = collection(db, "posts", `${postId}`, "comments");

    const sortedDocs = query(docsRef, orderBy("time", "desc"));
    onSnapshot(sortedDocs, ({ docs }) => {
      callback(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOveralLikesCount = async (callback, postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    // const post = await getDoc(postRef);
    onSnapshot(postRef, (doc) => {
      const likes = doc?.data().likes;
      callback(likes.length);
      return likes;
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOverallCommentsCount = async (callback, postId) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    onSnapshot(commentsRef, ({ docs }) => {
      const commentsCount = docs.length;
      callback(commentsCount);
      return commentsCount;
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const inspectOwnLikes = async (callback, { userId, postId }) => {
  try {
    const postRef = doc(db, "posts", postId);
    const post = await getDoc(postRef);
    const likes = post.data().likes;

    const didILikeIt = likes.find((like) => like === userId);
    didILikeIt ? callback(true) : callback(false);
  } catch (error) {
    Alert.alert(error.message);
    console.log(error.message);
  }
};

export const toggleLikes = async (callback, { userId, postId }) => {
  try {
    const postRef = doc(db, "posts", postId);
    const post = await getDoc(postRef);
    const likes = post.data().likes;

    const didILikeIt = likes.find((like) => like === userId);
    !didILikeIt ? callback(true) : callback(false);

    await updateDoc(postRef, {
      likes: !didILikeIt ? arrayUnion(userId) : arrayRemove(userId),
    });
  } catch (error) {
    console.log(error.message);
  }
};
