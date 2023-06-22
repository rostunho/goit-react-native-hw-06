import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AddPhotoIcon, RemovePhotoIcon } from "../assets/custom-icons";

export default function Avatar({ large, small, add, source, onPress }) {
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
      <Image source={source} style={styles.image} />
      {large && add && (
        <TouchableOpacity style={styles.addIcon} onPress={onPress}>
          <AddPhotoIcon />
        </TouchableOpacity>
      )}
      {large && !add && (
        <TouchableOpacity style={styles.addIcon} onPress={onPress}>
          <RemovePhotoIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 16,
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
