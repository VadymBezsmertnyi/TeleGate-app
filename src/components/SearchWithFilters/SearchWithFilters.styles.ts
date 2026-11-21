import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.white,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray800,
  },
  filterChipActive: {
    backgroundColor: colors.gray300,
  },
  filterChipText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
});
