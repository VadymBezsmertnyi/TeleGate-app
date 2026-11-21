import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// constants
import { languages } from "../../../../../../localization/localization.const";

// types
import { LanguageT } from "../../../../../../localization/localization.types";

// styles
import { styles } from "./LanguageModal.styles";
import colors from "../../../../../styles/colors";
import { Image } from "expo-image";

type LanguageModalProps = {
  currentLanguage: LanguageT;
  onClose: () => void;
};

const LanguageModal: FC<LanguageModalProps> = ({
  currentLanguage,
  onClose,
}) => {
  const { i18n, setLanguage } = useLocalesProvider();

  const handleLanguageSelect = async (language: LanguageT) => {
    try {
      await setLanguage(language);
      onClose();
    } catch (error) {
      console.warn("Failed to change language:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n._("Language")}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.languagesList}
        showsVerticalScrollIndicator={false}
      >
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.key}
            style={[
              styles.languageItem,
              currentLanguage === lang.key && styles.languageItemActive,
            ]}
            onPress={() => handleLanguageSelect(lang.key)}
          >
            <View style={styles.languageItemLeft}>
              <Image source={lang.icon} style={styles.languageIcon} />
              <View style={styles.languageText}>
                <Text style={styles.languageTitle}>{lang.title}</Text>
                <Text style={styles.languageNative}>{lang.native}</Text>
              </View>
            </View>
            {currentLanguage === lang.key && (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={20} color={colors.white} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LanguageModal;
