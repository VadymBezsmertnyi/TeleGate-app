import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue950,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray500,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-start",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 4,
  },
  leftButton: {
    padding: 4,
  },
  rightButton: {
    padding: 4,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    flex: 1,
    textAlign: "center",
  },
});

export default styles;
