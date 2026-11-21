import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
  },
  tableScrollView: {
    marginBottom: 20,
  },
  comparisonTable: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  featureColumn: {
    width: 140,
    justifyContent: "center",
  },
  planColumn: {
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
    flexWrap: "nowrap",
  },
  activeColumnTitle: {
    color: colors.green500,
  },
  featureName: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "500",
    flexWrap: "nowrap",
  },
  featureValue: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "500",
    flexWrap: "nowrap",
  },
  upgradeButtons: {
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  upgradeButton: {
    backgroundColor: colors.gray700,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  disabledButton: {
    backgroundColor: colors.gray600,
    opacity: 0.6,
  },
  upgradeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  disabledButtonText: {
    color: colors.gray300,
  },
  footer: {
    padding: 16,
  },
});
