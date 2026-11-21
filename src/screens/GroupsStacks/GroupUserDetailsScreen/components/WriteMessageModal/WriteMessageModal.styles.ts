import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
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
  recipientInfo: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  recipientUsername: {
    fontSize: 14,
    color: colors.gray300,
  },
  groupInfo: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
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
