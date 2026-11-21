import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 10,
  },
  usersList: {
    flex: 1,
  },
  usersListContainer: {
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
  },
  emptyIcon: {
    marginBottom: 16,
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
  infoText: {
    fontSize: 14,
    color: colors.blue400,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  botSetupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue500,
    marginTop: 12,
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

export { styles };
