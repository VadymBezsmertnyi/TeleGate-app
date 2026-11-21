import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.blue950,
    borderRadius: 16,
    margin: 20,
    maxHeight: "80%",
    minHeight: 400,
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
  // Groups styles
  groupsContainer: {
    gap: 12,
  },
  groupItem: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedGroup: {
    borderColor: colors.successGreen,
    backgroundColor: colors.gray600,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  groupType: {
    fontSize: 12,
    color: colors.gray300,
    marginBottom: 2,
    textTransform: "capitalize",
  },
  groupMembers: {
    fontSize: 11,
    color: colors.gray400,
  },
  // Templates styles
  templatesContainer: {
    gap: 12,
  },
  templateItem: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedTemplate: {
    borderColor: colors.successGreen,
    backgroundColor: colors.gray600,
  },
  templateName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  templateContent: {
    fontSize: 12,
    color: colors.gray300,
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 11,
    color: colors.gray400,
    fontStyle: "italic",
  },
  noTemplatesText: {
    fontSize: 14,
    color: colors.gray400,
    textAlign: "center",
    fontStyle: "italic",
  },
  textInput: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    fontSize: 14,
    minHeight: 100,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  previewContainer: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  previewText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
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
