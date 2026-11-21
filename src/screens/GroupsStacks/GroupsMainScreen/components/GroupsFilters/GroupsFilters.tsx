import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// styles
import { styles } from "./GroupsFilters.styles";
import colors from "../../../../../styles/colors";

export interface GroupsFiltersState {
  botStatus?: "connected" | "disconnected";
  membersFrom?: number;
  membersTo?: number;
  activity?: "active_7d" | "active_30d" | "inactive";
  createdFrom?: string;
  createdTo?: string;
}

export interface GroupsFiltersProps {
  visible: boolean;
  onClose: () => void;
  filters: GroupsFiltersState;
  onApplyFilters: (filters: GroupsFiltersState) => void;
  onResetFilters: () => void;
}

const GroupsFilters: FC<GroupsFiltersProps> = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const [localFilters, setLocalFilters] = useState<GroupsFiltersState>(filters);

  // Bottom sheet refs
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Open/close bottom sheet based on visible prop
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const getAppliedFiltersLabels = () => {
    const labels: string[] = [];

    if (localFilters.botStatus === "connected") {
      labels.push(i18n._("Connected"));
    } else if (localFilters.botStatus === "disconnected") {
      labels.push(i18n._("Disconnected"));
    }

    if (localFilters.membersFrom || localFilters.membersTo) {
      if (localFilters.membersFrom && localFilters.membersTo) {
        labels.push(
          `${localFilters.membersFrom}-${localFilters.membersTo} members`
        );
      } else if (localFilters.membersFrom) {
        labels.push(`>${localFilters.membersFrom} members`);
      } else if (localFilters.membersTo) {
        labels.push(`<${localFilters.membersTo} members`);
      }
    }

    if (localFilters.activity) {
      if (localFilters.activity === "active_7d") {
        labels.push(i18n._("Active (7d)"));
      } else if (localFilters.activity === "active_30d") {
        labels.push(i18n._("Active (30d)"));
      } else if (localFilters.activity === "inactive") {
        labels.push(i18n._("Inactive"));
      }
    }

    if (localFilters.createdFrom || localFilters.createdTo) {
      labels.push(i18n._("This month"));
    }

    return labels;
  };

  const handleBotStatusChange = (status: "connected" | "disconnected") => {
    setLocalFilters((prev) => ({
      ...prev,
      botStatus: prev.botStatus === status ? undefined : status,
    }));
  };

  const handleMembersRangeChange = (range: string) => {
    let membersFrom: number | undefined;
    let membersTo: number | undefined;

    switch (range) {
      case "<100":
        membersTo = 100;
        break;
      case "100-500":
        membersFrom = 100;
        membersTo = 500;
        break;
      case ">500":
        membersFrom = 500;
        break;
      case ">1k":
        membersFrom = 1000;
        break;
      default:
        membersFrom = undefined;
        membersTo = undefined;
    }

    setLocalFilters((prev) => ({
      ...prev,
      membersFrom,
      membersTo,
    }));
  };

  const handleActivityChange = (
    activity: "active_7d" | "active_30d" | "inactive"
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      activity: prev.activity === activity ? undefined : activity,
    }));
  };

  const handleReset = () => {
    setLocalFilters({});
    onResetFilters();
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    bottomSheetRef.current?.close();
  };

  const renderAppliedFilters = () => {
    const labels = getAppliedFiltersLabels();
    if (labels.length === 0) return null;

    return (
      <View style={styles.appliedFiltersContainer}>
        <Text style={styles.sectionTitle}>{i18n._("Applied Filters")}</Text>
        <View style={styles.appliedFiltersList}>
          {labels.map((label, index) => (
            <View key={index} style={styles.appliedFilterChip}>
              <Text style={styles.appliedFilterText}>{label}</Text>
              <TouchableOpacity
                style={styles.removeFilterButton}
                onPress={() => {
                  // Remove specific filter logic would go here
                  // For now, just reset all filters
                  handleReset();
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={16}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderBotStatusSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Bot Status")}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            localFilters.botStatus === "connected" && styles.filterButtonActive,
          ]}
          onPress={() => handleBotStatusChange("connected")}
        >
          <Text
            style={[
              styles.filterButtonText,
              localFilters.botStatus === "connected" &&
                styles.filterButtonTextActive,
            ]}
          >
            {i18n._("Connected")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            localFilters.botStatus === "disconnected" &&
              styles.filterButtonActive,
          ]}
          onPress={() => handleBotStatusChange("disconnected")}
        >
          <Text
            style={[
              styles.filterButtonText,
              localFilters.botStatus === "disconnected" &&
                styles.filterButtonTextActive,
            ]}
          >
            {i18n._("Disconnected")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMembersCountSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Members Count")}</Text>
      <View style={styles.buttonGroup}>
        {["<100", "100-500", ">500", ">1k"].map((range) => {
          const isActive =
            (range === "<100" && localFilters.membersTo === 100) ||
            (range === "100-500" &&
              localFilters.membersFrom === 100 &&
              localFilters.membersTo === 500) ||
            (range === ">500" && localFilters.membersFrom === 500) ||
            (range === ">1k" && localFilters.membersFrom === 1000);

          return (
            <TouchableOpacity
              key={range}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => handleMembersRangeChange(range)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.filterButtonTextActive,
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderActivitySection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{i18n._("Activity")}</Text>
        <MaterialCommunityIcons
          name="information-outline"
          size={16}
          color={colors.gray300}
        />
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            localFilters.activity === "active_7d" && styles.filterButtonActive,
          ]}
          onPress={() => handleActivityChange("active_7d")}
        >
          <Text
            style={[
              styles.filterButtonText,
              localFilters.activity === "active_7d" &&
                styles.filterButtonTextActive,
            ]}
          >
            {i18n._("Active (7d)")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            localFilters.activity === "active_30d" && styles.filterButtonActive,
          ]}
          onPress={() => handleActivityChange("active_30d")}
        >
          <Text
            style={[
              styles.filterButtonText,
              localFilters.activity === "active_30d" &&
                styles.filterButtonTextActive,
            ]}
          >
            {i18n._("Active (30d)")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            localFilters.activity === "inactive" && styles.filterButtonActive,
          ]}
          onPress={() => handleActivityChange("inactive")}
        >
          <Text
            style={[
              styles.filterButtonText,
              localFilters.activity === "inactive" &&
                styles.filterButtonTextActive,
            ]}
          >
            {i18n._("Inactive")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCreatedDateSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Created Date")}</Text>
      <TouchableOpacity style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>
          {i18n._("Select date range")}
        </Text>
        <MaterialCommunityIcons
          name="calendar"
          size={20}
          color={colors.gray300}
        />
      </TouchableOpacity>
    </View>
  );

  if (!visible) return null;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["95%"]}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleStyle={styles.handleStyle}
      handleComponent={() => null}
    >
      <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{i18n._("Filters")}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePress}
            >
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            {i18n._(
              "Only groups matching all selected criteria will be shown."
            )}
          </Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderAppliedFilters()}
          {renderBotStatusSection()}
          {renderMembersCountSection()}
          {renderActivitySection()}
          {renderCreatedDateSection()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>{i18n._("Reset")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                {i18n._("Save as view")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>
              {i18n._("Apply Filters")}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default GroupsFilters;
