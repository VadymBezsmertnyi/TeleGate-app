import React, { FC, useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// styles
import { styles } from "./DevelopmentBanner.styles";
import colors from "../../styles/colors";

const DevelopmentBanner: FC = () => {
  const { i18n } = useLocalesProvider();
  const scrollX = useRef(new Animated.Value(0)).current;

  const message = i18n._(
    "This app is in development stage. Some features may not work or work incorrectly, but if you take a subscription and send us feedback, it will speed up product development."
  );

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -3100,
          duration: 30000,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, [scrollX]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        <Text style={styles.text} numberOfLines={1}>
          {message}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

export default DevelopmentBanner;
