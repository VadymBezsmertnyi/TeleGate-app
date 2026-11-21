import React, { FC, ReactNode } from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// constants
import { GRADIENT_DIRECTIONS } from "./GradientBackground.constants";

// styles
import styles from "./GradientBackground.styles";

type GradientBackgroundProps = {
  children: ReactNode;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
};

const GradientBackground: FC<GradientBackgroundProps> = ({
  children,
  colors = ["#000000", "#1a1a1a", "#2d2d2d"],
  start = GRADIENT_DIRECTIONS.TOP_TO_BOTTOM.start,
  end = GRADIENT_DIRECTIONS.TOP_TO_BOTTOM.end,
  style,
}) => (
  <View style={[styles.container, style]}>
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  </View>
);

export default GradientBackground;
