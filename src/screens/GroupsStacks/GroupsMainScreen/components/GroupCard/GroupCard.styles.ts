import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray900,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  groupName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  memberCount: {
    color: colors.gray300,
    fontSize: 14,
  },
  subscriptionCount: {
    color: colors.gray300,
    fontSize: 14,
  },
  role: {
    color: colors.gray300,
    fontSize: 14,
  },
  subscriptionInfoRow: {
    marginTop: 6,
  },
  subscriptionItemsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  subscriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subscriptionText: {
    color: colors.gray300,
    fontSize: 12,
    fontWeight: "500",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
  },
  lastActivity: {
    color: colors.gray300,
    fontSize: 12,
  },
  chevron: {
    marginLeft: 8,
  },
});

export default styles;
