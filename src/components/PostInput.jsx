import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { LocationIcon } from "../assets/custom-icons";

export default function PostInput({
  placeholder,
  location = false,
  value,
  onFocus,
  onBlur,
  onChangeText,
  onSubmitEditing,
}) {
  return (
    <>
      {!location ? (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      ) : (
        <View>
          <TextInput
            style={{ ...styles.input, paddingLeft: 28 }}
            placeholder={placeholder}
            placeholderTextColor="#BDBDBD"
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          <TouchableOpacity
            style={styles.iconWrapper}
            activeOpacity={0.75}
            // onPress={togglePassShowing}
          >
            <LocationIcon />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  iconWrapper: {
    position: "absolute",
    top: 13,
    left: 12,
  },
});
