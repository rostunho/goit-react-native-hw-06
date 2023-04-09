import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useRoute } from "../router";

export default function Main() {
  // const [user, setUser] = useState(null);

  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => setUser(user));

  return <NavigationContainer>{routing}</NavigationContainer>;
}
