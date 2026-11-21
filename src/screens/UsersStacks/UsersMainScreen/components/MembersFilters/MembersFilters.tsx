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
import { styles } from "./MembersFilters.styles";
import colors from "../../../../../styles/colors";

type StatusT =
  | "creator"
  | "administrator"
  | "member"
  | "restricted"
  | "left"
  | "kicked";

type CapabilityT =
  | "canJoinGroups"
  | "canReadAllGroupMessages"
  | "supportsInlineQueries";

export interface MembersFiltersState {
  status?: StatusT;
  isBot?: boolean;
  createdFrom?: string;
  createdTo?: string;
  languageCode?: string;
  canJoinGroups?: boolean;
  canReadAllGroupMessages?: boolean;
  supportsInlineQueries?: boolean;
}

export interface MembersFiltersProps {
  visible: boolean;
  onClose: () => void;
  filters: MembersFiltersState;
  onApplyFilters: (filters: MembersFiltersState) => void;
  onResetFilters: () => void;
}

const MembersFilters: FC<MembersFiltersProps> = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const [localFilters, setLocalFilters] =
    useState<MembersFiltersState>(filters);

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

  const getAppliedFiltersCount = () => {
    let count = 0;
    if (localFilters.status) count++;
    if (localFilters.isBot !== undefined) count++;
    if (localFilters.createdFrom || localFilters.createdTo) count++;
    if (localFilters.languageCode) count++;
    if (localFilters.canJoinGroups !== undefined) count++;
    if (localFilters.canReadAllGroupMessages !== undefined) count++;
    if (localFilters.supportsInlineQueries !== undefined) count++;
    return count;
  };

  const getAppliedFiltersLabels = () => {
    const labels: string[] = [];
    if (localFilters.status) labels.push(localFilters.status);
    if (localFilters.isBot !== undefined)
      labels.push(localFilters.isBot ? "Bot" : "User");
    if (localFilters.createdFrom || localFilters.createdTo)
      labels.push("Date Range");
    if (localFilters.languageCode)
      labels.push(`Language: ${localFilters.languageCode}`);
    if (localFilters.canJoinGroups !== undefined)
      labels.push(
        localFilters.canJoinGroups ? "Can Join Groups" : "Cannot Join Groups"
      );
    if (localFilters.canReadAllGroupMessages !== undefined)
      labels.push(
        localFilters.canReadAllGroupMessages
          ? "Can Read All Messages"
          : "Cannot Read All Messages"
      );
    if (localFilters.supportsInlineQueries !== undefined)
      labels.push(
        localFilters.supportsInlineQueries
          ? "Supports Inline Queries"
          : "No Inline Queries"
      );
    return labels;
  };

  const handleStatusChange = (status: StatusT) => {
    setLocalFilters((prev) => ({
      ...prev,
      status: prev.status === status ? undefined : status,
    }));
  };

  const handleBotStatusChange = (isBot: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      isBot: prev.isBot === isBot ? undefined : isBot,
    }));
  };

  const handleLanguageChange = (languageCode: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      languageCode:
        prev.languageCode === languageCode ? undefined : languageCode,
    }));
  };

  const handleCapabilityChange = (capability: CapabilityT, value: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      [capability]: prev[capability] === value ? undefined : value,
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
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderStatusSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Status")}</Text>
      <View style={styles.chipContainer}>
        {[
          { value: "creator", label: i18n._("Creator") },
          { value: "administrator", label: i18n._("Administrator") },
          { value: "member", label: i18n._("Member") },
          { value: "restricted", label: i18n._("Restricted") },
          { value: "left", label: i18n._("Left") },
          { value: "kicked", label: i18n._("Kicked") },
        ].map((status) => (
          <TouchableOpacity
            key={status.value}
            style={[
              styles.chip,
              localFilters.status === status.value && styles.chipActive,
            ]}
            onPress={() => handleStatusChange(status.value as StatusT)}
          >
            <Text
              style={[
                styles.chipText,
                localFilters.status === status.value && styles.chipTextActive,
              ]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBotStatusSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("User Type")}</Text>
      <View style={styles.chipContainer}>
        {[
          { value: false, label: i18n._("Regular User") },
          { value: true, label: i18n._("Bot") },
        ].map((type) => (
          <TouchableOpacity
            key={type.value.toString()}
            style={[
              styles.chip,
              localFilters.isBot === type.value && styles.chipActive,
            ]}
            onPress={() => handleBotStatusChange(type.value)}
          >
            <Text
              style={[
                styles.chipText,
                localFilters.isBot === type.value && styles.chipTextActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderLanguageSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Language")}</Text>
      <View style={styles.chipContainer}>
        {[
          { value: "en", label: "English" },
          { value: "uk", label: "Українська" },
          { value: "ru", label: "Русский" },
          { value: "es", label: "Español" },
          { value: "fr", label: "Français" },
          { value: "de", label: "Deutsch" },
        ].map((lang) => (
          <TouchableOpacity
            key={lang.value}
            style={[
              styles.chip,
              localFilters.languageCode === lang.value && styles.chipActive,
            ]}
            onPress={() => handleLanguageChange(lang.value)}
          >
            <Text
              style={[
                styles.chipText,
                localFilters.languageCode === lang.value &&
                  styles.chipTextActive,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCapabilitiesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Capabilities")}</Text>
      <View style={styles.chipContainer}>
        {[
          { key: "canJoinGroups", label: i18n._("Can Join Groups") },
          {
            key: "canReadAllGroupMessages",
            label: i18n._("Can Read All Messages"),
          },
          {
            key: "supportsInlineQueries",
            label: i18n._("Supports Inline Queries"),
          },
        ].map((capability) => (
          <TouchableOpacity
            key={capability.key}
            style={[
              styles.chip,
              localFilters[capability.key as keyof MembersFiltersState] ===
                true && styles.chipActive,
            ]}
            onPress={() =>
              handleCapabilityChange(capability.key as CapabilityT, true)
            }
          >
            <Text
              style={[
                styles.chipText,
                localFilters[capability.key as keyof MembersFiltersState] ===
                  true && styles.chipTextActive,
              ]}
            >
              {capability.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCreatedDateSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{i18n._("Created Date")}</Text>
      <View style={styles.chipContainer}>
        {[
          { value: "7d", label: i18n._("Last 7 days") },
          { value: "30d", label: i18n._("Last 30 days") },
          { value: "90d", label: i18n._("Last 90 days") },
          { value: "1y", label: i18n._("Last year") },
        ].map((range) => (
          <TouchableOpacity
            key={range.value}
            style={[
              styles.chip,
              (localFilters.createdFrom || localFilters.createdTo) &&
                styles.chipActive,
            ]}
            onPress={() => {
              const now = new Date();
              let fromDate: Date;

              switch (range.value) {
                case "7d":
                  fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  break;
                case "30d":
                  fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                  break;
                case "90d":
                  fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                  break;
                case "1y":
                  fromDate = new Date(
                    now.getTime() - 365 * 24 * 60 * 60 * 1000
                  );
                  break;
                default:
                  fromDate = now;
              }

              setLocalFilters((prev) => ({
                ...prev,
                createdFrom: fromDate.toISOString(),
                createdTo: now.toISOString(),
              }));
            }}
          >
            <Text
              style={[
                styles.chipText,
                (localFilters.createdFrom || localFilters.createdTo) &&
                  styles.chipTextActive,
              ]}
            >
              {range.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (!visible) return null;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["95%"]}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
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
              "Only members matching all selected criteria will be shown."
            )}
          </Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {renderAppliedFilters()}
          {renderStatusSection()}
          {renderBotStatusSection()}
          {renderLanguageSection()}
          {renderCapabilitiesSection()}
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

export default MembersFilters;
