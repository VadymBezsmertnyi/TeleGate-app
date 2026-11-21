import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
  },
  overviewSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activeIcon: {
    backgroundColor: colors.successGreen,
  },
  expiredIcon: {
    backgroundColor: colors.errorRed,
  },
  cardLabel: {
    fontSize: 14,
    color: colors.gray400,
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  positiveChange: {
    color: colors.successGreen,
  },
  negativeChange: {
    color: colors.errorRed,
  },
  chartSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  chart: {
    borderRadius: 12,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "48%",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: colors.gray400,
  },
  listSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.eminence,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: colors.gray400,
  },
  developmentOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  overlayContent: {
    backgroundColor: colors.gray800,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    maxWidth: 320,
    width: "100%",
  },
  overlayIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.eminence,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginBottom: 12,
  },
  overlayDescription: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  feedbackButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.eminence,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  feedbackButtonIcon: {
    marginRight: 8,
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

export default styles;
