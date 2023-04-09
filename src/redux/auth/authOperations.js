// import db from "../../firebase/config";
import "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { authSlice } from "./authSlice";

const auth = getAuth();

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // Create user Profile on Firebase:
      await createUserWithEmailAndPassword(auth, email, password);
      // Add new field "displayName" to UserProfile Object
      await updateProfile(auth.currentUser, { displayName: login });
      // Update User State  object on Redux:
      const { uid, displayName } = auth.currentUser;
      const updatedProfile = { userId: uid, login: displayName };
      dispatch(authSlice.actions.updateUserProfile(updatedProfile));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    // const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return Alert.alert(error.code);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const updatedProfile = {
        userId: user.uid,
        login: user.displayName,
      };

      dispatch(authSlice.actions.updateUserProfile(updatedProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authLogOut());
};
