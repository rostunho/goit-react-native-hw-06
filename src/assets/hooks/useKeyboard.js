import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

export function useKeyboard(initialValue) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(initialValue);

  useEffect(() => {
    const keyboardShowing = () => {
      setIsKeyboardVisible(true);
    };
    const keyboardHiding = () => {
      setIsKeyboardVisible(false);
    };

    const show = Keyboard.addListener("keyboardDidShow", keyboardShowing);
    const hide = Keyboard.addListener("keyboardDidHide", keyboardHiding);

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return [isKeyboardVisible, setIsKeyboardVisible];
}
