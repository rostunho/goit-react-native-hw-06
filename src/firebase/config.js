import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDN5lxjUu5JEO-vLKPtr6QbLV9yL1XrZtM",
  authDomain: "rn-social-f1d54.firebaseapp.com",
  projectId: "rn-social-f1d54",
  storageBucket: "rn-social-f1d54.appspot.com",
  messagingSenderId: "499371561102",
  appId: "1:499371561102:web:00c2d4929696d2d20f79df",
};

const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const storage = getStorage(app);

getFirestore(app);
getStorage(app);

export default app;
