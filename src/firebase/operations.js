import { Alert } from "react-native";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { nanoid } from "nanoid";

const db = getFirestore();

export const uploadPhoto = async (photo) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniqId = nanoid(28);

    const storage = getStorage();
    const storageRef = ref(storage, `post-images/${uniqId}`);
    await uploadBytes(storageRef, file);

    const processedPhotoUrl = await getDownloadURL(
      ref(storage, `post-images/${uniqId}`)
    );

    return processedPhotoUrl;
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const uploadAvatar = async () => {
  try {
    const response = await fetch(avatar);
    const file = await response.blob();
    const uniqId = nanoid(28);

    const storage = getStorage();
    const storageRef = ref(storage, `avatar-images/${uniqId}`);
    const uploading = await uploadBytes(storageRef, file);

    const processedPhotoUrl = await getDownloadURL(
      ref(storage, `avatar-images/${uniqId}`)
    );
    return processedPhotoUrl;
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

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
    Alert.alert(error.message);
  }
};

export const getOveralLikesCount = async (callback, postId) => {
  try {
    const postRef = doc(db, "posts", postId);

    onSnapshot(postRef, (doc) => {
      const likes = doc?.data().likes;
      callback(likes.length);
      return likes;
    });
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
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
    Alert.alert(error.message);
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
    console.log(error.message);
    Alert.alert(error.message);
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
    Alert.alert(error.message);
  }
};
