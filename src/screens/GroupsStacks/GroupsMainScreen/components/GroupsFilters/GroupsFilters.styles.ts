import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.blue950,
  },
  handleStyle: {
    backgroundColor: colors.gray800,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    flex: 1,
    height: HEIGHT - 100,
    backgroundColor: colors.blue950,
    borderRadius: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appliedFiltersContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  appliedFiltersList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  appliedFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray800,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  appliedFilterText: {
    fontSize: 12,
    color: colors.white,
  },
  removeFilterButton: {
    padding: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.gray800,
    borderWidth: 1,
    borderColor: colors.gray500,
  },
  filterButtonActive: {
    backgroundColor: colors.gray300,
    borderColor: colors.gray300,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: colors.black,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray800,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray500,
  },
  datePickerButtonText: {
    fontSize: 14,
    color: colors.gray300,
  },
  footerContainer: {
    paddingBottom: 70,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray800,
  },
  resetButton: {
    paddingVertical: 8,
  },
  resetButtonText: {
    fontSize: 14,
    color: colors.gray300,
    textDecorationLine: "underline",
  },
  saveButton: {
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 14,
    color: colors.gray300,
    textDecorationLine: "underline",
  },
  applyButton: {
    backgroundColor: colors.gray800,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
