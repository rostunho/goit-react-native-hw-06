import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../router";

export default function Main() {
  const [user, setUser] = useState(null);
  const routing = useRoute(user);
  const state = useSelector((state) => state);
  console.log(state);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => setUser(user));

  return <NavigationContainer>{routing}</NavigationContainer>;
}
