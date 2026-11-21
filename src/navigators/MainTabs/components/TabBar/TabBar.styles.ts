import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.black,
    borderTopWidth: 1,
    borderTopColor: colors.gray800,
    gap: 2,
  },
});

export default styles;
