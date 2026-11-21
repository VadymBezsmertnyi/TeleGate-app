import React, { FC } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// styles
import { styles } from "./SearchWithFilters.styles";
import colors from "../../styles/colors";

type FilterItemT = {
  value: string;
  label: string;
};

export interface SearchWithFiltersProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
  filters?: Array<FilterItemT>;
  activeFilter?: string;
  onFilterChange?: (filterValue: string) => void;
  testID?: string;
}

const SearchWithFilters: FC<SearchWithFiltersProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
  filters = [],
  activeFilter,
  onFilterChange,
  testID = "SearchWithFilters",
}) => {
  const renderFilterChip = (filter: FilterItemT) => (
    <TouchableOpacity
      testID={`${testID}-FilterChip-${filter.label}`}
      style={[
        styles.filterChip,
        activeFilter === filter.value && styles.filterChipActive,
      ]}
      onPress={() => onFilterChange?.(filter.value)}
    >
      <Text style={styles.filterChipText}>{filter.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View testID={testID}>
      <View style={styles.searchContainer}>
        <TextInput
          testID={`${testID}-SearchInput`}
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.gray300}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {filters.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <View key={filter.value}>{renderFilterChip(filter)}</View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchWithFilters;
