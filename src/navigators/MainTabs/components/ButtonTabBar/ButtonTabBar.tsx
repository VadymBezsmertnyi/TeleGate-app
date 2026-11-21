import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// styles
import colors from "../../../../styles/colors";
import styles from "./ButtonTabBar.styles";

type ButtonTabBarProps = {
  name: string;
  isActive: boolean;
  isReset: boolean;
  icon: string;
  onPress: () => void;
};

const ButtonTabBar: FunctionComponent<ButtonTabBarProps> = ({
  name,
  isActive,
  isReset = false,
  icon,
  onPress,
}) => {
  const color = useMemo(
    () => (isActive ? colors.white : colors.gray500),
    [isActive]
  );

  return (
    <TouchableOpacity
      disabled={isActive && !isReset}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.containerIcon}>
        <Ionicons name={icon as any} size={32} color={color} />
      </View>
      <Text style={[styles.label, { color }]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ButtonTabBar;
