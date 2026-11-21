import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import colors from "../../styles/colors";
import styles from "./CustomHeader.styles";

type CustomHeaderProps = {
  title: string;
  showBackButton?: boolean;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: top || 10 }]}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {showBackButton ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={24} color={colors.white} />
            </TouchableOpacity>
          ) : leftIcon ? (
            <TouchableOpacity style={styles.leftButton} onPress={onLeftPress}>
              {leftIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightContainer}>
          {rightIcon ? (
            <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
