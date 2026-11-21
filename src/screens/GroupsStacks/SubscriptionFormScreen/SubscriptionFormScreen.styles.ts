import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  formContainer: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  pickerButton: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray600,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.blue,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray600,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  submitButtonTextDisabled: {
    color: colors.gray400,
  },
  // Modal styles
  modalContainer: {
    backgroundColor: colors.gray800,
    borderRadius: 16,
    width: screenWidth - 64,
    maxHeight: screenHeight * 0.6,
    borderWidth: 1,
    borderColor: colors.gray700,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray700,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  modalOptionSelected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  modalOptionText: {
    maxWidth: "85%",
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  modalOptionTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
  separator: {
    alignItems: "center",
    marginVertical: 8,
  },
  separatorLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.gray600,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currencySymbol: {
    fontSize: 14,
    color: colors.gray400,
    fontWeight: "500",
  },
  currencySymbolSelected: {
    color: colors.white,
  },
  currencyCode: {
    fontSize: 12,
    color: colors.gray400,
    fontWeight: "400",
    marginTop: 2,
  },
  currencyCodeSelected: {
    color: colors.white,
  },
  currencyOriginalName: {
    fontSize: 10,
    color: colors.gray500,
    fontWeight: "400",
    marginTop: 1,
    fontStyle: "italic",
  },
  currencyOriginalNameSelected: {
    color: colors.gray300,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray700,
    borderRadius: 8,
    margin: 4,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
    paddingVertical: 12,
  },
  clearSearchButton: {
    padding: 4,
  },
});
