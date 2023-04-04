// import db from "../../firebase/config";
import "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authSlice";

const auth = getAuth();

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
      });

      const { uid, displayName } = auth.currentUser;
      //   console.log("CurrentUser", user);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
      //   console.log("User: ", user);
    } catch (error) {
      console.log(error);
      //   console.log(error.code);
      console.log(error.message);
    }
  };

export default ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      //   console.log("User: ", user);
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {};
