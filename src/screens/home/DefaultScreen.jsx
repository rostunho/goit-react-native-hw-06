import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import {
  authLSignOutUser,
  authSignOutUser,
} from "../../redux/auth/authOperations";
import PostsScreen from "../main/PostsScreen";
import CreatePostScreen from "../main/CreatePostScreen";
import ProfileScreen from "../main/ProfileScreen";
import {
  LogOutIcon,
  PostsIcon,
  CreatePostIcon,
  ProfileIcon,
  GoBackIcon,
} from "../../assets/custom-icons";

const MainTab = createBottomTabNavigator();

export default function DefaultScreen({ navigation }) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <>
      <MainTab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          ...options.screen,
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Publications",
            tabBarIcon: ({ focused }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                  <PostsIcon focused={focused} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity activeOpacity={0.75} onPress={logOut}>
                  <LogOutIcon />
                </TouchableOpacity>
              );
            },
          }}
        />

        <MainTab.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            title: "Create Publication",
            style: { marginHorizontal: 31 },
            tabBarStyle: { display: "none" },
            tabBarIcon: () => {
              return (
                <TouchableHighlight
                  activeOpacity={0.25}
                  underlayColor="#DE5E00"
                  style={{ borderRadius: 20 }}
                  onPress={() => navigation.navigate("CreatePost")}
                >
                  <CreatePostIcon />
                </TouchableHighlight>
              );
            },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => navigation.navigate("Posts")}
                >
                  <GoBackIcon />
                </TouchableOpacity>
              );
            },
          }}
        />

        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  <ProfileIcon focused={focused} />
                </TouchableOpacity>
              );
            },
          }}
        />
      </MainTab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 83,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: "rgb(179,179,179)",
  },
  header: {
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(179,179,179)",
  },
});

const options = {
  screen: {
    tabBarStyle: styles.tabBar,
    tabBarShowLabel: false,
    headerTitleAlign: "center",
    headerStyle: styles.header,
    headerTitleStyle: { fontFamily: "Roboto-Medium", fontSize: 17 },
    headerRightContainerStyle: { paddingRight: 16 },
    headerLeftContainerStyle: { paddingLeft: 16 },
  },
};
