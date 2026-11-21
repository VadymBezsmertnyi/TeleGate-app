import React, { FC, useRef, useEffect } from "react";
import { View, Animated } from "react-native";

// styles
import styles from "./PointsLoader.styles";

const PointsLoader: FC = () => {
  const point1Anim = useRef(new Animated.Value(0.2)).current;
  const point2Anim = useRef(new Animated.Value(0.2)).current;
  const point3Anim = useRef(new Animated.Value(0.2)).current;

  const animatePoints = () => {
    const animation1 = Animated.sequence([
      Animated.timing(point1Anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(point1Anim, {
        toValue: 0.2,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    const animation2 = Animated.sequence([
      Animated.delay(300),
      Animated.timing(point2Anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(point2Anim, {
        toValue: 0.2,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    const animation3 = Animated.sequence([
      Animated.delay(600),
      Animated.timing(point3Anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(point3Anim, {
        toValue: 0.2,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    Animated.parallel([animation1, animation2, animation3]).start();
  };

  useEffect(() => {
    animatePoints();

    const interval = setInterval(animatePoints, 1500);

    return () => clearInterval(interval);
  }, [point1Anim, point2Anim, point3Anim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.point,
          {
            opacity: point1Anim,
            transform: [
              {
                scale: point1Anim.interpolate({
                  inputRange: [0.2, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.point,
          {
            opacity: point2Anim,
            transform: [
              {
                scale: point2Anim.interpolate({
                  inputRange: [0.2, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.point,
          {
            opacity: point3Anim,
            transform: [
              {
                scale: point3Anim.interpolate({
                  inputRange: [0.2, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default PointsLoader;
