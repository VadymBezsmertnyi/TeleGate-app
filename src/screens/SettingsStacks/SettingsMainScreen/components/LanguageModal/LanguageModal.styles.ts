import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray800,
    borderRadius: 16,
    maxHeight: 400,
    width: WIDTH * 0.9,
    maxWidth: 400,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray900,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  closeButton: {
    padding: 4,
  },
  languagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  languageItemActive: {
    backgroundColor: colors.blue500,
  },
  languageItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  languageIcon: {
    width: 32,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  languageText: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  languageNative: {
    fontSize: 14,
    color: colors.gray300,
    marginTop: 2,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
