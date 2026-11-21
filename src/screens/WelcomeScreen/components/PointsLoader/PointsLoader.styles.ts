import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray300,
  },
});

export default styles;
