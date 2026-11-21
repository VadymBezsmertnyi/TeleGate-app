import { Dimensions, StyleSheet } from "react-native";
import colors from "../../styles/colors";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainContainer: {
    width: WIDTH - 40,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },
  title: {
    fontSize: 18,
    color: colors.eminence,
    textAlign: "center",
  },
  buttonUpdate: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.wisteria,
    borderRadius: 10,
  },
  buttonUpdateText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default styles;
