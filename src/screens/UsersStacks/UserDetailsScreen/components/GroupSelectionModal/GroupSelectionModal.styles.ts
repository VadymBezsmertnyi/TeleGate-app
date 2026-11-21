import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.blue950,
    borderRadius: 16,
    minHeight: 500,
    width: WIDTH - 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
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
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 12,
  },
  userInfo: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
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
  groupsList: {
    gap: 8,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray700,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  groupItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.gray600,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
  selectedIndicator: {
    marginLeft: 12,
  },
  noGroupsContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  noGroupsText: {
    fontSize: 14,
    color: colors.gray300,
    textAlign: "center",
    marginTop: 12,
  },
  textInput: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    fontSize: 14,
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.gray600,
    textAlignVertical: "top",
  },
  characterCount: {
    fontSize: 12,
    color: colors.gray400,
    textAlign: "right",
    marginTop: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.gray600,
  },
  sendButton: {
    backgroundColor: colors.successGreen,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray600,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

export { styles };
