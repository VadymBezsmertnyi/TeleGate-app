import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  settingItemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  settingItemText: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  settingItemTitleDestructive: {
    color: colors.gray500,
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: colors.gray300,
    marginTop: 2,
  },
  settingItemRight: {
    alignItems: "center",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIconInner: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.gray400,
    transform: [{ rotate: "45deg" }],
  },
  arrowIconInnerDestructive: {
    borderColor: colors.gray500,
  },
});
