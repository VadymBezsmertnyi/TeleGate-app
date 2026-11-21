import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 16,
    textAlign: "center",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    color: colors.gray300,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.blue900,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "48%",
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.eminence,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray300,
    textAlign: "center",
  },
  chartSection: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 12,
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: colors.blue900,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  chart: {
    borderRadius: 16,
  },
});
