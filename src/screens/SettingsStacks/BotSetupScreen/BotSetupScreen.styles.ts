import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
  },
  botInfoSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  botAvatarContainer: {
    marginBottom: 16,
  },
  botAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.blue500,
  },
  botName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  botUsername: {
    fontSize: 16,
    color: colors.blue400,
    marginBottom: 8,
  },
  botDescription: {
    fontSize: 14,
    color: colors.gray300,
    textAlign: "center",
  },
  instructionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.blue500,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 12,
  },
  botButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blue500,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  botButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginLeft: 8,
  },
  usersInfoSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  permissionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 12,
  },
  noteSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  developmentSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  noteText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
  },
});
