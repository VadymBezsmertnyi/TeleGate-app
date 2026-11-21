import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT - 100,
    backgroundColor: colors.blue950,
  },
  handleStyle: {
    backgroundColor: colors.black,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray800,
    justifyContent: "center",
    alignItems: "center",
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray800,
    borderWidth: 1,
    borderColor: colors.gray500,
  },
  chipActive: {
    backgroundColor: colors.blue500,
    borderColor: colors.blue500,
  },
  chipText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: "600",
  },
  appliedFiltersContainer: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray800,
  },
  appliedFiltersList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  appliedFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.gray800,
  },
  appliedFilterText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "500",
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: colors.gray800,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.gray800,
  },
  resetButtonText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.gray800,
  },
  saveButtonText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  applyButton: {
    backgroundColor: colors.blue600,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
});
