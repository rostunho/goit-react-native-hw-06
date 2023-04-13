import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function AuthInput({
  placeholder,
  secured = false,
  value,
  textContentType,
  keyboardType,
  autoCapitalize,
  onFocus,
  onBlur,
  onChangeText,
  onSubmitEditing,
}) {
  const [isPassShowed, setIsPassShowed] = useState(secured ? true : false);

  const togglePassShowing = () => {
    setIsPassShowed((prevState) => !prevState);
  };

  return (
    <>
      {!secured ? (
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          textContentType={textContentType}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#BDBDBD"
            value={value}
            textContentType={textContentType}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={isPassShowed ? true : false}
          />
          <TouchableOpacity
            style={styles.showPassBtn}
            activeOpacity={0.75}
            onPress={togglePassShowing}
          >
            <Text style={styles.showPassText}>
              {isPassShowed ? "Show" : "Hide"}
            </Text>
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
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  showPassBtn: {
    position: "absolute",
    top: 16,
    right: 32,
  },
  showPassText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
