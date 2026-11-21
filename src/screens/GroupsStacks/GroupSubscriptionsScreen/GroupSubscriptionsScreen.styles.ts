import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 16,
    textAlign: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "center",
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: colors.gray400,
    textAlign: "center",
    fontStyle: "italic",
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subscriptionItem: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  subscriptionContent: {
    flex: 1,
    padding: 12,
  },
  subscriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  subscriptionTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 2,
  },
  subscriptionDescription: {
    fontSize: 13,
    color: colors.gray300,
    fontStyle: "italic",
  },
  subscriptionPriceContainer: {
    alignItems: "flex-end",
  },
  subscriptionPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  subscriptionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subscriptionTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subscriptionType: {
    fontSize: 11,
    color: colors.gray400,
    marginLeft: 4,
    fontWeight: "500",
  },
  subscriptionStats: {
    alignItems: "flex-end",
  },
  subscriptionStatsText: {
    fontSize: 11,
    color: colors.gray500,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
