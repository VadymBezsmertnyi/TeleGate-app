import React, { FC, useRef, useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import { Image } from "expo-image";

// styles
import styles from "./LogoLoader.styles";

const LogoLoader: FC = () => {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const outerRotationAnim = useRef(new Animated.Value(0)).current;

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const outerSpin = outerRotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
      Animated.loop(
        Animated.timing(outerRotationAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, [rotationAnim, outerRotationAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={require("../../../../../assets/icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <Animated.View
        style={[
          styles.progressRing,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.outerRing,
          {
            transform: [{ rotate: outerSpin }],
          },
        ]}
      />
    </View>
  );
};

export default LogoLoader;
