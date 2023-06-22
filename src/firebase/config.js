import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDN5lxjUu5JEO-vLKPtr6QbLV9yL1XrZtM",
  authDomain: "rn-social-f1d54.firebaseapp.com",
  projectId: "rn-social-f1d54",
  storageBucket: "rn-social-f1d54.appspot.com",
  messagingSenderId: "499371561102",
  appId: "1:499371561102:web:00c2d4929696d2d20f79df",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

getFirestore(app);
getStorage(app);
