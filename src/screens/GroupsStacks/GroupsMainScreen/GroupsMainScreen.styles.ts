import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 10,
  },
  groupsList: {
    flex: 1,
  },
  groupsListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray300,
    textAlign: "center",
    lineHeight: 20,
  },
  botSetupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue500,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botSetupButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginLeft: 8,
  },
});
