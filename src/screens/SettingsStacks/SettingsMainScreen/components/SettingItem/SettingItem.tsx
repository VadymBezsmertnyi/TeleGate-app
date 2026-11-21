import React, { FC } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";

// styles
import { styles } from "./SettingItem.styles";
import colors from "../../../../../styles/colors";

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isDestructive?: boolean;
};

const SettingItem: FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  isDestructive = false,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={showSwitch}
  >
    <View style={styles.settingItemLeft}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.settingItemText}>
        <Text
          style={[
            styles.settingItemTitle,
            isDestructive && styles.settingItemTitleDestructive,
          ]}
        >
          {title}
        </Text>
        {subtitle && <Text style={styles.settingItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.settingItemRight}>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.gray800, true: colors.blue500 }}
          thumbColor={switchValue ? colors.white : colors.gray300}
        />
      ) : showArrow ? (
        <View style={styles.arrowIcon}>
          <View
            style={[
              styles.arrowIconInner,
              isDestructive && styles.arrowIconInnerDestructive,
            ]}
          />
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

export default SettingItem;
