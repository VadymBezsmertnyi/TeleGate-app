import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray900,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 120,
  },
  dropdownButtonDisabled: {
    opacity: 0.5,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  dropdownButtonTextDisabled: {
    color: colors.gray500,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    maxWidth: 300,
    width: "80%",
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownItemSelected: {
    backgroundColor: colors.blue500,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.white,
  },
  dropdownItemTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
});
