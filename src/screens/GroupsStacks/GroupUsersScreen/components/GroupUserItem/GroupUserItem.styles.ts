import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray900,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray900,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  memberUsername: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 6,
    fontWeight: "500",
  },
  subscriptionCount: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  subscriptionCountText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "600",
  },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 12,
    color: colors.gray400,
    marginRight: 4,
  },
  dateValue: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  chevron: {
    marginLeft: 8,
  },
});
