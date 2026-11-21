import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray100,
    borderRadius: 72,
    position: "relative",
  },
  progressRing: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: colors.blue700,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  outerRing: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 74,
    borderWidth: 4,
    borderColor: colors.blue900,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  box: {
    padding: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray800,
    borderRadius: 72,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 72,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
});

export default styles;
