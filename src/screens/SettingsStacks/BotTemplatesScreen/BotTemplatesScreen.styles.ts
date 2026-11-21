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

  // Loading styles
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: colors.white,
    marginTop: 16,
  },

  // Empty state styles
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  createFirstButton: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  createFirstButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },

  // Template card styles
  templateCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },

  // Template header styles
  templateHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  templateHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  templateHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  infoButton: {
    padding: 2,
  },
  usageCount: {
    fontSize: 14,
    color: colors.gray400,
    backgroundColor: colors.gray700,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Template description styles
  templateDescription: {
    fontSize: 14,
    color: colors.gray300,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  // Tags styles
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tag: {
    backgroundColor: colors.gray700,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.gray300,
  },

  // Template content styles (expanded)
  templateContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageInput: {
    backgroundColor: colors.gray900,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.white,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },

  // Template action buttons styles
  templateActions: {
    flexDirection: "row",
    gap: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.gray700,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.gray700,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.red500,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.red500,
  },

  // Footer styles
  footer: {
    backgroundColor: colors.gray800,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
