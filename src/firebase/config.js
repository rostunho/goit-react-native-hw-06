import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN5lxjUu5JEO-vLKPtr6QbLV9yL1XrZtM",
  authDomain: "rn-social-f1d54.firebaseapp.com",
  projectId: "rn-social-f1d54",
  storageBucket: "rn-social-f1d54.appspot.com",
  messagingSenderId: "499371561102",
  appId: "1:499371561102:web:00c2d4929696d2d20f79df",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);

export default firebaseApp;
