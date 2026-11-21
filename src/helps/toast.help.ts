import Toast from "react-native-toast-message";

export interface ToastConfigI {
  title: string;
  text?: string;
  duration?: number;
  position?: "top" | "bottom";
}

class ToastHelper {
  static success(config: ToastConfigI) {
    Toast.show({
      type: "success",
      text1: config.title,
      text2: config.text,
      visibilityTime: config.duration || 3000,
      position: config.position || "top",
    });
  }
  static error(config: ToastConfigI) {
    Toast.show({
      type: "error",
      text1: config.title,
      text2: config.text,
      visibilityTime: config.duration || 4000,
      position: config.position || "top",
    });
  }
  static info(config: ToastConfigI) {
    Toast.show({
      type: "info",
      text1: config.title,
      text2: config.text,
      visibilityTime: config.duration || 3000,
      position: config.position || "top",
    });
  }
  static warning(config: ToastConfigI) {
    Toast.show({
      type: "info",
      text1: config.title,
      text2: config.text,
      visibilityTime: config.duration || 3000,
      position: config.position || "top",
    });
  }
  static hide() {
    Toast.hide();
  }
}

export default ToastHelper;
