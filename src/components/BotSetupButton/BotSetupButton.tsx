import React, { FC } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./BotSetupButton.styles";
import colors from "../../styles/colors";

type BotSetupButtonProps = {
  size?: number;
  color?: string;
};

const BotSetupButton: FC<BotSetupButtonProps> = ({
  size = 24,
  color = colors.white,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { width: size, height: size }]}>
        <Ionicons
          name="hardware-chip"
          size={size * 0.6}
          color={color}
          style={styles.chipIcon}
        />
        <Ionicons
          name="settings"
          size={size * 0.4}
          color={color}
          style={styles.settingsIcon}
        />
      </View>
    </View>
  );
};

export default BotSetupButton;
