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
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray300,
    marginLeft: 8,
  },
  subscriptionsList: {
    gap: 8,
  },
  subscriptionItem: {
    backgroundColor: colors.gray700,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray600,
    position: "relative",
  },
  subscriptionItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.gray600,
  },
  subscriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    flex: 1,
    marginRight: 12,
  },
  subscriptionPrice: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  subscriptionDetails: {
    gap: 2,
  },
  durationText: {
    fontSize: 14,
    color: colors.gray300,
  },
  descriptionText: {
    fontSize: 13,
    color: colors.gray400,
    lineHeight: 18,
  },
  selectedIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray600,
  },
  giveButton: {
    backgroundColor: colors.successGreen,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  giveButtonDisabled: {
    backgroundColor: colors.gray600,
  },
  giveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
