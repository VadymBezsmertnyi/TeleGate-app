import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray800,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.gray700,
    minWidth: 100,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray300,
    marginRight: 8,
  },
  activeTabLabel: {
    color: colors.white,
    fontWeight: "600",
  },
  countBadge: {
    backgroundColor: colors.gray600,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  activeCountBadge: {
    backgroundColor: colors.white,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray300,
  },
  activeCountText: {
    color: colors.primary,
  },
});
