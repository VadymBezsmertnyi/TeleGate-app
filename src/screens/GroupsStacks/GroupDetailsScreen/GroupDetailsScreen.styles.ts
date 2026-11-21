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
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.eminence,
    marginRight: 16,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  headerInfo: {
    flex: 1,
  },
  headerMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.gray300,
  },
  statusChipDisconnected: {
    backgroundColor: colors.gray800,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  typeChip: {
    backgroundColor: colors.gray700,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: colors.gray300,
    fontSize: 10,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray300,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.gray300,
  },
  infoValue: {
    fontSize: 14,
    color: colors.white,
  },
  infoText: {
    fontSize: 14,
    color: colors.white,
    flex: 1,
  },
  addedByRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
    gap: 12,
  },
  addedByName: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "500",
    flex: 1,
  },
  addedByUsername: {
    fontSize: 12,
    color: colors.gray400,
    fontStyle: "italic",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    width: "48%",
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: colors.gray300,
    fontWeight: "500",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 10,
    color: colors.gray400,
    lineHeight: 14,
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionsGrid: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray700,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButtonContent: {
    flex: 1,
    gap: 4,
  },
  actionButtonIconTitle: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 6,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  actionButtonDescription: {
    fontSize: 12,
    color: colors.gray400,
    lineHeight: 16,
  },
});
