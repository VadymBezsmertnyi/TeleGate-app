import React, { FC, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CurrencyList from "currency-list";

// types
import { GroupsStackParamListT } from "../../../navigators/GroupsStacks/GroupsStacks.types";
import { SubscriptionType } from "../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider.constants";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useGroupSubscriptionsProvider } from "../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider";

// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import ModalUniversal from "../../../components/ModalUniversal/ModalUniversal";

// constants
import { SUBSCRIPTION_TYPES_ENUM } from "../../../providers/GroupSubscriptionsProvider/GroupSubscriptionsProvider.constants";
import { defaultLanguage } from "../../../../localization/localization.const";

// styles
import { styles } from "./SubscriptionFormScreen.styles";
import colors from "../../../styles/colors";
import { LanguageT } from "../../../../localization/localization.types";

export type SubscriptionFormScreenPropsT = {
  route: RouteProp<GroupsStackParamListT, "SubscriptionForm">;
  navigation: NativeStackNavigationProp<
    GroupsStackParamListT,
    "SubscriptionForm"
  >;
};

export type SubscriptionFormDataT = {
  title: string;
  description: string;
  price: string;
  currency: string;
  type: SubscriptionType;
  duration: string;
};

const DEFAULT_FORM_DATA: SubscriptionFormDataT = {
  title: "",
  description: "",
  price: "",
  currency: CurrencyList.currencyList[defaultLanguage]?.["UAH"]?.code || "UAH",
  type: "monthly" as SubscriptionType,
  duration: "1",
};
const DEFAULT_CURRENCIES = ["UAH", "USD", "EUR"];

const getAvailableCurrencies = (language: LanguageT = defaultLanguage) => {
  const allCurrencies = CurrencyList.getAll(language);
  const currencyCodes = Object.keys(allCurrencies).sort();

  const defaultCurrencies = DEFAULT_CURRENCIES.filter((code) =>
    currencyCodes.includes(code)
  );

  const otherCurrencies = currencyCodes.filter(
    (code) => !DEFAULT_CURRENCIES.includes(code)
  );

  const allCurrencyCodes = [...defaultCurrencies, "---", ...otherCurrencies];

  return allCurrencyCodes.map((code) => {
    if (code === "---") return { code: "---", name: "---" };

    const currency = allCurrencies[code];
    return {
      code: code,
      name:
        (typeof currency.name === "string"
          ? currency.name
          : currency.name.name) || code,
      originalName:
        (typeof currency.name_plural === "string"
          ? currency.name_plural
          : currency.name_plural?.name) || code,
      symbol:
        (typeof currency.symbol === "string"
          ? currency.symbol
          : currency.symbol?.name) || code,
    };
  });
};

const SubscriptionFormScreen: FC<SubscriptionFormScreenPropsT> = ({
  route,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n, language } = useLocalesProvider();
  const { groupSubscriptions, create, update, listByGroup } =
    useGroupSubscriptionsProvider();
  const [formData, setFormData] =
    useState<SubscriptionFormDataT>(DEFAULT_FORM_DATA);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [currencySearchText, setCurrencySearchText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { groupId, subscriptionId, mode } = useMemo(
    () => route.params || {},
    [route.params]
  );
  const subscription = useMemo(() => {
    if (mode === "edit" && groupId && subscriptionId)
      return (
        groupSubscriptions[groupId]?.find(
          (sub) => sub._id === subscriptionId
        ) || null
      );

    return null;
  }, [mode, groupId, subscriptionId, groupSubscriptions]);
  const isEdit = useMemo(() => mode === "edit", [mode]);
  const isFormValid = useMemo(
    () =>
      formData.title.trim() !== "" &&
      formData.price.trim() !== "" &&
      parseFloat(formData.price) > 0 &&
      formData.duration.trim() !== "" &&
      parseInt(formData.duration) > 0,
    [formData]
  );

  const getTypeLabel = (type: SubscriptionType) => {
    switch (type) {
      case "daily":
        return i18n._("Daily");
      case "weekly":
        return i18n._("Weekly");
      case "monthly":
        return i18n._("Monthly");
      case "yearly":
        return i18n._("Yearly");
      default:
        return type;
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      !formData.price.trim() ||
      !formData.duration.trim()
    ) {
      Alert.alert(
        i18n._("Validation Error"),
        i18n._("Please fill in all required fields")
      );
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const subscriptionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        currency: formData.currency,
        type: formData.type,
        duration: parseInt(formData.duration),
        groupId,
      };

      if (isEdit && subscription?._id)
        await update(subscription._id, subscriptionData);
      else await create(subscriptionData);

      listByGroup(groupId);
      navigation.goBack();
    } catch (error) {
      console.warn("Error submitting subscription:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const selectCurrency = (currency: string) => {
    setFormData((prev) => ({ ...prev, currency }));
    setCurrencyModalVisible(false);
    setCurrencySearchText("");
  };

  const closeCurrencyModal = () => {
    setCurrencyModalVisible(false);
    setCurrencySearchText("");
  };

  const selectType = (type: SubscriptionType) => {
    setFormData((prev) => ({ ...prev, type }));
    setTypeModalVisible(false);
  };

  const getFilteredCurrencies = () => {
    const allCurrencies = getAvailableCurrencies(language);

    if (!currencySearchText.trim()) {
      return allCurrencies;
    }

    const searchLower = currencySearchText.toLowerCase();
    return allCurrencies.filter((currency) => {
      if (currency.code === "---") return true;

      return (
        currency.name.toLowerCase().includes(searchLower) ||
        currency.code.toLowerCase().includes(searchLower) ||
        (currency.originalName &&
          currency.originalName.toLowerCase().includes(searchLower))
      );
    });
  };

  useEffect(() => {
    if (subscription && isEdit) {
      setFormData({
        title: subscription.title || "",
        description: subscription.description || "",
        price: subscription.price?.toString() || "",
        currency: subscription.currency || "USD",
        type: (subscription.type || "monthly") as SubscriptionType,
        duration: subscription.duration?.toString() || "1",
      });
    }
  }, [subscription, isEdit]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setCurrencySearchText("");
      };
    }, [])
  );

  return (
    <GradientBackground>
      <CustomHeader
        title={
          isEdit ? i18n._("Edit Subscription") : i18n._("Create Subscription")
        }
        showBackButton
        onRightPress={handleSubmit}
      />
      <ScrollView
        style={[styles.container, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{i18n._("Name")} *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
              placeholder={i18n._("Enter subscription name")}
              placeholderTextColor={colors.gray400}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{i18n._("Description")}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, description: text }))
              }
              placeholder={i18n._("Enter subscription description")}
              placeholderTextColor={colors.gray400}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>{i18n._("Price")} *</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, price: text }))
                }
                placeholder={i18n._("0.00")}
                placeholderTextColor={colors.gray400}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>{i18n._("Currency")}</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setCurrencyModalVisible(true)}
              >
                <Text style={styles.pickerButtonText}>{formData.currency}</Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.gray300}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>{i18n._("Type")}</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setTypeModalVisible(true)}
              >
                <Text style={styles.pickerButtonText}>
                  {getTypeLabel(formData.type)}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.gray300}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>{i18n._("Duration")} *</Text>
              <TextInput
                style={styles.input}
                value={formData.duration}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, duration: text }))
                }
                placeholder={"1"}
                placeholderTextColor={colors.gray400}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>{i18n._("Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isFormValid && !isSubmitting ? handleSubmit : undefined}
              style={[
                styles.submitButton,
                (!isFormValid || isSubmitting) && styles.submitButtonDisabled,
              ]}
              disabled={!isFormValid || isSubmitting}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  (!isFormValid || isSubmitting) &&
                    styles.submitButtonTextDisabled,
                ]}
              >
                {isSubmitting
                  ? i18n._("Saving...")
                  : isEdit
                  ? i18n._("Save Changes")
                  : i18n._("Create")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {currencyModalVisible && (
        <ModalUniversal
          visible={currencyModalVisible}
          onClose={closeCurrencyModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n._("Select Currency")}</Text>
              <TouchableOpacity
                onPress={closeCurrencyModal}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={colors.gray300} />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color={colors.gray400}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                value={currencySearchText}
                onChangeText={setCurrencySearchText}
                placeholder={i18n._("Search currencies...")}
                placeholderTextColor={colors.gray400}
              />
              {currencySearchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => setCurrencySearchText("")}
                  style={styles.clearSearchButton}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.gray400}
                  />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView style={styles.modalContent}>
              {getFilteredCurrencies().map((currency) => {
                if (currency.code === "---")
                  return (
                    <View key="separator" style={styles.separator}>
                      <View style={styles.separatorLine} />
                    </View>
                  );

                return (
                  <TouchableOpacity
                    key={currency.code}
                    style={[
                      styles.modalOption,
                      formData.currency === currency.code &&
                        styles.modalOptionSelected,
                    ]}
                    onPress={() => selectCurrency(currency.code)}
                  >
                    <View style={styles.currencyInfo}>
                      <View style={styles.currencyNameRow}>
                        <Text
                          style={[
                            styles.modalOptionText,
                            formData.currency === currency.code &&
                              styles.modalOptionTextSelected,
                          ]}
                          numberOfLines={1}
                        >
                          {currency.name}
                        </Text>
                        {currency.symbol &&
                          currency.symbol !== currency.code && (
                            <Text
                              style={[
                                styles.currencySymbol,
                                formData.currency === currency.code &&
                                  styles.currencySymbolSelected,
                              ]}
                            >
                              {currency.symbol}
                            </Text>
                          )}
                      </View>
                      <Text
                        style={[
                          styles.currencyCode,
                          formData.currency === currency.code &&
                            styles.currencyCodeSelected,
                        ]}
                      >
                        {currency.code}{" "}
                        {currency.originalName &&
                          currency.originalName !== currency.name && (
                            <Text
                              style={[
                                styles.currencyOriginalName,
                                formData.currency === currency.code &&
                                  styles.currencyOriginalNameSelected,
                              ]}
                            >
                              {currency.originalName}
                            </Text>
                          )}
                      </Text>
                    </View>
                    {formData.currency === currency.code && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.white}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ModalUniversal>
      )}

      {typeModalVisible && (
        <ModalUniversal
          visible={typeModalVisible}
          onClose={() => setTypeModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n._("Select Type")}</Text>
              <TouchableOpacity
                onPress={() => setTypeModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={colors.gray300} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              {SUBSCRIPTION_TYPES_ENUM.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.modalOption,
                    formData.type === type && styles.modalOptionSelected,
                  ]}
                  onPress={() => selectType(type)}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      formData.type === type && styles.modalOptionTextSelected,
                    ]}
                  >
                    {getTypeLabel(type)}
                  </Text>
                  {formData.type === type && (
                    <Ionicons name="checkmark" size={20} color={colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ModalUniversal>
      )}
    </GradientBackground>
  );
};

export default SubscriptionFormScreen;
