import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.gray800,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    maxHeight: "90%",
  },

  // Header styles
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  closeButton: {
    padding: 4,
  },

  // Body styles
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  // Input group styles
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.gray900,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  // Variables styles
  variablesDescription: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 12,
  },
  variablesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  variableButton: {
    backgroundColor: colors.gray900,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  variableButtonActive: {
    backgroundColor: colors.blue500,
    borderColor: colors.blue500,
  },
  variableButtonText: {
    fontSize: 14,
    color: colors.gray300,
  },
  variableButtonTextActive: {
    color: colors.white,
    fontWeight: "500",
  },

  // Example styles
  exampleContainer: {
    backgroundColor: colors.gray900,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  exampleText: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
  },

  // Footer styles
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray700,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.blue500,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
