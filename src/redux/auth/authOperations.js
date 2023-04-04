// import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User: ", user);
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("User: ", user);
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {};
