// import db from "../../firebase/config";
import "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { authSlice } from "./authSlice";

const auth = getAuth();

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // Create user Profile on Firebase:
      await createUserWithEmailAndPassword(auth, email, password);

      // const user = auth.currentUser;
      // await updateProfile(user, {
      //   displayName: login,
      // });

      // Add "displayName" field in user object on Firebase:
      await updateProfile(auth.currentUser, { displayName: login });

      // Update user object on Redux:
      const { uid, displayName } = auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User: ", user);
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
    }
  };

export const authStateChangeUser = async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => setUser(user));
};

export const authLogOutUser = () => async (dispatch, getState) => {};
