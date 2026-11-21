import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// styles
import { styles } from "./DropdownMenu.styles";
import colors from "../../../../../styles/colors";

interface DropdownMenuProps {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  value,
  options,
  onSelect,
  placeholder,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.dropdownButton, disabled && styles.dropdownButtonDisabled]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.dropdownButtonText, disabled && styles.dropdownButtonTextDisabled]}>
          {value || placeholder}
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={disabled ? colors.gray500 : colors.gray400} 
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.dropdownList}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownItem,
                    value === option && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelect(option)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      value === option && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  {value === option && (
                    <Ionicons name="checkmark" size={20} color={colors.blue500} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DropdownMenu;
