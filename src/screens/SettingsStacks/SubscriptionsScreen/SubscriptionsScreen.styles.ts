import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  compareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  compareButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  subscriptionCards: {
    gap: 16,
  },
  subscriptionCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 20,
  },
  activeSubscriptionCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.blue500,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray700,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitleSection: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  currentPlanBadge: {
    backgroundColor: colors.gray600,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  currentPlanText: {
    fontSize: 12,
    color: colors.gray300,
    fontWeight: "500",
  },
  upgradeBadge: {
    backgroundColor: colors.blue500,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  upgradeBadgeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "500",
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 16,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 8,
  },
  upgradeButton: {
    backgroundColor: colors.gray700,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    padding: 16,
  },
});
