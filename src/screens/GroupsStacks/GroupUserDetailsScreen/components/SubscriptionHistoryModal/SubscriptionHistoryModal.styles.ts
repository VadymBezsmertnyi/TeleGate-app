import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.blue950,
    borderRadius: 16,
    maxHeight: 600,
    width: WIDTH - 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray600,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 8,
  },
  userInfo: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 14,
    color: colors.gray300,
  },
  subscriptionsList: {
    gap: 12,
  },
  subscriptionItem: {
    backgroundColor: colors.gray700,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  subscriptionHeader: {
    marginBottom: 8,
  },
  subscriptionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    flex: 1,
  },
  subscriptionNumber: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  subscriptionNumberText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  subscriptionDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray300,
  },
  detailValue: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "500",
  },
  noSubscriptionsContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  noSubscriptionsText: {
    fontSize: 14,
    color: colors.gray300,
    textAlign: "center",
    marginTop: 12,
  },
});
