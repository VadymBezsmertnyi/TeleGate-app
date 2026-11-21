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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 16,
  },
  
  // Template button styles
  templateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  templateButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  templateButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  
  // Setting row styles
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  
  // Input field styles
  inputField: {
    backgroundColor: colors.gray900,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.white,
    minWidth: 100,
    textAlign: "right",
  },
  inputWithCopy: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  copyButton: {
    padding: 4,
  },
  

  
  // Interval buttons styles
  intervalButtons: {
    flexDirection: "row",
    gap: 8,
  },
  intervalButton: {
    backgroundColor: colors.gray900,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 50,
    alignItems: "center",
  },
  intervalButtonActive: {
    backgroundColor: colors.blue500,
  },
  intervalButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray300,
  },
  intervalButtonTextActive: {
    color: colors.white,
  },
  
  // Test button styles
  testButton: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  testButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  
  // Footer styles
  footer: {
    backgroundColor: colors.gray800,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  footerButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  discardButton: {
    flex: 1,
    backgroundColor: colors.gray900,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  discardButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray300,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.blue500,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },

});
