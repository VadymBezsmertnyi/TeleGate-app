import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  Modal,
  TouchableOpacity,
  Animated,
  ViewStyle,
  StyleProp,
  Platform,
} from "react-native";

// providers
import { useKeyboardProvider } from "../../providers/KeyboardProvider/KeyboardProvider";

// styles
import styles from "./ModalUniversal.styles";

type ModalUniversalProps = {
  children: React.ReactNode;
  visible?: boolean;
  transparent?: boolean;
  isHide?: boolean;
  onClose: () => void;
  isInputs?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
};

const ModalUniversal: FunctionComponent<ModalUniversalProps> = ({
  children,
  visible = true,
  transparent = true,
  isHide = false,
  onClose,
  isInputs,
  styleContainer,
}) => {
  const { showKeyboard } = useKeyboardProvider();
  const scaleModal = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const hideAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleModal, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(onClose);
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleModal, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    if (isHide) hideAnimation();
    else startAnimation();
  }, [isHide]);

  useEffect(() => {
    if (!isInputs || Platform.OS === "android") return;

    if (showKeyboard)
      Animated.timing(translateY, {
        toValue: -120,
        duration: 200,
        useNativeDriver: true,
      }).start();
    else
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
  }, [isInputs, showKeyboard]);

  return (
    <Modal visible={visible} transparent={transparent}>
      <Animated.View
        style={[
          styles.container,
          styleContainer,
          {
            transform: [
              {
                translateY,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backgroundButton}
          onPress={() => {
            hideAnimation();
          }}
        />
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: scaleModal,
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ModalUniversal;
