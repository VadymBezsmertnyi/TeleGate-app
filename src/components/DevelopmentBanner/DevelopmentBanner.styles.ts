import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "400%",
    flexWrap: "nowrap",
  },
  text: {
    width: "100%",
    color: colors.black,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 100,
    flexShrink: 0,
    flexWrap: "nowrap",
  },
});
