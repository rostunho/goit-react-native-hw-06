import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { AddPhotoIcon } from "../assets/custom-icons";

export default function Avatar({ large, small }) {
  const [avatarSize, setAvatarSize] = useState(null);

  useEffect(() => {
    setAvatarSize(handleSize());
  }, []);

  const handleSize = () => {
    if (large && small) {
      throw new Error("large and small props can't exist together ");
    } else if (large) {
      return {
        height: 120,
        width: 120,
        borderRadius: 16,
        position: "absolute",
        top: -60,
      };
    } else if (small) {
      return { height: 28, width: 28, borderRadius: 28, marginTop: 2 };
    } else {
      return { height: 60, width: 60, borderRadius: 16 };
    }
  };

  return (
    <View style={{ ...styles.container, ...avatarSize }}>
      {large && <AddPhotoIcon style={styles.addIcon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: -60,
    // height: 120,
    // width: 120,
    // borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addIcon: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  large: {
    height: 120,
    width: 120,
  },
  small: {
    height: 28,
    width: 28,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: -60,
//     height: 120,
//     width: 120,
//     borderRadius: 16,
//     backgroundColor: "#F6F6F6",
//   },
//   addIcon: {
//     position: "absolute",
//     bottom: 14,
//     right: -12,
//   },
// });
