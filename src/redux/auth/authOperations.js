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
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = auth.currentUser;
      const updatedProfile = {
        userId: uid,
        login: displayName,
        email: email,
        avatar: photoURL,
      };
      dispatch(authSlice.actions.updateUserProfile(updatedProfile));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const editUser =
  ({ login, avatar }) =>
  async (dispatch, getstate) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });
      const { uid, displayName, photoURL } = auth.currentUser;
      const updatedProfile = {
        userId: uid,
        login: displayName,
        avatar: photoURL,
      };
      dispatch(authSlice.actions.updateUserProfile(updatedProfile));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return Alert.alert(error.code);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const updatedProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatar: user.photoURL,
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
